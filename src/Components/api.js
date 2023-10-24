import axios from "axios";

export const api = axios.create({
  baseURL: "https://nc-news-ts.onrender.com/api",
});

export const getArticleById = (article_id) => {
  return api.get(`/articles/${article_id}`);
};

