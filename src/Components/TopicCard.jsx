const TopicCard = ({ topic }) => {
  
    return (
      <div className="topic-card">
        <h2>{topic.slug}</h2>
        <div className = 'topic-content'>
        <p>{topic.description}</p>
        </div>
      </div>
    );
  };
  
  export default TopicCard;

