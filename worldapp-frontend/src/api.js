import axios from "axios";

const API = axios.create({
    baseURL: "https://worldapp-backend-latest.onrender.com/api",
  withCredentials: true,
});

export default API;