import { defineConfig } from 'umi';
import routes from './routes';

/**
 * @description fleek托管环境
 */
export default defineConfig({
  exportStatic: {},
  define: {
    BASE_URL: 'https://nsd.wegfan.cn',
    NODE_ENV: 'prod',
    HOST: `https://fleek.zscnsd.norah1to.com`,
  },
});
