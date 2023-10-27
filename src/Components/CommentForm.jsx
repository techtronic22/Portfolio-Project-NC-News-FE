import React, { useState } from "react";
import { postComment, getCommentsByArticleId } from "./api";

const CommentForm = ({ article_id, username, comments, setComments }) => {
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
    };

    setComments([optimisticComment, ...comments]);

    postComment(article_id, optimisticComment)
      .then((postedComment) => {
        setComments(prevComments => [postedComment, ...prevComments]);
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
        setComments(prevComments => prevComments.filter((c) => c !== optimisticComment));
        setIsSubmitting(false);
      });

    setNewComment("");
  };

  return (
    <div>
      <textarea
        value={newComment}
        onChange={handleCommentChange}
        placeholder="Add a comment..."
      />
      {!isFormValid && (
        <p style={{ color: "red" }}>Please fill out the comment field.</p>
      )}
      <button onClick={handleSubmit} disabled={!isFormValid || isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Comment"}
      </button>
    </div>
  );
};

export default CommentForm;