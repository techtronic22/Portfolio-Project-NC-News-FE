import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import ArticlesList from "./Components/ArticlesList";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="NavBar">
          <Nav />
          <Routes>
            <Route path="/articles" element={<ArticlesList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;