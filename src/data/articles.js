import React from "react";

function article_1() {
	return {
		date: "30 Nov 2024",
		title: "Deploying a Retrieval-Augmented Generation (RAG) Model on Azure AI Studio",
		description:
			"Retrieval-Augmented Generation (RAG) model is making waves as a powerful way to combine retrieval-based methods with generation-based models. By utilizing external knowledge sources, RAG improves the accuracy and relevance of responses for tasks such as question answering, summarization, and more.",
		keywords: [
			"Deploying a Retrieval-Augmented Generation (RAG) Model on Azure AI Studio",
			"Model",
			"Machine Learning",
			"RAG",
		],
		link: "https://medium.com/@yourusername/rag-model-on-azure-ai-studio-article", 
		style: `
				.article-content {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.randImage {
					align-self: center;
					outline: 2px solid red;
				}
				`,
		body: (
			<React.Fragment>
				<div className="article-content">
					<div className="paragraph">Content of article 1</div>
					<img
						src="https://picsum.photos/200/300"
						alt="random"
						className="randImage"
					/>
				</div>
			</React.Fragment>
		),
	};
}

function article_2() {
	return {
		date: "Nov 2024",
		title: "Integrating Automated Pipelines with Blockchain: Data Integrity and Process Automation with ML",
		description:
			"An automated pipeline is a set of processes that execute automatically based on predefined conditions. It often involves a series of tasks such as data collection, transformation, and execution of commands that trigger various actions. This automation can be seen in CI/CD pipelines",
		keywords: [
			"Blockchain",
			"ML",
			"Pipeline",
			"Automation",
		],
		link: "https://medium.com/block-magnates/integrating-automated-pipelines-with-blockchain-data-integrity-and-process-automation-with-ml-eb5103e801eb", // 👈 Add Medium link here
		style: ``,
		body: (
			<React.Fragment>
				<h1>Content of article 2</h1>
			</React.Fragment>
		),
	};
}

const myArticles = [article_1, article_2];

export default myArticles;
