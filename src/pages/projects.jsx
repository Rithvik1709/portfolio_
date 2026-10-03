import React, { useMemo, useState } from "react";

import Layout from "../components/layout/layout";
import { ProjectList } from "../components/lists";

import INFO from "../data/user";

import "./styles/pages.css";

const Projects = () => {
	const [filter, setFilter] = useState("All");

	const categories = useMemo(() => {
		const counts = INFO.projects.reduce((acc, p) => {
			acc[p.category] = (acc[p.category] || 0) + 1;
			return acc;
		}, {});
		return [["All", INFO.projects.length], ...Object.entries(counts)];
	}, []);

	const visible =
		filter === "All" ? INFO.projects : INFO.projects.filter((p) => p.category === filter);

	return (
		<Layout active="projects" title="Projects" seoPage="projects">
			<header className="page-head">
				<h1>Projects</h1>
				<p>
					Things I've built, mostly to learn something. All of them are on{" "}
					<a className="link" href={INFO.socials.github} target="_blank" rel="noreferrer">
						GitHub
					</a>
					.
				</p>
			</header>

			<div className="tabs" role="tablist" aria-label="Filter projects">
				{categories.map(([name, count]) => (
					<button
						key={name}
						role="tab"
						aria-selected={filter === name}
						onClick={() => setFilter(name)}
					>
						{name}
						<sup>{count}</sup>
					</button>
				))}
			</div>

			<div className="list-block">
				<ProjectList projects={visible} />
			</div>
		</Layout>
	);
};

export default Projects;
