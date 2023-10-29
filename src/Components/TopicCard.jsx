const TopicCard = ({ topic }) => {
  
    return (
      <div className="topic-card">
        <h1>{topic.slug}</h1>
        <div className = 'topic-content'>
        <p>{topic.description}</p>
        </div>
      </div>
    );
  };
  
  export default TopicCard;

