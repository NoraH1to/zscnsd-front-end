import { history } from '@/.umi/core/history';
import { getToken, removeToken } from '@/utils';
import apiInterface from 'api';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

axios.defaults.timeout = 5000; // 响应时间
axios.defaults.headers['Content-Type'] = 'application/json'; // 配置请求头
axios.defaults.withCredentials = true;

// 请求拦截
axios.interceptors.request.use(
  (config) => {
    config.headers['Token'] = getToken();
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
    if (response.status < 200 || response.status >= 300) {
      toast.error(response.statusText);
      return Promise.reject(response.data);
    }
    if (response.data.code) {
      if (response.data.code >= 200 && response.data.code < 300) {
        // 有 msg 配置的提醒成功
        response.config.msg && toast.success(response.config.msg);
        return Promise.resolve(response.data);
      } else if (response.data.code >= 300 && response.data.code < 400) {
        toast.error(response.data.msg);
        removeToken();
        history.push('/d/login');
      } else {
        toast.error(response.data.msg);
      }
    }
    return Promise.reject(response.data);
  },
  (error) => {
    toast.error(error.message);
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
