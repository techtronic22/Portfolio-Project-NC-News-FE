import React, { useState } from "react";
import { postComment, deleteCommentById, getCommentsByArticleId } from "./api";

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
			comment_id: Date.now(),
		};

		setComments([optimisticComment, ...comments]);

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

	const handleDelete = (comment_id) => {
		setComments((prevComments) =>
			prevComments.filter((comment) => comment.comment_id !== comment_id)
		);

		setIsSubmitting(true);

		deleteCommentById(comment_id)
			.then(() => {
				setIsSubmitting(false);
			})
			.catch((error) => {
				setComments((prevComments) =>
					prevComments.filter((c) => c.comment_id !== comment_id)
				);
				setIsSubmitting(false);
			});
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

			{comments.length > 0 && (
				<ul>
					{comments.map((comment) => (
						<li key={comment.comment_id}>
							<p>{comment.body}</p>
							<p>By: {comment.author}</p>
							{comment.author === username && (
								<button
									key={`delete-${comment.comment_id}`}
									onClick={() => handleDelete(comment.comment_id)}
									disabled={isSubmitting}>
									{isSubmitting ? "Deleting..." : "Delete Comment"}
								</button>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default CommentForm;
