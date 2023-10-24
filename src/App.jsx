import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import ArticlesList from "./Components/ArticlesList";
import SingleArticle from "./Components/SingleArticle"

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="NavBar">
          <Nav />
          <Routes>
            <Route path="/articles" element={<ArticlesList />} />
            <Route path="/articles/:article_id" element={<SingleArticle />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;