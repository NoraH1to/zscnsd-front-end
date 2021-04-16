import { defineConfig } from 'umi';
import routes from './routes';

/**
 * @description 基础环境
 */
export default defineConfig({
  routes,
  nodeModulesTransform: {
    type: 'none',
  },
  sass: {},
  fastRefresh: {},
  dynamicImport: { loading: '@/components/LoadingPage' },
  define: {
    BASE_URL: undefined,
    NODE_ENV: 'dev',
    HOST: 'http://zscnsd.norah1to.com:8000',
  },
});
