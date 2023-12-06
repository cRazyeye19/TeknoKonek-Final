import axios from 'axios'

const API = axios.create({baseURL: "http://localhost:5000"})


export const addComment = (postId, commentData) => API.post(`/post/${postId}/comment`, commentData);
export const getComments = (postId) => API.get(`/post/${postId}/comments`);
export const getTimelinePosts= (id)=> API.get(`/post/${id}/timeline`);
export const likePost=(id, userId)=>API.put(`post/${id}/like`, {userId: userId})