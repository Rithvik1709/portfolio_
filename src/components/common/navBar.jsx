import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./styles/navBar.css";

const NavBar = (props) => {
	const { active } = props;
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	return (
		<React.Fragment>
			<div className="nav-container">
				<nav className="navbar">
					<div className="nav-background">
						<ul className="nav-list">
							<li className={active === "home" ? "nav-item active" : "nav-item"}>
								<Link to="/">Home</Link>
							</li>
													<li className={active === "about" ? "nav-item active" : "nav-item"}>
														<Link to="/about">Open Source & Tech Community</Link>
							</li>
							<li className={active === "projects" ? "nav-item active" : "nav-item"}>
								<Link to="/projects">Projects</Link>
							</li>
							<li className={active === "articles" ? "nav-item active" : "nav-item"}>
								<Link to="/articles">Articles</Link>
							</li>
							<li className={active === "contact" ? "nav-item active" : "nav-item"}>
								<Link to="/contact">Contact</Link>
							</li>

							{/* Dropdown for Resume */}
											<li 
												className="nav-item dropdown"
												onMouseEnter={() => setIsDropdownOpen(true)}
												onMouseLeave={() => setIsDropdownOpen(false)}
											>
												<span className="nav-link">
													Download my Resume ▾
												</span>
												{isDropdownOpen && (
													<ul 
														className="dropdown-menu"
														onMouseEnter={() => setIsDropdownOpen(true)}
														onMouseLeave={() => setIsDropdownOpen(false)}
													>
														<li>
															<a href="/resumes/dev_resume.pdf" download>Developer Resume</a>
														</li>
														<li>
															<a href="/resumes/designer_resume.pdf" download>Designer Resume</a>
														</li>
														<li>
															<a href="/resumes/manager_resume.pdf" download>Manager Resume</a>
														</li>
													</ul>
												)}
											</li>
						</ul>
					</div>
				</nav>
			</div>
		</React.Fragment>
	);
};

export default NavBar;
