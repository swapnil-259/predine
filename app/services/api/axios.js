import axios from 'axios';
export const baseURL = 'https://9b3d-2405-201-6022-588d-45af-5820-ffcc-97a9.ngrok-free.app/';
const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default axiosInstance;
