import React, { useEffect, useRef, useState } from "react";

import Layout from "../components/layout/layout";

import INFO from "../data/user";
import myArticles from "../data/articles";
import { switchTheme } from "../theme";
import { useTransitionNavigate } from "../transitions";

import "./styles/terminal.css";

const BANNER = String.raw`
 ____  _ _   _          _ _
|  _ \(_) |_| |____   _(_) | __
| |_) | | __| '_ \ \ / / | |/ /
|  _ <| | |_| | | \ V /| |   <
|_| \_\_|\__|_| |_|\_/ |_|_|\_\
`;

const PAGES = { home: "/", about: "/about", community: "/about", projects: "/projects", articles: "/articles", writing: "/articles", contact: "/contact" };

const HELP = [
	["about", "who I am"],
	["skills", "tech I work with"],
	["projects", "things I've built"],
	["articles", "things I've written"],
	["work", "experience timeline"],
	["community", "open-source & mentorship"],
	["talks", "talks & workshops"],
	["socials", "where to find me"],
	["contact", "how to reach me"],
	["resume", "download my résumé"],
	["open <name>", "open a social or project"],
	["cd <page>", "navigate the site"],
	["theme <light|dark>", "switch theme"],
	["clear", "clear the screen"],
];

const COMMANDS = ["help", "about", "whoami", "skills", "projects", "articles", "work", "community", "talks", "socials", "contact", "resume", "open", "cd", "theme", "clear", "date", "echo", "ls", "banner", "sudo", "exit"];

const QUICK = ["help", "about", "projects", "articles", "work", "socials"];

const Link = ({ href, children }) => (
	<a href={href} target="_blank" rel="noreferrer noopener">
		{children || href}
	</a>
);

