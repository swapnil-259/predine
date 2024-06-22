import axiosInstance from './axios';
import { handleToastCodeWise } from '../utils/toast';
import { StatusCodes } from '../../constants/statusCodes';

export const postData = async (endpoint, data) => {
    try {
        const response = await axiosInstance.post(endpoint, data);
        if (response.data.msg) {
            handleToastCodeWise({ statusCode: response.status, statusMsg: response.data.msg })
        }
        return response.data;
    } catch (error) {
        console.log(error.response.status)
        if (error.response.status == StatusCodes.BAD_REQUEST || error.response.status == StatusCodes.UNAUTHORIZED || error.response.status == StatusCodes.FORBIDDEN) {
            throw handleToastCodeWise({ statusCode: error.response.status, statusMsg: error.response.data.msg })
        }
        else
            throw handleToastCodeWise({ statusCode: error.response.status })


    }
};

export const getData = async (endpoint, params) => {
    console.log("paarms", params)
    try {
        const response = await axiosInstance.get(endpoint, { params });
        if (response.data.msg) {
            handleToastCodeWise({ statusCode: response.status, statusMsg: response.data.msg });
        }
        return response.data;
    } catch (error) {
        console.log(error.response.status);
        if (error.response.status === StatusCodes.BAD_REQUEST || error.response.status === StatusCodes.UNAUTHORIZED || error.response.status === StatusCodes.FORBIDDEN) {
            throw handleToastCodeWise({ statusCode: error.response.status, statusMsg: error.response.data.msg });
        } else {
            throw handleToastCodeWise({ statusCode: error.response.status });
        }
    }
};

export const putData = async (endpoint, data) => {
    try {
        const response = await axiosInstance.put(endpoint, data);
        if (response.data.msg) {
            handleToastCodeWise({ statusCode: response.status, statusMsg: response.data.msg });
        }
        return response.data;
    } catch (error) {
        console.log(error.response.status);
        if (error.response.status == StatusCodes.BAD_REQUEST || error.response.status == StatusCodes.UNAUTHORIZED || error.response.status == StatusCodes.FORBIDDEN) {
            throw handleToastCodeWise({ statusCode: error.response.status, statusMsg: error.response.data.msg });
        } else {
            throw handleToastCodeWise({ statusCode: error.response.status });
        }
    }
};

export const deleteData = async (endpoint, data) => {
    console.log("ddddaaatttaa", data)
    try {
        const response = await axiosInstance.delete(endpoint, data);
        if (response.data.msg) {
            handleToastCodeWise({ statusCode: response.status, statusMsg: response.data.msg });
        }
        return response.data;
    } catch (error) {
        console.log(error.response.status);
        if (error.response.status == StatusCodes.BAD_REQUEST || error.response.status == StatusCodes.UNAUTHORIZED || error.response.status == StatusCodes.FORBIDDEN) {
            throw handleToastCodeWise({ statusCode: error.response.status, statusMsg: error.response.data.msg });
        } else {
            throw handleToastCodeWise({ statusCode: error.response.status });
        }
    }
};