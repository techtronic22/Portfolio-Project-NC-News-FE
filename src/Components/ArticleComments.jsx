import React, { useState, useEffect } from "react";
import { getCommentsByArticleId } from "./api";

const ArticleComments = ({ article_id }) => {
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
				console.error("Error fetching articles:", error);
				setLoading(false);
				setError("An error occurred while fetching comments.");
			});
          }, [article_id]);
			

	if (loading) {
		return <p>Loading comments...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

    if (comments.length === 0) {
        return <p>No comments available for this article.</p>
    }
	
return (
    <section>
        <h2>Comments</h2>
        <ul>
            {comments.map((comment) => (
                <li key={comment.comment_id}>
                    <p>{comment.body}</p>
                    <p>By: {comment.author}</p>
                </li>
            ))}
        </ul>
    </section>
);
}

export default ArticleComments;
