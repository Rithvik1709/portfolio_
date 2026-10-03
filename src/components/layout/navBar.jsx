import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CommandPalette from "./commandPalette";
import INFO from "../../data/user";
import { useTheme } from "../../theme";

import "./styles/navBar.css";

export const NAV_LINKS = [
	{ key: "projects", to: "/projects", label: "Projects" },
	{ key: "articles", to: "/articles", label: "Writing" },
	{ key: "about", to: "/about", label: "Community" },
	{ key: "contact", to: "/contact", label: "Contact" },
	{ key: "terminal", to: "/terminal", label: "Terminal" },
];

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

const NavBar = ({ active }) => {
	const [paletteOpen, setPaletteOpen] = useState(false);
	const [theme, toggleTheme] = useTheme();

	useEffect(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setPaletteOpen((o) => !o);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	return (
		<header className="nav wrap">
			<Link to="/" className={`nav-home ${active === "home" ? "active" : ""}`}>
				{INFO.main.name}
			</Link>

			<nav className="nav-links" aria-label="Main">
				{NAV_LINKS.map((link) => (
					<Link
						key={link.key}
						to={link.to}
						className={active === link.key ? "active" : ""}
						aria-current={active === link.key ? "page" : undefined}
					>
						{link.label}
					</Link>
				))}
			</nav>

			<div className="nav-tools">
				<button onClick={() => setPaletteOpen(true)} aria-label="Search" title="Search">
					<kbd>{isMac ? "⌘" : "Ctrl"} K</kbd>
				</button>
				<button
					onClick={toggleTheme}
					className="nav-theme"
					aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
					title="Toggle theme"
				>
					<span className={`theme-dot ${theme}`} />
				</button>
			</div>

			{paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} />}
		</header>
	);
};

export default NavBar;
