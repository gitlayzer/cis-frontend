import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

const request = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    const { code, message: msg } = response.data;
    if (code === 200) {
      return response.data;
    }
    return Promise.reject(new Error(msg || '请求失败'));
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default request; 