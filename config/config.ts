import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  routes,
  nodeModulesTransform: {
    type: 'none',
  },
  sass: {},
  fastRefresh: {},
  dynamicImport: { loading: '@/components/LoadingPage' },
});
