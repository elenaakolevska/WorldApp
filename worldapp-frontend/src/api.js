import axios from "axios";

const API = axios.create({
  baseURL: "https://worldapp-backend-latest.onrender.com",
  withCredentials: true,
});

export default API;