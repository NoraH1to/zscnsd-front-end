import { AxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    /**
     * @description 请求成功后会toast该值
     */
    msg?: string;
  }
}
