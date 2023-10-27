import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticlesByTopic } from "./api";
import ArticleCard from "./ArticleCard";

const SingleTopic = () => {
  const { slug } = useParams(); 
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getArticlesByTopic(slug) 
      .then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError("Error fetching articles for this topic. Please try again later.");
      });
  }, [slug]); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (articles.length === 0) {
    return <p>No articles found for this topic.</p>;
  }

  return (
    <section className="articles-list-container">
      <main className="article-cards-container">
        {articles.map((article) => (
          <Link className='article-link' key={article.article_id} to={`/articles/${article.article_id}`}>
            <ArticleCard article={article} />
          </Link>
        ))}
      </main>
    </section>
  );
};

export default SingleTopic;