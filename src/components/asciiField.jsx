import React, { useEffect, useRef } from "react";

import "./styles/asciiField.css";

// Characters from empty to dense. A leading space leaves gaps in the field.
const RAMP = "   .·:+x*";
const CELL_W = 9;
const CELL_H = 15;
const FPS = 12;
const MOUSE_RADIUS = 110;

// Overlapping sine waves ("plasma") give a slow, organic 0..1 value per cell.
const field = (x, y, t) =>
	(Math.sin(x * 1.3 + t * 0.6) +
		Math.sin(y * 1.7 - t * 0.4) +
		Math.sin((x + y) * 0.9 + t * 0.3) +
		Math.sin(Math.sqrt(x * x + y * y) * 1.2 - t * 0.5)) /
		8 +
	0.5;

const AsciiField = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext?.("2d");
		if (!ctx) return;
		const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

		let width = 0;
		let height = 0;
		let cols = 0;
		let rows = 0;
		let color = "#999";
		let frame = 0;
		let last = 0;
		let time = 0;
		let onScreen = true;
		const mouse = { x: -1e4, y: -1e4 };

		const draw = () => {
			ctx.clearRect(0, 0, width, height);
			ctx.fillStyle = color;
			for (let r = 0; r < rows; r++) {
				for (let c = 0; c < cols; c++) {
					const px = c * CELL_W;
					const py = r * CELL_H;
					let v = field(c * 0.13, r * 0.22, time);
					const d = Math.hypot(px - mouse.x, py - mouse.y);
					if (d < MOUSE_RADIUS) v += (1 - d / MOUSE_RADIUS) * 0.45;
					const ch = RAMP[Math.min(RAMP.length - 1, Math.floor(v * RAMP.length))];
					if (ch !== " ") ctx.fillText(ch, px, py);
				}
			}
		};

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const rect = canvas.getBoundingClientRect();
			width = rect.width;
			height = rect.height;
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.font = '12px "Geist Mono", ui-monospace, monospace';
			ctx.textBaseline = "top";
			cols = Math.ceil(width / CELL_W);
			rows = Math.ceil(height / CELL_H);
			color = getComputedStyle(canvas).color;
			draw();
		};

		const tick = (now) => {
			frame = requestAnimationFrame(tick);
			if (!onScreen || document.hidden || now - last < 1000 / FPS) return;
			// Fixed step, so the field doesn't jump after the tab was hidden.
			time += 1 / FPS;
			last = now;
			draw();
		};

		const onMouseMove = (e) => {
			const rect = canvas.getBoundingClientRect();
			mouse.x = e.clientX - rect.left;
			mouse.y = e.clientY - rect.top;
		};

		const onTheme = () => {
			// Wait a frame so the new theme's CSS variables have applied.
			requestAnimationFrame(() => {
				color = getComputedStyle(canvas).color;
				draw();
			});
		};

		resize();
		window.addEventListener("resize", resize);
		window.addEventListener("themechange", onTheme);
		// Fonts load after first paint; redraw once they're ready.
		document.fonts?.ready.then(resize);

		let observer;
		if (!reduceMotion) {
			window.addEventListener("mousemove", onMouseMove, { passive: true });
			if ("IntersectionObserver" in window) {
				observer = new IntersectionObserver(([entry]) => {
					onScreen = entry.isIntersecting;
				});
				observer.observe(canvas);
			}
			frame = requestAnimationFrame(tick);
		}

		return () => {
			cancelAnimationFrame(frame);
			observer?.disconnect();
			window.removeEventListener("resize", resize);
			window.removeEventListener("themechange", onTheme);
			window.removeEventListener("mousemove", onMouseMove);
		};
	}, []);

	return <canvas ref={canvasRef} className="ascii-field" aria-hidden="true" />;
};

export default AsciiField;
