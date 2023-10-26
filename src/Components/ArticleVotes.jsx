import React, { useEffect, useState } from "react";
import { voteArticleInc, voteArticleDec } from "./api";

const ArticleVotes = ({ article_id, initialVotes }) => {
  const [voted, setVoted] = useState(0);
  const [localVotes, setLocalVotes] = useState(initialVotes); 

  useEffect(() => {
      if (voted === 0) return;

      const voteFunction = voted === 1 ? voteArticleInc : voteArticleDec;

      voteFunction(article_id)
          .then((response) => {
              setLocalVotes(response.data.votes);
          })
          .catch((error) => {
              console.error("Error updating vote:", error);
              setVoted(0); 
          });
  }, [voted, article_id]);


  const handleClick = (currentVote) => {
      if ((currentVote === 1 && voted !== 1) || (currentVote === -1 && voted !== -1)) {
          setVoted(currentVote);
      } else {
          setVoted(0);  
      }
  };

  return (
      <div>
          <p> Votes: {localVotes}</p>
          <button onClick={() => handleClick(1)} disabled={voted === 1}>+</button>
          <button onClick={() => handleClick(-1)} disabled={voted === -1}>-</button>
      </div>
  );
};


export default ArticleVotes;