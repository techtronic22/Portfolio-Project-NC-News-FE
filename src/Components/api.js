import axios from "axios";

export const api = axios.create({
  baseURL: "https://nc-news-backend-s2kz.onrender.com/api",
});

export const getArticleById = (article_id) => {
  return api.get(`/articles/${article_id}`);
};

export const getCommentsByArticleId = (article_id) => {
    return api.get(`/articles/${article_id}/comments`);
};

export const voteArticleInc = (article_id) => {
  return api.patch(`/articles/${article_id}`, {inc_votes: 1})
}

export const voteArticleDec = (article_id) => {
  return api.patch(`/articles/${article_id}`, {inc_votes: -1})
}

export const postComment = (article_id, optimisticComment) => {
  const newComment = { username: optimisticComment.author,
    body: optimisticComment.body,}

  return api.post(`/articles/${article_id}/comments`, newComment)
    .then((postResponse) => {
      return postResponse.data;  
    });

};

export const getArticlesByTopic = (slug) => {
  return api.get(`/articles?topic=${slug}`);
};

export const getSortedArticles = (sort_by = "created_at", order = "desc") => {
  return api.get(`/articles?sort_by=${sort_by}&order=${order}`);
};