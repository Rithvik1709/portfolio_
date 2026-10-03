import React from "react";
import { Link } from "react-router-dom";

import INFO from "../data/user";

import "./styles/lists.css";

export const Arrow = () => (
	<svg className="arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
		<path d="M3.5 8.5l5-5M4.5 3.5h4v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

// One editorial row: small label column on the left, content on the right.
export const Row = ({ label, more, children }) => (
	<section className="row">
		<div className="row-label">
			<h2>{label}</h2>
			{more && (
				<Link to={more.to}>
					{more.label} →
				</Link>
			)}
		</div>
		<div className="row-body">{children}</div>
	</section>
);

export const ProjectList = ({ projects, showTags = true }) => (
	<ul className="list">
		{projects.map((p) => (
			<li key={p.title}>
				<a href={p.link} target="_blank" rel="noreferrer" className="item item-project">
					<span className="item-title">
						{p.title}
						<Arrow />
					</span>
					<span className="item-desc">{p.description}</span>
					{showTags && <span className="item-meta mono">{p.tags.join(" · ")}</span>}
				</a>
			</li>
		))}
	</ul>
);

const shortDate = (date) => {
	const [, month, year] = date.split(" ");
	return `${month} ${year}`;
};

export const WritingList = ({ articles, showDescription = false }) => (
	<ul className="list">
		{articles.map((a) => (
			<li key={a.link}>
				<a href={a.link} target="_blank" rel="noreferrer" className="item item-writing">
					<time className="item-date mono">{shortDate(a.date)}</time>
					<span>
						<span className="item-title">
							{a.title}
							<Arrow />
						</span>
						{a.publication && <span className="item-pub">in {a.publication}</span>}
						{showDescription && <span className="item-desc item-summary">{a.description}</span>}
					</span>
				</a>
			</li>
		))}
	</ul>
);

export const ExperienceList = ({ items = INFO.work }) => (
	<ul className="list">
		{items.map((w) => (
			<li key={`${w.company}-${w.role}`} className="item item-job">
				<img src={w.logo} alt="" className="item-logo" />
				<span>
					<span className="item-title">{w.role}</span>
					<span className="item-desc">{w.company}</span>
				</span>
				<span className="item-date mono">{w.duration.replace(" — ", "–")}</span>
			</li>
		))}
	</ul>
);
