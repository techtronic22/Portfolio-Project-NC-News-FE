import React, { useState } from "react";
import { postComment } from "./api";

const CommentForm = ({ article_id, username, setComments }) => {
  const [newComment, setNewComment] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
    if (e.target.value.trim() !== "") {
      setIsFormValid(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (newComment.trim() === "") {
      setIsFormValid(false);
      setIsSubmitting(false);
      return;
    }

    const optimisticComment = {
      author: username,
      body: newComment,
      comment_id: Date.now(),
    };

    setComments((prevComments) => [optimisticComment, ...prevComments]);

    postComment(article_id, optimisticComment)
      .then((postedComment) => {
        setComments((prevComments) =>
          prevComments.map((c) =>
            c.comment_id === optimisticComment.comment_id ? postedComment : c
          )
        );
        setIsSubmitting(false);
      })
      .catch((error) => {
        setComments((prevComments) =>
          prevComments.filter(
            (c) => c.comment_id !== optimisticComment.comment_id
          )
        );
        setIsSubmitting(false);
      });

    setNewComment("");
  };

  return (
    <div className="comment-form">
      <textarea
        className="comment-textarea"
        value={newComment}
        onChange={handleCommentChange}
        placeholder="Add a comment..."
      />
      {!isFormValid && (
        <p className="error-message">Please fill out the comment field.</p>
      )}
      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Comment"}
      </button>
    </div>
  );
};

export default CommentForm;