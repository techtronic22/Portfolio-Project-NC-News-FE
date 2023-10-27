import React, { useState, useEffect } from "react";
import { api } from "./api";
import TopicCard from "./TopicCard";
import { Link } from "react-router-dom";

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get("/topics")
      .then((response) => {
        setTopics(response.data.topics);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError("Error fetching topics. Please try again later.");
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="topics-list-container">
      <main className="topics-cards-container">
        {topics.map((topic) => (
          <Link className='topics-link' key={topic.slug} to={`/topics/${topic.slug}`}>
            <TopicCard topic={topic} />
          </Link>
        ))}
      </main>
    </section>
  );
};

export default TopicList;