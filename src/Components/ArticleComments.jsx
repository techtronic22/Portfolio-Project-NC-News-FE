import React, { useState, useEffect } from "react";
import { getCommentsByArticleId } from "./api";
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


	return (
    <section>
        <h2>Comments</h2>

        <CommentForm
            article_id={article_id}
            username={username}
            comments={comments}
            setComments={setComments}
        />

        {comments.length === 0 ? (
            <p>No comments available for this article.</p>
        ) : (
            <ul> 
                {comments.map((comment) => (
                    <li key={comment.comment_id}>
                        <p>{comment.body}</p>
                        <p>By: {comment.author}</p>
                    </li>
                ))}
            </ul>
        )}
    </section>
	);
}

export default ArticleComments;
