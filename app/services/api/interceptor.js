import {useContext} from 'react';
import {LoaderContext} from '../../context/LoaderContext';
import axiosInstance from './axios';

const useLoaderInterceptor = () => {
  const {setLoading} = useContext(LoaderContext);

  axiosInstance.interceptors.request.use(
    config => {
      setLoading(true);
      //   const packageName = 'com.predine';
      //   config.headers['App-Package-Name'] = packageName;
      return config;
    },
    error => {
      setLoading(false);
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    response => {
      setLoading(false);
      return response;
    },
    error => {
      setLoading(false);
      console.log(error);
      return Promise.reject(error);
    },
  );
};

export default useLoaderInterceptor;
