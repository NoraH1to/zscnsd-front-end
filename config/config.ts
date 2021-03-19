import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  publicPath: '/static/',
  routes,
  nodeModulesTransform: {
    type: 'none',
  },
  sass: {},
  fastRefresh: {},
});
