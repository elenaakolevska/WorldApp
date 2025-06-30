import axios from "axios";

const baseURL =
  process.env.REACT_APP_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://worldapp-backend-latest.onrender.com/api");

const API = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("API baseURL:", baseURL);

export default API;