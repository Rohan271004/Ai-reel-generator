import axios from "axios";

const API = axios.create({
    baseURL: "https://ai-reels-generator-9fb6.onrender.com/api/",
});

export default API;