import React from "react";
import { Link, useLocation } from "react-router-dom";

import Layout from "../components/layout/layout";

import "./styles/pages.css";

const Notfound = () => {
	const { pathname } = useLocation();

	return (
		<Layout title="Not found" description="Page not found">
			<header className="page-head notfound">
				<p className="mono">404</p>
				<h1>Nothing lives here.</h1>
				<p>
					<code>{pathname}</code> doesn't exist, or it moved. Try the{" "}
					<Link className="link" to="/">
						home page
					</Link>{" "}
					instead.
				</p>
			</header>
		</Layout>
	);
};

export default Notfound;
