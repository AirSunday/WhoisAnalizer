import axios from "axios"; 
const hostServe = "http://5.101.51.92/:8080";
export default axios.create({
  withCredentials: true,
  baseURL: hostServe + "/api",
  headers: {
    "Content-type": "application/json"
  }
});