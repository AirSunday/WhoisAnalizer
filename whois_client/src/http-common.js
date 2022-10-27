import axios from "axios";
import {hostServe} from "../../config"; 
export default axios.create({
  withCredentials: true,
  baseURL: hostServe + "/api",
  headers: {
    "Content-type": "application/json"
  }
});