import React, { useState, useEffect } from "react";
import { getSortedArticles } from "./api";  
import ArticleCard from "./ArticleCard";
import { Link } from "react-router-dom";

// Added SortBy Functionality to FE,however due to issues on BE, it isn't fully working. I have spoken to my mentor, Jodie, and she 
// suggested to move on to the next ticket. 'It seems that you haven't got it sorted for the BE functionality so I'd make a note to 
// return to it and continue with building functionality for the FE that does work with your BE'

// Also I have accidentally done ticket 10 as part of my PR for ticket 9, Sorry about that


const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort_by, setSortBy] = useState("created_at");  
  const [order, setOrder] = useState("desc");  

  useEffect(() => {
    setLoading(true);
    getSortedArticles(sort_by, order)
      .then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError("Error fetching articles. Please try again later.");
      });
  }, [sort_by, order]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="articles-list-container">
      <div className="sorting-controls">
        <select onChange={handleSortChange}>
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
        <select onChange={handleOrderChange}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <div className="article-cards-container">
        {articles.map((article) => (
          <Link className="article-link" key={article.article_id} to={`/articles/${article.article_id}`}>
            <ArticleCard article={article} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticlesList;