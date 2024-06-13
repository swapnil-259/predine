import axios from "axios";
export const baseURL = 'https://3f59-103-77-186-56.ngrok-free.app/'
const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true
})

export default axiosInstance