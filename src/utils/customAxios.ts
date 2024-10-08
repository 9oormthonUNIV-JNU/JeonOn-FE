import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

//토큰이 필요한 요청, 토큰 없어도 괜찮은 요청 구분하기

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
