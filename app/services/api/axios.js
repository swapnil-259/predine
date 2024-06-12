import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://ab91-103-77-186-56.ngrok-free.app',
    withCredentials: true
})

export default axiosInstance