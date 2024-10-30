import axios from 'axios';
export const baseURL =
  'https://b0f9-2401-4900-84c6-e951-6ea5-e271-e592-87d.ngrok-free.app/';
const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default axiosInstance;
