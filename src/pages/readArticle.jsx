import React from "react";
import { Link, useParams } from "react-router-dom";

import Layout from "../components/layout/layout";
import Notfound from "./404";

import myArticles from "../data/articles";

import "./styles/pages.css";

// Full articles live on Medium; this page is a shareable summary.
const ReadArticle = () => {
	const { slug } = useParams();
	const article = myArticles[Number(slug) - 1];

	if (!article) return <Notfound />;

	return (
		<Layout
			active="articles"
			title={article.title}
			description={article.description}
			keywords={article.keywords}
		>
			<article className="page-head read-article">
				<p className="read-meta">
					<Link className="link" to="/articles">
						Writing
					</Link>{" "}
					· <time>{article.date}</time>
					{article.publication && <> · {article.publication}</>}
				</p>
				<h1>{article.title}</h1>
				<p>{article.description}</p>
				<p>
					<a className="link" href={article.link} target="_blank" rel="noreferrer">
						Read it on Medium →
					</a>
				</p>
			</article>
		</Layout>
	);
};

export default ReadArticle;
