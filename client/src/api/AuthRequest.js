import axios from "axios";
import store from "../store/ReduxStore";
import { logOut } from "../actions/AuthAction";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 403 &&
      error.response.data.message === "Token Expired"
    ) {
      store.dispatch(logOut());
    }
    return Promise.reject(error);
  }
);

export const logIn = (formData, rememberMe) =>
  API.post("/auth/login", { ...formData, rememberMe });
export const signUp = (formData) => API.post("/auth/register", formData);
export const forgotPassword = (formData) =>
  API.post("/auth/forgot-password", formData);
export const resetPassword = (formData) =>
  API.post("/auth/reset-password", formData);
