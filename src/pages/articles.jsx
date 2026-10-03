import React, { useMemo, useState } from "react";

import Layout from "../components/layout/layout";
import { WritingList } from "../components/lists";

import INFO from "../data/user";
import myArticles from "../data/articles";

import "./styles/pages.css";

// Publications ordered by how often they appear, e.g. "A, B and C".
const publications = (() => {
	const counts = {};
	myArticles.forEach((a) => a.publication && (counts[a.publication] = (counts[a.publication] || 0) + 1));
	const names = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
	return names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}` : names[0];
})();

const Articles = () => {
	const [query, setQuery] = useState("");

	const results = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return myArticles;
		return myArticles.filter((a) =>
			[a.title, a.description, a.publication, ...a.keywords]
				.filter(Boolean)
				.join(" ")
				.toLowerCase()
				.includes(q)
		);
	}, [query]);

	return (
		<Layout active="articles" title="Writing" seoPage="articles">
			<header className="page-head">
				<h1>Writing</h1>
				<p>
					Notes on what I've been learning: RAG, MLOps, LLMs, blockchain. Everything is published on{" "}
					<a className="link" href={INFO.socials.medium} target="_blank" rel="noreferrer">
						Medium
					</a>
					{publications ? `, some of it in ${publications}.` : "."}
				</p>
			</header>

			<input
				type="search"
				className="search"
				placeholder={`Search ${myArticles.length} articles`}
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				aria-label="Search articles"
			/>

			<div className="list-block">
				<WritingList articles={results} showDescription />
				{results.length === 0 && <p className="muted">Nothing matches “{query}”.</p>}
			</div>
		</Layout>
	);
};

export default Articles;
