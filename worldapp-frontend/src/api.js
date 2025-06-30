import axios from "axios";

let baseURL = "";

const hostname = window.location.hostname;

if (hostname === "localhost") {
  baseURL = "http://localhost:5000/api";
} else if (hostname === "worldapp.local") {
  baseURL = "/api";
} else {
  baseURL = "https://worldapp-backend-latest.onrender.com/api";
}

const API = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;