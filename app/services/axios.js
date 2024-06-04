import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://c446-125-21-249-98.ngrok-free.app/',
    withCredentials: true
})

export default axiosInstance