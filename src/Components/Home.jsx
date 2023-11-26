import React from "react";
import NewsImg from "../../news-img.jpg";

function Home() {
	return (
		<div className="Home-section">
			<h1 className="Home-title">Welcome to NC News!</h1>
			<p className="sub-title">
				{" "}
				To browse the latest article, please navigate to our articles section
			</p>
			<img src={NewsImg} className="News-img"></img>
		</div>
	);
}

export default Home;
