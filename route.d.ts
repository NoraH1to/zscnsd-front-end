import { IRoute } from '@umijs/types';

declare namespace routeInterface {
  export interface route extends IRoute {
    path: string;
    redirect?: string;
    routes?: route[];
    exact?: boolean;
    extraOpt?: {
      hidden?: boolean;
      key?: string;
      name?: string; // 路由名
      namePath?: string; // 路由名路径
      pageTitle?: string; // 浏览器标题
      sub?: boolean; // 是否拥有子菜单
      default?: string; // 默认子菜单
      menu?: boolean; // 是否显示在左侧菜单
      parentMenu?: string; // 父菜单
      nav?: boolean; // 是否显示在顶部导航栏
      icon?: string; // 菜单图标
    };
  }

  export interface mRoute extends IRoute {
    path: string;
    redirect?: string;
    routes?: mRoute[];
    exact?: boolean;
    extraOpt?: {
      hidden?: boolean;
      key?: string;
      name?: string; // 路由名
      namePath?: string; // 路由名路径
      pageTitle?: string; // 浏览器标题
      sub?: boolean; // 是否拥有子菜单
      default?: string; // 默认子菜单
      menu?: boolean; // 是否显示在左侧菜单
      nav?: boolean; // 是否显示在顶部导航栏
      icon?: string; // 菜单图标
    };
  }
}
