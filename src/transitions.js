import { useCallback, useEffect } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";

// View Transitions: the browser snapshots the page, we update the DOM, and CSS
// animates between the two (see the "View transitions" section of index.css).
// Unsupported browsers and reduced-motion users just get the instant update.

const canTransition = () =>
	typeof document !== "undefined" &&
	typeof document.startViewTransition === "function" &&
	!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// `kind` becomes a class on <html> (vt-page, vt-theme) so CSS can style each type.
export const withTransition = (update, kind) => {
	if (!canTransition()) {
		update();
		return;
	}
	const root = document.documentElement;
	root.classList.add(`vt-${kind}`);
	// flushSync so React commits inside the callback, before the "new" snapshot.
	const transition = document.startViewTransition(() => flushSync(update));
	transition.finished.finally(() => root.classList.remove(`vt-${kind}`));
};

export const useTransitionNavigate = () => {
	const navigate = useNavigate();
	return useCallback(
		(to) => {
			if (to === window.location.pathname) return;
			withTransition(() => navigate(to), "page");
		},
		[navigate]
	);
};

// Animates every internal link click. Runs in the capture phase, before React
// Router's <Link> handler, which skips navigation once defaultPrevented is set.
export const useLinkTransitions = () => {
	const navigate = useTransitionNavigate();

	useEffect(() => {
		if (!canTransition()) return;

		const onClick = (e) => {
			if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
			const link = e.target.closest?.("a[href]");
			if (!link || link.target || link.hasAttribute("download")) return;

			const url = new URL(link.href, window.location.href);
			if (url.origin !== window.location.origin) return;
			if (/\.[a-z0-9]+$/i.test(url.pathname)) return; // files like the résumé PDF
			if (url.pathname === window.location.pathname) return;

			e.preventDefault();
			navigate(url.pathname + url.search + url.hash);
		};

		document.addEventListener("click", onClick, true);
		return () => document.removeEventListener("click", onClick, true);
	}, [navigate]);
};
