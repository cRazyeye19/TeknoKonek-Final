import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const uploadStory = (data) => API.post("/story", data);
export const getStories = () => API.get("/story");
export const getStory = (id) => API.get(`/story/${id}`);