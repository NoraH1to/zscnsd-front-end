import { history } from 'umi';
import { getToken, removeToken } from '@/utils';
import apiInterface from 'api';
import axios, { AxiosRequestConfig } from 'axios';
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

axios.defaults.baseURL = BASE_URL;

// 响应拦截
axios.interceptors.response.use(
  (response) => {
    if (response.status < 200 || response.status >= 300) {
      toast.error(response.statusText);
      return Promise.reject(response.data);
    }
    if (response.data.code) {
      if (response.data.code >= 200 && response.data.code < 300) {
        // 有 msg 配置的提醒成功
        response.config.msg && toast.success(response.config.msg);
        return Promise.resolve(response.data);
      } else if (response.data.code == 403) {
        removeToken();
        toast.error(response.data.msg);
        history.replace('/d/login');
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
  T = apiInterface.Response | apiInterface.ResponsePage
  // R = AxiosResponse<T>
>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return axios.get(url, config);
};

export const POST = function <
  T = apiInterface.Response | apiInterface.ResponsePage
  // R = AxiosResponse<T>
>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return axios.request({
    url,
    method: 'POST',
    ...config,
  });
};

export const UPLOAD = (url: string, config?: AxiosRequestConfig) => {
  toast.info('上传需等待 30 ~ 120 秒时间，请不要离开该页面');
  return POST(url, {
    ...config,
    timeout: 120 * 1000,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const EXPORT = (url: string, config?: AxiosRequestConfig) => {
  toast.info('导出需等待 30 ~ 120 秒时间，请不要离开该页面');
  return GET(url, { ...config, timeout: 120 * 1000 });
};

export default axios;
