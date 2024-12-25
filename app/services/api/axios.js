import axios from 'axios';
export const baseURL =
  'https://api.predine.in/';
const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default axiosInstance;
