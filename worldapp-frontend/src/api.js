import axios from "axios";

const API = axios.create({
  baseURL: "https://worldapp-frontend-latest.onrender.com/api",
  withCredentials: true,
});

export default API;