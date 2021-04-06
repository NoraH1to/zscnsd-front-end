import { Layout, Menu, Breadcrumb } from 'antd';
import './index.scss';

import { desktopRoute } from '@/../config/routes';

import { History, Location } from 'umi';

import { useState, useEffect, useMemo, useContext } from 'react';
import { routeInterface } from 'route';

import SideMenu from '@/components/SideMenu';
import HeaderContent from '@/components/Header';

// 抽取出 PC 端的路由
const [, , , pcRoute] = desktopRoute;
const { routes: pcRoutes } = pcRoute;

const { Header, Content, Footer, Sider } = Layout;

// 根据路径获取指定路由列表中的路由全名
const getRouteNamePath = (
  path: string,
  routes: routeInterface.route[],
): string => {
  for (let route of routes) {
    if (path === route.path) return route.extraOpt?.namePath ?? '_null';
    if (route.routes && route.routes.length > 0) {
      let result = getRouteNamePath(path, route.routes);
      if (result !== '_null') return result;
    }
  }
  return '_null';
};

const index = (props: any) => {
  const {
    history,
  }: { routes: routeInterface.route[]; history: History } = props;

  // 面包屑
  const breadCrumbDataList = useMemo(
    () => getRouteNamePath(history.location.pathname, pcRoutes || []),
    [history.location.pathname],
  );
  const breadCrumb = breadCrumbDataList
    .split('/')
    .map((namePath) => (
      <Breadcrumb.Item key={namePath}>{namePath}</Breadcrumb.Item>
    ));
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" className="site-layout-sider">
        <SideMenu pcRoutes={pcRoutes} history={history} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-header" style={{ padding: 0 }}>
          <HeaderContent />
        </Header>
        <Content style={{ margin: '24px 24px 0px 24px' }}>
          {breadCrumbDataList == '_null' ? null : (
            <Breadcrumb style={{ margin: '0 0 16px 0' }}>
              {breadCrumb}
            </Breadcrumb>
          )}
          <div className="site-content" style={{ padding: 24 }}>
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          NoraH1to ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default index;
