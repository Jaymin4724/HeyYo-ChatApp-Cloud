import axios from "axios";

const api = axios.create({
  baseURL: "http://13.204.84.85:5000", // <-- YOUR EC2 SERVER IP
  withCredentials: true, // This is important for cookies
});

export default api;
