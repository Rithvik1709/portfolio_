import React, { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHouse,
	faUsers,
	faFolderOpen,
	faPenNib,
	faEnvelope,
	faTerminal,
	faCircleHalfStroke,
	faCopy,
	faDownload,
	faMagnifyingGlass,
	faCode,
	faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import {
	faGithub,
	faLinkedin,
	faTwitter,
	faMedium,
	faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";

import INFO from "../../data/user";
import myArticles from "../../data/articles";
import { switchTheme } from "../../theme";
import { useTransitionNavigate } from "../../transitions";

import "./styles/commandPalette.css";

const openExternal = (url) => window.open(url, "_blank", "noopener,noreferrer");

// Mounted only while open, so every open starts with fresh state.
const CommandPalette = ({ onClose }) => {
	const navigate = useTransitionNavigate();
	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState(0);
	const listRef = useRef(null);

	const commands = useMemo(
		() => [
			{ group: "Navigate", label: "Home", icon: faHouse, run: () => navigate("/") },
			{ group: "Navigate", label: "Community & Talks", icon: faUsers, run: () => navigate("/about") },
			{ group: "Navigate", label: "Projects", icon: faFolderOpen, run: () => navigate("/projects") },
			{ group: "Navigate", label: "Writing", icon: faPenNib, run: () => navigate("/articles") },
			{ group: "Navigate", label: "Contact", icon: faEnvelope, run: () => navigate("/contact") },
			{ group: "Navigate", label: "Terminal", icon: faTerminal, run: () => navigate("/terminal") },
			{
				group: "Actions",
				label: "Toggle theme",
				icon: faCircleHalfStroke,
				run: () =>
					switchTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"),
			},
			{
				group: "Actions",
				label: "Copy email address",
				hint: INFO.main.email,
				icon: faCopy,
				run: () => navigator.clipboard?.writeText(INFO.main.email),
			},
			{
				group: "Actions",
				label: "Download résumé",
				icon: faDownload,
				run: () => {
					const a = document.createElement("a");
					a.href = INFO.main.resume;
					a.download = "";
					a.click();
				},
			},
			{ group: "Socials", label: "GitHub", icon: faGithub, run: () => openExternal(INFO.socials.github) },
			{ group: "Socials", label: "LinkedIn", icon: faLinkedin, run: () => openExternal(INFO.socials.linkedin) },
			{ group: "Socials", label: "X / Twitter", icon: faTwitter, run: () => openExternal(INFO.socials.twitter) },
			{ group: "Socials", label: "Medium", icon: faMedium, run: () => openExternal(INFO.socials.medium) },
			{ group: "Socials", label: "Stack Overflow", icon: faStackOverflow, run: () => openExternal(INFO.socials.stackoverflow) },
			...INFO.projects.map((p) => ({
				group: "Projects",
				label: p.title,
				hint: p.category,
				icon: faCode,
				run: () => openExternal(p.link),
			})),
			...myArticles.map((a) => ({
				group: "Writing",
				label: a.title,
				hint: a.date,
				icon: faNewspaper,
				run: () => openExternal(a.link),
			})),
		],
		[navigate]
	);

	const results = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return commands.filter((c) => c.group !== "Writing" && c.group !== "Projects");
		return commands.filter((c) =>
			`${c.label} ${c.hint || ""} ${c.group}`.toLowerCase().includes(q)
		);
	}, [query, commands]);

	useEffect(() => setSelected(0), [query]);

	useEffect(() => {
		const el = listRef.current?.querySelector(`[data-index="${selected}"]`);
		el?.scrollIntoView({ block: "nearest" });
	}, [selected]);

	const execute = (cmd) => {
		onClose();
		cmd.run();
	};

	const onKeyDown = (e) => {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setSelected((s) => Math.min(s + 1, results.length - 1));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setSelected((s) => Math.max(s - 1, 0));
		} else if (e.key === "Enter" && results[selected]) {
			e.preventDefault();
			execute(results[selected]);
		} else if (e.key === "Escape") {
			onClose();
		}
	};

	let lastGroup = null;

	return (
		<div className="cmdk-overlay" onMouseDown={onClose}>
			<div
				className="cmdk"
				role="dialog"
				aria-modal="true"
				aria-label="Command palette"
				onMouseDown={(e) => e.stopPropagation()}
				onKeyDown={onKeyDown}
			>
				<div className="cmdk-input">
					<FontAwesomeIcon icon={faMagnifyingGlass} />
					<input
						autoFocus
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search pages, projects, articles…"
						aria-label="Search commands"
					/>
					<kbd>esc</kbd>
				</div>
				<div className="cmdk-list" ref={listRef} role="listbox">
					{results.length === 0 && <div className="cmdk-empty">No results for “{query}”.</div>}
					{results.map((cmd, i) => {
						const header = cmd.group !== lastGroup ? cmd.group : null;
						lastGroup = cmd.group;
						return (
							<React.Fragment key={`${cmd.group}-${cmd.label}`}>
								{header && <div className="cmdk-group">{header}</div>}
								<button
									className={`cmdk-item ${i === selected ? "selected" : ""}`}
									data-index={i}
									role="option"
									aria-selected={i === selected}
									onMouseMove={() => setSelected(i)}
									onClick={() => execute(cmd)}
								>
									<span className="cmdk-icon">
										<FontAwesomeIcon icon={cmd.icon} />
									</span>
									<span className="cmdk-label">{cmd.label}</span>
									{cmd.hint && <span className="cmdk-hint">{cmd.hint}</span>}
								</button>
							</React.Fragment>
						);
					})}
				</div>
				<div className="cmdk-footer">
					<span>
						<kbd>↑</kbd> <kbd>↓</kbd> navigate
					</span>
					<span>
						<kbd>↵</kbd> select
					</span>
				</div>
			</div>
		</div>
	);
};

export default CommandPalette;
