import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "./api";
import ArticleComments from "./ArticleComments";
import ArticleVote from "./ArticleVotes";
import CommentForm from "./CommentForm";

const SingleArticle = () => {
	const { article_id } = useParams();
	const [article, setArticle] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		getArticleById(article_id)
			.then((response) => {
				setArticle(response.data.article);
				setLoading(false);
			})
			.catch((error) => {
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

	const formattedDate = new Date(article.created_at).toLocaleDateString();

	return (
		<div className="single-article-container">
			{article.article_img_url && (
				<img
					className="article-image"
					src={article.article_img_url}
					alt={article.title}
				/>
			)}
			<h2>{article.title}</h2>
			<p>{article.body}</p>
			<div className="single-card-content">
				<p>Topic: {article.topic}</p>
				<p>Author: {article.author}</p>
				<p>Created At: {formattedDate}</p>
				<p> Votes: {article.votes}</p>
				<ArticleVote article_id={article_id} />
				<p>Comment Count: {article.comment_count}</p>
			</div>
			<ArticleComments article_id={article_id} username={article.author} />
		</div>
	);
};

export default SingleArticle;
