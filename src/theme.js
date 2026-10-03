import { useCallback, useEffect, useState } from "react";

import { withTransition } from "./transitions";

const STORAGE_KEY = "theme";
const EVENT = "themechange";

export const getStoredTheme = () => {
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved === "light" || saved === "dark") return saved;
	} catch (e) {
		// storage unavailable (private mode etc.)
	}
	return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const applyTheme = (theme) => {
	document.documentElement.dataset.theme = theme;
	const meta = document.querySelector('meta[name="theme-color"]');
	if (meta) meta.setAttribute("content", theme === "dark" ? "#131311" : "#f6f4ef");
};

export const setTheme = (theme) => {
	applyTheme(theme);
	try {
		localStorage.setItem(STORAGE_KEY, theme);
	} catch (e) {
		// ignore
	}
	window.dispatchEvent(new CustomEvent(EVENT, { detail: theme }));
};

// The ink starts at `origin` (or the nav toggle, or the screen centre) and must
// grow far enough to reach the furthest corner of the viewport.
const inkOrigin = (origin) => {
	if (origin) return origin;
	const toggle = document.querySelector(".nav-theme")?.getBoundingClientRect();
	if (toggle && toggle.width) return { x: toggle.left + toggle.width / 2, y: toggle.top + toggle.height / 2 };
	return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
};

// Animated theme change: the new theme spreads out like ink (see index.css).
export const switchTheme = (theme, origin) => {
	const { x, y } = inkOrigin(origin);
	const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
	const root = document.documentElement.style;
	root.setProperty("--ink-x", `${x}px`);
	root.setProperty("--ink-y", `${y}px`);
	root.setProperty("--ink-r", `${Math.ceil(radius)}px`);
	withTransition(() => setTheme(theme), "theme");
};

export const useTheme = () => {
	const [theme, setState] = useState(
		() => document.documentElement.dataset.theme || getStoredTheme()
	);

	useEffect(() => {
		const onChange = (e) => setState(e.detail);
		window.addEventListener(EVENT, onChange);
		return () => window.removeEventListener(EVENT, onChange);
	}, []);

	// Pass the click event so the ink starts at whatever was clicked.
	const toggle = useCallback(
		(e) => {
			const rect = e?.currentTarget?.getBoundingClientRect?.();
			const origin = rect && { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
			switchTheme(theme === "dark" ? "light" : "dark", origin);
		},
		[theme]
	);

	return [theme, toggle];
};
