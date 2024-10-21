import axios from 'axios';
export const baseURL = 'http://167.71.227.81:8002/';
const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default axiosInstance;
