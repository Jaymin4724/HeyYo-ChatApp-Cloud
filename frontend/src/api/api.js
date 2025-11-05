import axios from "axios";

const api = axios.create({
  baseURL: "/", // <-- YOUR EC2 SERVER IP
  withCredentials: true, // This is important for cookies
});

export default api;
