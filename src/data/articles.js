import mediumFeed from "./medium.json";

// Hand-curated articles. These win over the Medium feed for the same post, and
// keep older posts listed after they drop out of the feed's latest-10 window.
// `publication` is shown under the title; omit it for personal posts.
const curated = [
	{
		date: "06 Nov 2025",
		title: "Building a Multimodal Fusion Search Engine with Qdrant, CLIP & Whisper: Text, Image, and Audio in One",
		description:
			"A technical walkthrough for building a multimodal search engine using Qdrant, CLIP, and Whisper, enabling unified search across text, image, and audio data.",
		keywords: ["Multimodal", "Qdrant", "CLIP", "Whisper"],
		link: "https://medium.com/@rithvikbng/building-a-multimodal-fusion-search-engine-with-qdrant-clip-whisper-text-image-and-audio-in-ec0cb6996e17",
	},
	{
		date: "29 Oct 2025",
		title: "Automating App Localization with Lingo Dev: The Developer’s Guide to Seamless CI/CD Integration",
		description:
			"A developer’s guide to automating app localization using Lingo Dev, with practical steps for integrating seamless CI/CD workflows and improving global reach.",
		keywords: ["Localization", "CI/CD", "Automation"],
		link: "https://medium.com/@rithvikbng/automating-app-localization-with-lingo-dev-the-developers-guide-to-seamless-ci-cd-integration-46a167fc5428",
	},
	{
		date: "23 Oct 2025",
		title: "Deploying a Production-Ready RAG on Kubernetes: Multi-Tenant Qdrant, Streaming PDF Ingestion, LLM",
		description:
			"A comprehensive guide to deploying Retrieval-Augmented Generation (RAG) systems on Kubernetes, featuring multi-tenant Qdrant, streaming PDF ingestion, and LLM integration for scalable enterprise AI.",
		keywords: ["RAG", "Kubernetes", "Qdrant", "LLM"],
		link: "https://medium.com/@rithvikbng/deploying-a-production-ready-rag-on-kubernetes-multi-tenant-qdrant-streaming-pdf-ingestion-llm-82356f315f1b",
	},
	{
		date: "14 Sep 2025",
		title: "Using Dodos Adapter to Handle Payments in Your AI SaaS",
		description:
			"A practical guide to integrating Dodos Adapter for seamless payment processing in AI SaaS platforms. Covers setup, workflow, and best practices for secure transactions.",
		keywords: ["Payments", "AI SaaS", "Integration"],
		link: "https://medium.com/@rithvikbng/using-dodos-adapter-to-handle-payments-in-your-ai-saas-471ba1846aea",
	},
	{
		date: "05 Sep 2025",
		title: "Introduction to Tokens in Machine Learning Models: From Normal to JSON Prompting",
		publication: "Python in Plain English",
		description:
			"How text is broken into tokens in AI models, and the difference between normal prompting and structured JSON prompting for clearer, more consistent model responses.",
		keywords: ["AI", "Tokens", "Prompting", "JSON"],
		link: "https://medium.com/python-in-plain-english/introduction-to-tokens-in-machine-learning-models-from-normal-to-json-prompting-ee795854807c",
	},
	{
		date: "11 Jun 2025",
		title: "Understanding Multi-Layer Blockchain Architecture: The Backbone of Scalable Web3",
		publication: "Block Magnates",
		description:
			"The multi-layered architecture of blockchain systems — from consensus mechanisms to user applications — and how specialized layers enable scalability, modularity, and interoperability in Web3.",
		keywords: ["Blockchain", "Web3", "Architecture"],
		link: "https://medium.com/block-magnates/understanding-multi-layer-blockchain-architecture-the-backbone-of-scalable-web3-c910f6e75b9d",
	},
	{
		date: "09 Jan 2025",
		title: "The Power of AI: Transforming My Everyday Life and Routines",
		description:
			"A personal reflection on how AI has become part of daily life — enhancing productivity, learning, and well-being — and its transformative potential across healthcare, education, and agriculture.",
		keywords: ["AI", "Productivity", "Future"],
		link: "https://medium.com/@rithvikbng/the-power-of-ai-transforming-my-everyday-life-and-routines-5f83622cb305",
	},
	{
		date: "23 Dec 2024",
		title: "Comparing ChatGPT, Claude, Bard & Perplexity AI on a Single Prompt",
		description:
			"Evaluating the responses and capabilities of ChatGPT, Claude, Bard, and Perplexity AI side by side using a single prompt.",
		keywords: ["LLMs", "ChatGPT", "Claude", "Perplexity"],
		link: "https://medium.com/@rithvikbng/comparing-models-like-chatgpt-claud-bard-gemini-perplexity-ai-based-on-single-prompt-96c290c7f3cb",
	},
	{
		date: "22 Dec 2024",
		title: "Building an End-to-End Machine Learning Pipeline with TensorFlow",
		publication: "DevOps.dev",
		description:
			"A guide to constructing a complete ML pipeline with TensorFlow — preprocessing, training, evaluation, and deployment — plus how TFX orchestrates end-to-end workflows.",
		keywords: ["TensorFlow", "TFX", "MLOps"],
		link: "https://medium.com/devops-dev/building-an-end-to-end-machine-learning-pipeline-with-tensorflow-d2316d719370",
	},
	{
		date: "04 Dec 2024",
		title: "Integrating Automated Pipelines with Blockchain: Data Integrity and Process Automation with ML",
		publication: "Block Magnates",
		description:
			"How blockchain’s immutable ledger and ML-driven automation combine to bring transparency, security, and efficiency to data pipelines.",
		keywords: ["Blockchain", "ML", "Data Pipelines"],
		link: "https://medium.com/block-magnates/integrating-automated-pipelines-with-blockchain-data-integrity-and-process-automation-with-ml-eb5103e801eb",
	},
	{
		date: "30 Nov 2024",
		title: "Deploying a Retrieval-Augmented Generation (RAG) Model on Azure AI Studio",
		description:
			"A step-by-step guide to deploying a RAG model on Azure AI Studio, combining Azure Cognitive Search with a pre-trained generative model for accurate, relevant responses.",
		keywords: ["RAG", "Azure", "LLM"],
		link: "https://medium.com/@rithvikbng/deploying-a-retrieval-augmented-generation-rag-model-on-azure-ai-studio-3699ab549647",
	},
];

// Medium post URLs end in a hex id, which stays the same even if the slug changes.
const postId = (link) => link.split("?")[0].split("-").pop();

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Dates are "06 Nov 2025"; parsed by hand because Date() parsing of that format varies by browser.
const toTime = (date) => {
	const [day, month, year] = date.split(" ");
	return Date.UTC(Number(year), MONTHS.indexOf(month), Number(day));
};

const curatedIds = new Set(curated.map((a) => postId(a.link)));

// Synced from Medium by scripts/sync-medium.mjs (runs before every build).
const myArticles = [...curated, ...mediumFeed.filter((a) => !curatedIds.has(postId(a.link)))].sort(
	(a, b) => toTime(b.date) - toTime(a.date)
);

export default myArticles;
