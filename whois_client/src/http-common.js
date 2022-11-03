import axios from "axios"; 
// const hostServe = "http://localhost:8080";
// const hostServe = "http://5.53.124.242:8080"; IP_HOST
console.log(process.env.IP_HOST + ":8080/api")
export default axios.create({
  withCredentials: true,
  baseURL: process.env.IP_HOST + ":8080/api",
  headers: {
    "Content-type": "application/json"
  }
});