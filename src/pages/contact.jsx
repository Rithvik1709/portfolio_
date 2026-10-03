import React, { useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/layout/layout";
import { Row, Arrow } from "../components/lists";

import INFO from "../data/user";

import "./styles/pages.css";

const ELSEWHERE = [
	["GitHub", INFO.socials.github, "Rithvik1709"],
	["LinkedIn", INFO.socials.linkedin, "rithvik1709"],
	["Medium", INFO.socials.medium, "@rithvikbng"],
	["X", INFO.socials.twitter, "@BngRithvik"],
	["Stack Overflow", INFO.socials.stackoverflow, "rithvik-k"],
];

const Contact = () => {
	const [copied, setCopied] = useState(false);

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText(INFO.main.email);
			setCopied(true);
			setTimeout(() => setCopied(false), 1800);
		} catch (e) {
			window.location.href = `mailto:${INFO.main.email}`;
		}
	};

	return (
		<Layout active="contact" title="Contact" seoPage="contact">
			<header className="page-head">
				<h1>Contact</h1>
				<p>
					Questions, feedback, a project you'd like a hand with, or an invite to speak. Email is the
					fastest way to reach me.
				</p>
			</header>

			<Row label="Email">
				<div className="email-line">
					<a className="email" href={`mailto:${INFO.main.email}`}>
						{INFO.main.email}
					</a>
					<button className="copy" onClick={copyEmail} aria-live="polite">
						{copied ? "Copied" : "Copy"}
					</button>
				</div>
			</Row>

			<Row label="Elsewhere">
				<ul className="list">
					{ELSEWHERE.map(([label, href, handle]) => (
						<li key={label}>
							<a href={href} target="_blank" rel="noreferrer" className="item item-social">
								<span className="item-title">
									{label}
									<Arrow />
								</span>
								<span className="item-date mono">{handle}</span>
							</a>
						</li>
					))}
				</ul>
			</Row>

			<Row label="Other">
				<p className="muted">
					My{" "}
					<a className="link" href={INFO.main.resume} download>
						résumé
					</a>{" "}
					is a PDF. If you'd rather type than click, there's a{" "}
					<Link className="link" to="/terminal">
						terminal
					</Link>
					.
				</p>
			</Row>
		</Layout>
	);
};

export default Contact;
