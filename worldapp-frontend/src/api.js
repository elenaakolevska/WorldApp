import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

console.log("API baseURL:", baseURL);

const API = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
