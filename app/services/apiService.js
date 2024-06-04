import axiosInstance from './axios';
import ShowToast, { handleToastCodeWise } from './toast';

export const postData = async (endpoint, data) => {
    try {
        const response = await axiosInstance.post(endpoint, data);
        if (response.data.msg) {
            handleToastCodeWise({ statusCode: response.status, statusMsg: response.data.msg })
        }
        return response.data;
    } catch (error) {
        if (error.response.status == 400 || error.response.status == 401 || error.response.status == 403) {
            throw handleToastCodeWise({ statusCode: error.response.status, statusMsg: error.response.data.msg })
        }
        else
            throw handleToastCodeWise({ statusCode: error.response.data })


    }
};