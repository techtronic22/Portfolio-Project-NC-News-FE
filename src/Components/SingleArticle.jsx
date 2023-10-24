import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "./api";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get(`/articles/${article_id}`)
      .then((response) => {
        setArticle(response.data.article);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching article ${article_id}:`, error);
        setLoading(false);
        setError("Error fetching the article. Please try again later.");
      });
  }, [article_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.body}</p>
      <div className = 'single-card-content'>
        <p>Topic: {article.topic}</p>
        <p>Author: {article.author}</p>
        <p>Created At: {article.created_at}</p>
        <p> Votes: {article.votes}</p>
        <p>Comment Count: {article.comment_count}</p>
    </div>
    </div>
  );
};

export default SingleArticle;