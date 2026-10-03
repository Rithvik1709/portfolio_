import React from "react";

import INFO from "../../data/user";

import "./styles/footer.css";

const LINKS = [
	["GitHub", INFO.socials.github],
	["LinkedIn", INFO.socials.linkedin],
	["Medium", INFO.socials.medium],
	["X", INFO.socials.twitter],
	["Stack Overflow", INFO.socials.stackoverflow],
];

const Footer = () => (
	<footer className="footer wrap">
		<span>© {new Date().getFullYear()} {INFO.main.name}</span>
		<nav aria-label="Elsewhere">
			{LINKS.map(([label, href]) => (
				<a key={label} href={href} target="_blank" rel="noreferrer">
					{label}
				</a>
			))}
		</nav>
	</footer>
);

export default Footer;
