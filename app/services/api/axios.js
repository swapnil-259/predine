import axios from "axios";
export const baseURL = 'https://0631-125-21-249-98.ngrok-free.app/'
const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true
})

export default axiosInstance;