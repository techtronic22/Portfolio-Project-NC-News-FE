const ArticleCard = ({ article }) => {
    return (
      <div className="article-card">
        <h2>{article.title}</h2>
        <h3 className="article-desc">{article.body}</h3>
        <div className = 'card-content'>
        <p>Topic: {article.topic}</p>
        <p>Author: {article.author}</p>
        <p>Created At: {article.created_at}</p>
        <p> Votes: {article.votes}</p>
        <p>Comment Count: {article.comment_count}</p>
        </div>
      </div>
    );
  };
  
  export default ArticleCard;


