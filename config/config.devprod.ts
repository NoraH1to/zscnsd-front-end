import { defineConfig } from 'umi';

/**
 * @description 开发环境生产接口环境
 */
export default defineConfig({
  mock: false,
  define: {
    BASE_URL: 'http://nsd.wegfan.cn',
    NODE_ENV: 'prod',
    HOST: 'http://zscnsd.norah1to.com:8001',
  },
});
