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

											<li className="nav-item">
												<a className="nav-link" href="/resumes/rithvik_s_resume (2).pdf" download>Download my Resume</a>
											</li>
						</ul>
					</div>
				</nav>
			</div>
		</React.Fragment>
	);
};

export default NavBar;
