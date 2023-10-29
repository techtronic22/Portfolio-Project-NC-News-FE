import React, { useState, useEffect } from "react";
import { getCommentsByArticleId, deleteCommentById } from "./api";
import CommentForm from "./CommentForm";

const ArticleComments = ({ article_id, username }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getCommentsByArticleId(article_id)
      .then((response) => {
        setComments(response.data.comments);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError("An error occurred while fetching comments.");
      });
  }, [article_id]);

  const handleDelete = (comment_id) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.comment_id !== comment_id)
    );

    deleteCommentById(comment_id)
      .catch((error) => {
        getCommentsByArticleId(article_id).then((response) => {
          setComments(response.data.comments);
        });
      });
  };

  if (loading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="comments-container">
      <h2>Comments</h2>
      <CommentForm article_id={article_id} username={username} setComments={setComments} />
      {comments.length === 0 ? (
        <p>No comments available for this article.</p>
      ) : (
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.comment_id}>
              <p>{comment.body}</p>
              <p>By: {comment.author}</p>
              {comment.author === username && (
                <button onClick={() => handleDelete(comment.comment_id)}>
                  Delete Comment
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ArticleComments;