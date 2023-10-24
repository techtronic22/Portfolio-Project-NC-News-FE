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