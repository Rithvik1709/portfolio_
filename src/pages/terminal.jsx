import React, { useState, useRef, useEffect } from "react";
import NavBar from "../components/common/navBar";
import INFO from "../data/user";
import myArticles from "../data/articles";
import "./styles/terminal.css";


const Terminal = () => {
	// collapse multiple whitespace (spaces, tabs, newlines) in the stored name
	const displayName = (INFO.main.name || "").replace(/\s+/g, " ").trim();
	const [lines, setLines] = useState([
		{ type: "system", text: `Welcome to ${displayName}'s terminal. Type 'help' for commands.` },
	]);
	// command history for ArrowUp / ArrowDown navigation
	const [history, setHistory] = useState([]);
	const [historyIndex, setHistoryIndex] = useState(null); // null means not browsing history
	const [input, setInput] = useState("");
	const inputRef = useRef(null);
    const outputRef = useRef(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const append = (text, type = "user") => {
		setLines((l) => {
			const next = [...l, { type, text }];
			// scroll to bottom after the DOM updates
			setTimeout(() => {
				if (outputRef.current) {
					outputRef.current.scrollTop = outputRef.current.scrollHeight;
				}
			}, 20);
			return next;
		});
	};

	// render text but convert URLs to clickable links
	const renderTextWithLinks = (text) => {
		if (!text || typeof text !== "string") return text;
		const urlRegex = /https?:\/\/[^\s)]+/g;
		const elements = [];
		let lastIndex = 0;
		let match;
		let keyId = 0;
		while ((match = urlRegex.exec(text)) !== null) {
			const url = match[0];
			const idx = match.index;
			if (idx > lastIndex) {
				elements.push(
					<span key={`txt-${keyId++}`}>{text.slice(lastIndex, idx)}</span>
				);
			}
			elements.push(
				<a key={`link-${keyId++}`} href={url} target="_blank" rel="noreferrer noopener">
					{url}
				</a>
			);
			lastIndex = idx + url.length;
		}
		if (lastIndex < text.length) {
			elements.push(<span key={`txt-${keyId++}`}>{text.slice(lastIndex)}</span>);
		}
		// if no urls matched, return original text inside a span so <pre> preserves whitespace
		if (elements.length === 0) return <span>{text}</span>;
		return elements;
	};

	const handleCommand = (cmd) => {
		const c = cmd.trim().toLowerCase();
		if (c === "help") {
			append("Available commands: help, about, socials, projects, articles, contact, resume, clear", "system");
		} else if (c === "articles") {
			// list articles with titles and links
			const list = myArticles
				.map((a, idx) => {
					try {
						const obj = a();
						return `- ${obj.title} (${obj.date}) : ${obj.link}`;
					} catch (err) {
						return `- article ${idx + 1}`;
					}
				})
				.join("\n");
			append(list || "No articles found.", "system");
		} else if (c === "about") {
			append(INFO.homepage.description, "system");
		} else if (c === "socials") {
			append(JSON.stringify(INFO.socials, null, 2), "system");
		} else if (c === "projects") {
			const list = INFO.projects.map((p) => `- ${p.title} : ${p.link}`).join("\n");
			append(list, "system");
		} else if (c === "contact") {
			append(`Email: ${INFO.main.email}`, "system");
		} else if (c === "resume") {
			append("Download resume at /resumes/rithvik_s_resume (2).pdf", "system");
		} else if (c === "clear") {
			setLines([]);
		} else {
			append(`Command not found: ${cmd}`, "system");
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (!input) return;
		append(input, "user");
		handleCommand(input);
		// push to history and reset browsing index
		setHistory((h) => [...h, input]);
		setHistoryIndex(null);
		setInput("");

		// after DOM updates, scroll the output to bottom so the user sees the latest response
		setTimeout(() => {
			if (outputRef.current) {
				outputRef.current.scrollTop = outputRef.current.scrollHeight;
			}
		}, 50);
	};

	const handleKeyDown = (e) => {
		if (e.key === "ArrowUp") {
			e.preventDefault();
			if (history.length === 0) return;
			// start from last command if not browsing
			let idx = historyIndex === null ? history.length - 1 : historyIndex - 1;
			if (idx < 0) idx = 0;
			setHistoryIndex(idx);
			setInput(history[idx]);
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			if (history.length === 0) return;
			if (historyIndex === null) return; // nothing to go down from
			let idx = historyIndex + 1;
			if (idx >= history.length) {
				setHistoryIndex(null);
				setInput("");
			} else {
				setHistoryIndex(idx);
				setInput(history[idx]);
			}
		}
	};

	return (
		<div className="page-content">
			<NavBar active="terminal" />
			<div className="content-wrapper terminal-wrapper">
				<div className="terminal-window">
					<div className="terminal-output" ref={outputRef}>
						{lines.map((l, i) => (
							<div key={i} className={`terminal-line ${l.type}`}>
								{l.type === "user" ? (
									<span className="prompt">$</span>
								) : (
									<span className="prompt">#</span>
								)}
								<pre>{renderTextWithLinks(l.text)}</pre>
							</div>
						))}
					</div>

					<form className="terminal-input" onSubmit={onSubmit}>
						<span className="prompt">$</span>
						<input
							type="text"
							value={input}
							onChange={(e) => { setInput(e.target.value); if (historyIndex !== null) setHistoryIndex(null); }}
							ref={inputRef}
							onKeyDown={handleKeyDown}
							placeholder="Type a command (help for list)"
						/>
					</form>
				</div>

			</div>
		</div>
	);
};

export default Terminal;
