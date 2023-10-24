import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-ts.onrender.com/api",
});

export default newsApi;