const Terminal = () => {
	const navigate = useTransitionNavigate();
	const prompt = "rithvik@portfolio:~$";
	const [lines, setLines] = useState([
		{ type: "art", content: BANNER },
		{
			type: "system",
			content: (
				<>
					Type <b>help</b> to see what's here.
				</>
			),
		},
	]);
	const [history, setHistory] = useState([]);
	const [historyIndex, setHistoryIndex] = useState(null);
	const [input, setInput] = useState("");
	const inputRef = useRef(null);
	const outputRef = useRef(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	useEffect(() => {
		if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
	}, [lines]);

	const print = (content, type = "system") => setLines((l) => [...l, { type, content }]);

	const run = (raw) => {
		const trimmed = raw.trim();
		const [cmd, ...args] = trimmed.split(/\s+/);
		const arg = args.join(" ").toLowerCase();
		const c = (cmd || "").toLowerCase();

		switch (c) {
			case "help":
				print(
					<div className="t-grid">
						{HELP.map(([name, desc]) => (
							<React.Fragment key={name}>
								<span className="t-cmd">{name}</span>
								<span className="t-dim">{desc}</span>
							</React.Fragment>
						))}
					</div>
				);
				break;
			case "about":
				print(INFO.homepage.description + ".");
				break;
			case "whoami":
				print(`${INFO.main.name.toLowerCase()} — ${INFO.homepage.roles.join(" · ")}`);
				break;
			case "skills":
				print(
					<div className="t-tags">
						{INFO.skills.map((s) => (
							<span key={s}>{s}</span>
						))}
					</div>
				);
				break;
			case "projects":
				print(
					<ul className="t-list">
						{INFO.projects.map((p) => (
							<li key={p.title}>
								<span className="t-cmd">{p.title}</span> <span className="t-dim">— {p.description}</span>
								<br />
								<Link href={p.link} />
							</li>
						))}
					</ul>
				);
				break;
			case "articles":
				print(
					<ul className="t-list">
						{myArticles.map((a) => (
							<li key={a.link}>
								<span className="t-dim">[{a.date}]</span> <Link href={a.link}>{a.title}</Link>
							</li>
						))}
					</ul>
				);
				break;
			case "work":
				print(
					<ul className="t-list">
						{INFO.work.map((w) => (
							<li key={`${w.company}-${w.role}`}>
								<span className="t-cmd">{w.role}</span> @ {w.company}{" "}
								<span className="t-dim">({w.duration})</span>
							</li>
						))}
					</ul>
				);
				break;
			case "community":
				print(
					<ul className="t-list">
						{INFO.community.map((m) => (
							<li key={`${m.title}-${m.org}`}>
								<span className="t-cmd">{m.title}</span> <span className="t-dim">— {m.org}</span>
							</li>
						))}
					</ul>
				);
				break;
			case "talks":
				print(
					<ul className="t-list">
						{INFO.talks.map((t) => (
							<li key={t.title}>
								<span className="t-cmd">{t.title}</span> <span className="t-dim">— {t.host}</span>
							</li>
						))}
					</ul>
				);
				break;
			case "socials":
				print(
					<div className="t-grid">
						{Object.entries(INFO.socials).map(([k, v]) => (
							<React.Fragment key={k}>
								<span className="t-cmd">{k}</span>
								<Link href={v} />
							</React.Fragment>
						))}
					</div>
				);
				break;
			case "contact":
				print(
					<>
						Email: <a href={`mailto:${INFO.main.email}`}>{INFO.main.email}</a>
					</>
				);
				break;
			case "resume": {
				const a = document.createElement("a");
				a.href = INFO.main.resume;
				a.download = "";
				a.click();
				print("Downloading résumé…");
				break;
			}
			case "open": {
				if (!arg) {
					print("usage: open <github|linkedin|twitter|medium|stackoverflow|project name>", "error");
					break;
				}
				const social = Object.entries(INFO.socials).find(([k]) => k.startsWith(arg));
				const project = INFO.projects.find((p) => p.title.toLowerCase().includes(arg));
				const url = social?.[1] || project?.link;
				if (url) {
					window.open(url, "_blank", "noopener,noreferrer");
					print(`Opening ${url}`);
				} else {
					print(`open: nothing matches "${arg}"`, "error");
				}
				break;
			}
			case "cd":
			case "goto":
				if (PAGES[arg]) {
					print(`Navigating to ${arg}…`);
					setTimeout(() => navigate(PAGES[arg]), 350);
				} else {
					print(`cd: no such page: ${arg || "(empty)"}. Try: ${Object.keys(PAGES).join(", ")}`, "error");
				}
				break;
			case "ls":
				print(
					<div className="t-tags">
						{Object.keys(PAGES).map((p) => (
							<span key={p}>{p}/</span>
						))}
						<span>resume.pdf</span>
					</div>
				);
				break;
			case "theme":
				if (arg === "light" || arg === "dark") {
					switchTheme(arg);
					print(`Theme set to ${arg}.`);
				} else {
					print("usage: theme <light|dark>", "error");
				}
				break;
			case "date":
				print(new Date().toString());
				break;
			case "echo":
				print(args.join(" "));
				break;
			case "banner":
				print(BANNER, "art");
				break;
			case "sudo":
				print("rithvik is not in the sudoers file. This incident will be reported.", "error");
				break;
			case "exit":
				print("Close the tab, or `cd home`.");
				break;
			case "clear":
				setLines([]);
				break;
			case "":
				break;
			default:
				print(`command not found: ${cmd}. Type 'help' for a list of commands.`, "error");
		}
	};

	const submit = (value) => {
		setLines((l) => [...l, { type: "input", content: value }]);
		run(value);
		if (value.trim()) setHistory((h) => [...h, value]);
		setHistoryIndex(null);
		setInput("");
	};

	const onSubmit = (e) => {
		e.preventDefault();
		submit(input);
	};

	const onKeyDown = (e) => {
		if (e.key === "ArrowUp") {
			e.preventDefault();
			if (!history.length) return;
			const idx = historyIndex === null ? history.length - 1 : Math.max(historyIndex - 1, 0);
			setHistoryIndex(idx);
			setInput(history[idx]);
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			if (historyIndex === null) return;
			const idx = historyIndex + 1;
			if (idx >= history.length) {
				setHistoryIndex(null);
				setInput("");
			} else {
				setHistoryIndex(idx);
				setInput(history[idx]);
			}
		} else if (e.key === "Tab") {
			e.preventDefault();
			const matches = COMMANDS.filter((c) => c.startsWith(input.toLowerCase()));
			if (matches.length === 1) setInput(matches[0] + " ");
			else if (matches.length > 1 && input) print(matches.join("  "));
		} else if (e.key === "l" && e.ctrlKey) {
			e.preventDefault();
			setLines([]);
		}
	};

	return (
		<Layout active="terminal" title="Terminal" description="An interactive terminal for exploring Rithvik's portfolio." footer={false}>
			<div className="terminal-page">
				<div className="terminal-window" onClick={() => inputRef.current?.focus()}>
					<div className="terminal-bar">
						<div className="terminal-dots">
							<i />
							<i />
							<i />
						</div>
						<div className="terminal-title">rithvik@portfolio — zsh</div>
						<div className="terminal-dots-spacer" />
					</div>

					<div className="terminal-output" ref={outputRef} aria-live="polite">
						{lines.map((l, i) => (
							<div key={i} className={`terminal-line ${l.type}`}>
								{l.type === "input" ? (
									<>
										<span className="t-prompt">{prompt}</span> {l.content}
									</>
								) : l.type === "art" ? (
									<pre className="t-art">{l.content}</pre>
								) : (
									l.content
								)}
							</div>
						))}

						<form className="terminal-input" onSubmit={onSubmit}>
							<label htmlFor="terminal-input" className="t-prompt">
								{prompt}
							</label>
							<input
								id="terminal-input"
								type="text"
								value={input}
								onChange={(e) => {
									setInput(e.target.value);
									if (historyIndex !== null) setHistoryIndex(null);
								}}
								ref={inputRef}
								onKeyDown={onKeyDown}
								autoComplete="off"
								autoCapitalize="off"
								spellCheck="false"
								aria-label="Terminal command"
							/>
						</form>
					</div>
				</div>

				<div className="terminal-quick">
					<span>Try:</span>
					{QUICK.map((q) => (
						<button key={q} onClick={() => submit(q)}>
							{q}
						</button>
					))}
					<span className="terminal-hint">
						<kbd>Tab</kbd> autocomplete · <kbd>↑</kbd> history
					</span>
				</div>
			</div>
		</Layout>
	);
};

export default Terminal;
