import axios from 'axios';

const request = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
});

request.interceptors.response.use(
  (response) => {
    const { code, message: msg } = response.data;
    if (code === 200) {
      return response.data;
    }
    return Promise.reject(new Error(msg || '请求失败'));
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request; 