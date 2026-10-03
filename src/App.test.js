import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

const renderAt = (path) =>
	render(
		<MemoryRouter initialEntries={[path]}>
			<App />
		</MemoryRouter>
	);

beforeAll(() => {
	window.scrollTo = () => {};
});

test("renders the homepage hero", () => {
	renderAt("/");
	expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Rithvik/);
});

test("renders projects page with project links", () => {
	renderAt("/projects");
	expect(screen.getByText("Documed").closest("a")).toHaveAttribute(
		"href",
		"https://github.com/rithvik17-09/documed"
	);
});

test("renders 404 for unknown routes", () => {
	renderAt("/nope");
	expect(screen.getByText(/Nothing lives here/i)).toBeInTheDocument();
});
