import React from "react";

import Layout from "../components/layout/layout";
import AsciiField from "../components/asciiField";
import {
	Row,
	ProjectList,
	WritingList,
	ExperienceList,
} from "../components/lists";

import INFO from "../data/user";
import myArticles from "../data/articles";

import "./styles/pages.css";

const Homepage = () => (
	<Layout active="home" seoPage="home">
		<div className="hero">
			<AsciiField />
			<header className="intro">
				<img
					src="/homepage.jpeg"
					alt={INFO.main.name}
					className="intro-photo"
				/>
				<div>
					<h1 className="intro-name">{INFO.main.name}</h1>
					<p className="intro-role">
						AI/ML engineer and open-source mentor
					</p>
				</div>
			</header>

			<div className="prose intro-text">
				{INFO.homepage.intro.map((p) => (
					<p key={p}>{p}</p>
				))}
			</div>

			<p className="intro-links">
				<a
					className="link"
					href={INFO.socials.github}
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
				<a
					className="link"
					href={INFO.socials.linkedin}
					target="_blank"
					rel="noreferrer"
				>
					LinkedIn
				</a>
				<a
					className="link"
					href={INFO.socials.medium}
					target="_blank"
					rel="noreferrer"
				>
					Medium
				</a>
				<a className="link" href={`mailto:${INFO.main.email}`}>
					Email
				</a>
				<a className="link" href={INFO.main.resume} download>
					Résumé (PDF)
				</a>
			</p>
		</div>

		<Row label="Now">
			<p className="now">{INFO.homepage.now}</p>
		</Row>

		<Row
			label="Projects"
			more={{ to: "/projects", label: `All ${INFO.projects.length}` }}
		>
			<ProjectList projects={INFO.projects.slice(0, 5)} />
		</Row>

		<Row
			label="Writing"
			more={{ to: "/articles", label: `All ${myArticles.length}` }}
		>
			<WritingList articles={myArticles.slice(0, 5)} />
		</Row>

		<Row label="Experience">
			<ExperienceList />
		</Row>

		<Row label="Community" more={{ to: "/about", label: "More" }}>
			<p className="muted">
				I've mentored at GSSOC '25 and Winter of Blockchain, facilitated
				Google Cloud Arcade in '24 and '25, and given talks at the Azure
				Developer Community and GDG City Engineering College.
			</p>
		</Row>

		<Row label="Contact">
			<p className="muted">
				The best way to reach me is{" "}
				<a className="link" href={`mailto:${INFO.main.email}`}>
					{INFO.main.email}
				</a>
				. I'm happy to talk about projects, mentoring or speaking.
			</p>
		</Row>
	</Layout>
);

export default Homepage;
