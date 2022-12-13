import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8080/api",
  // baseURL: "https://whoisa.ru/api",
  headers: {
    "Content-type": "application/json",
  },
});

// before a request is made start the nprogress
instance.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});

// before a response is returned stop nprogress
instance.interceptors.response.use((response) => {
  NProgress.done();
  return response;
});

export default instance;
