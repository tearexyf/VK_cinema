import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cinemaguide.skillbox.cc/", 
  withCredentials: true, 
});

export default axiosInstance;