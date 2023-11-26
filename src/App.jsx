import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import ArticlesList from "./Components/ArticlesList";
import SingleArticle from "./Components/SingleArticle";
import TopicList from "./Components/TopicList";
import SingleTopic from "./Components/SingleTopic";
import Home from "./Components/Home";

function App() {
	return (
		<Router>
			<div>
				<Header />
				<div className="NavBar">
					<Nav />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/articles" element={<ArticlesList />} />
						<Route path="/articles/:article_id" element={<SingleArticle />} />
						<Route path="/topics" element={<TopicList />} />
						<Route path="/topics/:slug" element={<SingleTopic />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
