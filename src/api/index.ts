import apiInterface from 'api';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

axios.defaults.timeout = 5000; // 响应时间
axios.defaults.headers['Content-Type'] = 'application/json'; // 配置请求头
axios.defaults.withCredentials = true;

// 请求拦截
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截
axios.interceptors.response.use(
  (response) => {
    console.log('response', response);
    if (response.data.code) {
      if (response.data.code !== 200) {
        if (response.data.code !== 400) {
          // Toast.error(response.data.msg)
        }
      } else {
        // 有 msg 配置的提醒成功
        // response.config.msg ? Toast.success(response.config.msg + '成功') : undefined
        return Promise.resolve(response.data);
      }
    }
    return Promise.reject(response.data);
  },
  (error) => {
    // Toast.error(error.message)
    return Promise.reject(error);
  },
);

export const GET = function <
  T = apiInterface.Response | apiInterface.ResponsePage,
  R = AxiosResponse<T>
>(url: string, config?: AxiosRequestConfig): Promise<R> {
  return axios.get(url, config);
};

export const POST = function <
  T = apiInterface.Response | apiInterface.ResponsePage,
  R = AxiosResponse<T>
>(url: string, config?: AxiosRequestConfig): Promise<R> {
  return axios.request({
    url,
    method: 'POST',
    ...config,
  });
};

export default axios;
