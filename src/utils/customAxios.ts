import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';


const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_CLIENT_URL,
  headers: {
    'Content-Type': 'application/json',

  },
  params: {},
  //   withCredentials: true,
});

api.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    return config;
  },
  (error) => {
    console.log(error);
    alert(error.response?.data.message);
    throw error;
  },
);

export { api };
