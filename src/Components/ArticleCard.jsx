const ArticleCard = ({ article }) => {
  console.log(article);
    const formattedDate = new Date(article.created_at).toLocaleDateString();
  
    return (
      <div className="article-card">
        {article.article_img_url && <img src={article.article_img_url} alt={article.title} />}
        <h2>{article.title}</h2>
        <h3 className="article-desc">{article.body}</h3>
        <div className = 'card-content'>
        <p>Topic: {article.topic}</p>
        <p>Author: {article.author}</p>
        <p>Created At: {formattedDate}</p>
        <p> Votes: {article.votes}</p>
        <p>Comment Count: {article.comment_count}</p>
        </div>
      </div>
    );
  };
  
  export default ArticleCard;


