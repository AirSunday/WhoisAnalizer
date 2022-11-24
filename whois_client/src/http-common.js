import axios from "axios";
// const hostServe = "http://localhost:8080";
// const hostServe = "http://5.53.124.242:8080"; IP_HOST
export default axios.create({
  withCredentials: true,
  // baseURL: "http://localhost:8080/api",
  baseURL: "http://188.68.222.76:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});
