// Pulls the latest posts from Medium's RSS feed into src/data/medium.json.
// Runs before every build (see "prebuild" in package.json) and daily via
// .github/workflows/sync-medium.yml. Never fails the build: if the feed can't
// be fetched or parsed, the existing medium.json is left untouched.

import { readFile, writeFile } from "node:fs/promises";

const FEED_URL = "https://medium.com/feed/@rithvikbng";
const OUT_FILE = new URL("../src/data/medium.json", import.meta.url);
const MAX_DESCRIPTION = 220;

// Publications that live on custom domains, keyed by hostname.
const PUBLICATION_NAMES = {
	"tutorialsavvy.com": "TutorialSavvy",
};

// Medium tags are slugs; these need special casing.
const TAG_NAMES = {
	ai: "AI",
	llm: "LLM",
	llms: "LLMs",
	lwm: "LWM",
	rag: "RAG",
	rags: "RAG",
	ml: "ML",
	nlp: "NLP",
	devops: "DevOps",
	chatgpt: "ChatGPT",
	"ci-cd-pipeline": "CI/CD",
	"generative-ai-tools": "Generative AI",
	"ai-agent": "AI Agents",
};
const SKIP_TAGS = new Set(["technology", "artificial-intelligence"]);
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const decode = (s) =>
	s
		.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
		.replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
		.replace(/&nbsp;/g, " ")
		.replace(/&quot;/g, '"')
		.replace(/&#39;|&apos;/g, "'")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&amp;/g, "&");

// <br> becomes a space; inline tags (<strong>, <a>, …) vanish without adding one.
const stripTags = (html) =>
	decode(html.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, ""))
		.replace(/\s+/g, " ")
		.trim();

const unwrap = (s = "") => s.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();

const tag = (xml, name) => {
	const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
	return m ? unwrap(m[1]) : "";
};

const titleCase = (slug) =>
	slug
		.split("-")
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(" ");

const formatDate = (d) =>
	`${String(d.getUTCDate()).padStart(2, "0")} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;

const truncate = (text, max) => {
	if (text.length <= max) return text;
	const cut = text.slice(0, max);
	return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:—–-]+$/, "")}…`;
};

const publicationFor = (url) => {
	if (url.hostname !== "medium.com") {
		return PUBLICATION_NAMES[url.hostname] || titleCase(url.hostname.split(".")[0]);
	}
	const first = url.pathname.split("/")[1] || "";
	return first.startsWith("@") ? undefined : titleCase(first);
};

// Medium truncates long titles with "…"; the article often repeats the full title as a heading.
const fullTitle = (title, content) => {
	if (!title.endsWith("…")) return title;
	const prefix = title.slice(0, -1).trim();
	for (const m of content.matchAll(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/g)) {
		const heading = stripTags(m[1]);
		if (heading.startsWith(prefix)) return heading;
	}
	return title;
};

// First substantial block of text that isn't the title repeated or a bare link.
const describe = (title, content) => {
	const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
	for (const m of content.matchAll(/<(p|h3|h4|blockquote)[^>]*>([\s\S]*?)<\/\1>/g)) {
		const text = stripTags(m[2]);
		if (text.length < 40) continue;
		if (norm(title).startsWith(norm(text).slice(0, 30))) continue;
		if (/^try it/i.test(text)) continue;
		return truncate(text, MAX_DESCRIPTION);
	}
	return "";
};

const parseItem = (xml) => {
	const content = tag(xml, "content:encoded");
	const url = new URL(tag(xml, "link"));
	url.search = "";
	const title = fullTitle(decode(tag(xml, "title")), content);
	const keywords = [...xml.matchAll(/<category>([\s\S]*?)<\/category>/g)]
		.map((m) => unwrap(m[1]))
		.filter((t) => !SKIP_TAGS.has(t))
		.map((t) => TAG_NAMES[t] || titleCase(t))
		.filter((t, i, all) => all.indexOf(t) === i)
		.slice(0, 4);

	const article = {
		date: formatDate(new Date(tag(xml, "pubDate"))),
		title,
		description: describe(title, content),
		keywords,
		link: url.toString(),
	};
	const publication = publicationFor(url);
	if (publication) article.publication = publication;
	return article;
};

const main = async () => {
	let xml;
	try {
		const res = await fetch(FEED_URL, { headers: { "User-Agent": "Mozilla/5.0 (portfolio sync)" } });
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		xml = await res.text();
	} catch (err) {
		console.warn(`[sync-medium] Could not fetch feed (${err.message}); keeping existing medium.json.`);
		return;
	}

	const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => {
		try {
			return parseItem(m[1]);
		} catch (err) {
			console.warn(`[sync-medium] Skipping an item: ${err.message}`);
			return null;
		}
	});
	const articles = items.filter((a) => a && a.title && a.link);

	if (articles.length === 0) {
		console.warn("[sync-medium] Feed had no usable items; keeping existing medium.json.");
		return;
	}

	const next = `${JSON.stringify(articles, null, "\t")}\n`;
	const prev = await readFile(OUT_FILE, "utf8").catch(() => "");
	if (prev === next) {
		console.log(`[sync-medium] Up to date (${articles.length} posts).`);
		return;
	}
	await writeFile(OUT_FILE, next);
	console.log(`[sync-medium] Wrote ${articles.length} posts to src/data/medium.json.`);
};

main();
