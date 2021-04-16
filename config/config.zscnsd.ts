import { defineConfig } from 'umi';

/**
 * @description 网维生产环境
 */
export default defineConfig({
  mock: false,
  define: {
    // TODO: 填入网维后端地址
    BASE_URL: undefined,
    NODE_ENV: 'prod',
  },
});
