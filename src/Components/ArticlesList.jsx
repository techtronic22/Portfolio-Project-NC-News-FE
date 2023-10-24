import React, { useState, useEffect } from "react";
import { api } from "./api";
import ArticleCard from "./ArticleCard";
import { Link } from "react-router-dom";


const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    setLoading(true);
    api.get("/articles")
      .then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setLoading(false);
        setError("Error fetching articles. Please try again later.");
      });
  }, []);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="articles-list-container">
      <div className="article-cards-container">
        {articles.map((article) => (
             <Link className = 'article-link' key={article.article_id} to={`/articles/${article.article_id}`}>
             <ArticleCard article={article} />
           </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticlesList;