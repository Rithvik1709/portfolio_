import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/works.css";

const Works = () => {
	return (
		<div className="works">
			<Card
				icon={faBriefcase}
				title="Work"
				body={
					<div className="works-body">
						<div className="work">
							<img
								src="./reskilll.jpg"
								alt="Reskill"
								className="work-image"
							/>
							<div className="work-title">Reskill</div>
							<div className="work-subtitle">
								Organiser
							</div>
							<div className="work-duration">Oct 2024 - Present</div>
						</div>
						<div className="work">
							<img
								src="./gs.jpg"
								alt="GSSOC'25"
								className="work-image"
							/>
							<div className="work-title">GSSOC'25</div>
							<div className="work-subtitle">
								Project Mentor
							</div>
							<div className="work-duration">Jul 2025 - Present</div>
						</div>
						<div className="work">
							<img
								src="./mlsacit.jpg"
								alt="MLSA-CIT"
								className="work-image"
							/>
							<div className="work-title">MLSA-CIT</div>
							<div className="work-subtitle">
								Technical Team Lead
							</div>
							<div className="work-duration">Dec 2023 - Present</div>
						</div>
						<div className="work">
							<img
								src="./mlsa.jpg"
								alt="Microsoft Learn Student Ambassadors (MLSA)"
								className="work-image"
							/>
							<div className="work-title">Microsoft Learn Student Ambassadors (MLSA)</div>
							<div className="work-subtitle">
								Beta MLSA
							</div>
							<div className="work-duration">Aug 2024 - Present</div>
						</div>
						<div className="work">
							<img
								src="./deep.jpg"
								alt="Deeplearning AI"
								className="work-image"
							/>
							<div className="work-title">Deeplearning AI</div>
							<div className="work-subtitle">
								Pie & AI Ambassador
							</div>
							<div className="work-duration">Sep 2024 - Present</div>
						</div>
						<div className="work">
							<img
								src="./head.jpg"
								alt="Headstarter Ai"
								className="work-image"
							/>
							<div className="work-title">Headstarter Ai</div>
							<div className="work-subtitle">
								Software Engineer Intern
							</div>
							<div className="work-duration">Jul 2024 - Jan 2025</div>
						</div>
						<div className="work">
							<img
								src="./upskill.jpg"
								alt="Upskill Campus"
								className="work-image"
							/>
							<div className="work-title">Upskill Campus</div>
							<div className="work-subtitle">
								Machine Learning Intern
							</div>
							<div className="work-duration">Jan 2024 - Jan 2025</div>
						</div>

						<div className="work">
							<img
								src="./ecell.jpg"
								alt="E-Cell CIT"
								className="work-image"
							/>
							<div className="work-title">E-Cell CIT</div>
							<div className="work-subtitle">
								UI/UX Designer
							</div>
							<div className="work-duration">Sep 2023 - May 2024</div>
						</div>

						<div className="work">
							<img
								src="./Oasis.jpg"
								alt="Oasis Infobyte"
								className="work-image"
							/>
							<div className="work-title">Oasis Infobyte</div>
							<div className="work-subtitle">
								Python Developer Intern
							</div>
							<div className="work-duration">Mar 2023 - Apr 2023</div>
						</div>
					</div>	
				
				}
			/>
		</div>
	);
};

export default Works;
