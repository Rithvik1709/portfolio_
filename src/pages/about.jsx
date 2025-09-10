import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";


import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/about.css";

const About = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "about");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`About | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="about" />
				<div className="content-wrapper">
					<div className="about-logo-container">
						<div className="about-logo">
							<Logo width={46} />
						</div>
					</div>

													<div className="about-container">
														<div className="about-main">
															<div className="about-right-side">
																<div className="title about-title">
																	{INFO.about.title}
																</div>

																<div className="subtitle about-subtitle">
																	{INFO.about.description}
																</div>
															</div>
														</div>

																		{/* Open Source Contributions Section */}
																		<div className="section open-source-section">
																			<h2 className="section-underline">Open Source Contributions & Mentorship</h2>
																			<div>
																				<h3>GSSOC'24 CONTRIBUTOR</h3>
																				<p>Contributed to the Reactfolio open source project by adding new features and fixing bugs. Helped improve documentation and onboard new contributors.</p>
																			</div>
																			<div>
																				<h3>GSSOC'25 MENTOR</h3>
																				<p>Submitted several pull requests to enhance performance and add new utilities to the Awesome JS Library.</p>
																			</div>
																			<div>
																				<h3>Google Cloud Arcade Facilitator'24 & 25</h3>
																				<p>Submitted several pull requests to enhance performance and add new utilities to the Awesome JS Library.</p>
																			</div>
																			<div>
																				<h3>Winter of Blockchain(WOB) MENTOR</h3>
																				<p>Submitted several pull requests to enhance performance and add new utilities to the Awesome JS Library.</p>
																			</div>
																			<div>
																				<h3>Unstop Campus Ambassador</h3>
																				<p>Submitted several pull requests to enhance performance and add new utilities to the Awesome JS Library.</p>
																			</div>	
																			<div>
																				<h3>LetsUpgrade - Student Ambassador</h3>
																				<p>Submitted several pull requests to enhance performance and add new utilities to the Awesome JS Library.</p>
																			</div>
																			<div>
																				<h3>International Model United Nation- Student Ambassador</h3>
																				<p>Submitted several pull requests to enhance performance and add new utilities to the Awesome JS Library.</p>
																			</div>
																			<div>
																				<h3>Agnirva Space Community(By ISRO) -Campus Ambassador </h3>
																				<p>Submitted several pull requests to enhance performance and add new utilities to the Awesome JS Library.</p>
																			</div>
																			<div>
																				<h3>Mentor - Mentor Together </h3>
																				<p>Submitted several pull requests to enhance performance and add new utilities to the Awesome JS Library.</p>
																			</div>
																		</div>

																		{/* Tech Summits Section */}
																		<div className="section tech-summits-section">
																			<h2 className="section-underline">Tech Talks</h2>
																			<div>
																				<h3>Building your portfolio using Github Copilot- Azure Dev Community</h3>
																				<p>Spoke about leveraging AI tools like Github Copilot to enhance productivity and streamline the development process.</p>
																			</div>
																			<div>
																				<h3>Creating your first ML model with Google cloud AutoML- Google developer group"City Engineering college"</h3>
																				<p>Conducted a workshop on building machine learning models using Google Cloud's AutoML, guiding participants through the process of training and deploying their own models.</p>
																			</div>
																			<div>
																				<h3>Boosting LinkedIn presence - Google developer group"City Engineering college"</h3>
																				<p>Conducted a workshop on optimizing LinkedIn profiles and leveraging the platform for professional networking and opportunities.</p>
																			</div>
																		</div>

														{/* Mobile socials removed as requested */}
													</div>
					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default About;
