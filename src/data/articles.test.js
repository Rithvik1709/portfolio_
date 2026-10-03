import myArticles from "./articles";

const postId = (link) => link.split("?")[0].split("-").pop();

test("articles are sorted newest first", () => {
	const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const t = (d) => {
		const [day, mon, year] = d.split(" ");
		return Date.UTC(+year, MONTHS.indexOf(mon), +day);
	};
	const times = myArticles.map((a) => t(a.date));
	expect(times.every((x) => !Number.isNaN(x))).toBe(true);
	expect([...times].sort((a, b) => b - a)).toEqual(times);
});

test("the same Medium post never appears twice", () => {
	const ids = myArticles.map((a) => postId(a.link));
	expect(new Set(ids).size).toBe(ids.length);
});

test("every article has the fields the UI needs", () => {
	myArticles.forEach((a) => {
		expect(a.title).toBeTruthy();
		expect(a.link).toMatch(/^https:\/\//);
		expect(Array.isArray(a.keywords)).toBe(true);
	});
});
