import axios from "axios";
export default axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8080/api",
  // baseURL: "https://whoisa.ru/api",
  headers: {
    "Content-type": "application/json",
  },
});
