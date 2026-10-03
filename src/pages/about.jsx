import React from "react";

import Layout from "../components/layout/layout";
import { Row, ExperienceList } from "../components/lists";

import INFO from "../data/user";

import "./styles/pages.css";

const About = () => (
	<Layout active="about" title="Community" seoPage="about">
		<header className="page-head">
			<h1>Community</h1>
			<p>
				Open-source programs I've contributed to and mentored in, communities I've helped run, and talks
				I've given.
			</p>
		</header>

		<Row label="Open source & mentoring">
			<ul className="entries">
				{INFO.community.map((c) => (
					<li key={`${c.title}-${c.org}`}>
						<h3>
							{c.title} <span className="muted">· {c.org}</span>
						</h3>
						<p>{c.description}</p>
					</li>
				))}
			</ul>
		</Row>

		<Row label="Talks">
			<ul className="entries">
				{INFO.talks.map((t) => (
					<li key={t.title}>
						<h3>{t.title}</h3>
						<p className="entries-host">{t.host}</p>
						<p>{t.description}</p>
					</li>
				))}
			</ul>
		</Row>

		<Row label="Experience">
			<ExperienceList />
		</Row>
	</Layout>
);

export default About;
