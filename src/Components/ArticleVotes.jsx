import React, { useState } from "react";
import { voteArticleInc, voteArticleDec } from "./api";

const ArticleVotes = ({ article_id, inc_votes }) => {
  const [voted, setVoted] = useState(false);

  const handleVote = (inc_votes) => {
    if (!voted) {
      setVoted(true);

      const voteFunction = inc_votes > 0 ? voteArticleInc : voteArticleDec;

      voteFunction(article_id, inc_votes)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error updating vote:", error);
          setVoted(false);
        });
    }
  };

  return (
    <div>
      <p>Votes: {inc_votes}</p>
      <button onClick={() => handleVote(1)} disabled={voted}>
        +
      </button>
      <button onClick={() => handleVote(-1)} disabled={voted}>
        -
      </button>
    </div>
  );
};

export default ArticleVotes;