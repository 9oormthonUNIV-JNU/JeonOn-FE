import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getAuthToken } from './tokenHandler';

//토큰이 필요한 요청, 토큰 없어도 괜찮은 요청 구분하기

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_CLIENT_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {},
  withCredentials: true,
});

//토큰이 있다면 헤더에 토큰 추가하기 로직
api.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    const nextConfig = config;
    const accessToken = getAuthToken();
    nextConfig.headers.Authorization = accessToken ? `${accessToken}` : '';

    return nextConfig;
  },
  (error) => {
    console.log(error);
    alert(error.response?.data.message);
    throw error;
  },
);

export { api };
