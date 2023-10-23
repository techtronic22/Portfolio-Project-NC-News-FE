import React, { useState, useEffect } from "react";
import axios from "axios";

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

  return (
    <div>
      {loading ? (
        <p>Loading articles...</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.article_id}>
              <h3>{article.title}</h3>
              <p>{article.body}</p>
              <p>Topic: {article.topic}</p>
              <p>Author: {article.author}</p>
              <p>Created At: {article.created_at}</p>
              <p>Votes: {article.votes}</p>
              <p>Comment Count: {article.comment_count}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArticlesList;