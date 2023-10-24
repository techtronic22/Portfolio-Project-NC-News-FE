import React, { useState, useEffect } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard"; 


const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://nc-news-ts.onrender.com/api/articles")
      .then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p> Loading ...</p>
  }

  return (
    <div className="articles-list-container">
      <div className="article-cards-container">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticlesList;