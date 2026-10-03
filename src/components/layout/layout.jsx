import React, { useLayoutEffect } from "react";
import { Helmet } from "react-helmet";

import NavBar from "./navBar";
import Footer from "./footer";
import INFO from "../../data/user";
import SEO from "../../data/seo";

const Layout = ({ active, title, seoPage, description, keywords, children, footer = true }) => {
	// Layout effect so the scroll reset lands before the page-transition snapshot.
	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const seo = SEO.find((item) => item.page === seoPage);
	const pageTitle = title ? `${title} · ${INFO.main.name}` : INFO.main.title;
	const metaDescription = description || seo?.description;
	const metaKeywords = keywords || seo?.keywords;

	return (
		<>
			<Helmet>
				<title>{pageTitle}</title>
				{metaDescription && <meta name="description" content={metaDescription} />}
				{metaKeywords && <meta name="keywords" content={metaKeywords.join(", ")} />}
				<meta property="og:title" content={pageTitle} />
				{metaDescription && <meta property="og:description" content={metaDescription} />}
			</Helmet>

			<NavBar active={active} />
			<main className="page wrap">{children}</main>
			{footer && <Footer />}
		</>
	);
};

export default Layout;
