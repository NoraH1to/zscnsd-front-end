import { Layout, Menu, Breadcrumb } from 'antd';
import './index.scss';

import { desktopRoute } from '@/../config/routes';

import { History, Location } from 'umi';

import { useState, useEffect, useMemo, useContext } from 'react';
import { routeInterface } from 'route';

// 抽取出 PC 端的路由
const [, , ,pcRoute] = desktopRoute;
const { routes: pcRoutes } = pcRoute;

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

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

// 根据路径获取需要展开的菜单
const getMenuNeedOpen = (path: string, routes: routeInterface.route[]): any => {
  for (let route of routes) {
    if (path === route.path) {
      if (route.extraOpt?.sub || route.extraOpt?.default)
        return [route.extraOpt?.key];
      return [route.extraOpt?.parentMenu] ?? [];
    }
    if (route.routes && route.routes.length > 0) {
      let result = getMenuNeedOpen(path, route.routes);
      if (result.length > 0) return result;
    }
  }
  return [];
};

const index = (props: any) => {
  const {
    routes,
    history,
  }: { routes: routeInterface.route[]; history: History } = props;
  // 当前选中的菜单
  const [currentMenuKey, setCurrentMenuKey] = useState([
    history.location.pathname,
  ]);
  // 当前展开的菜单
  const [currentOpenSubMenuKey, setCurrentOpenSubMenuKey] = useState<any[]>([]);

  useEffect(() => {
    // 首次进入展开对应菜单
    setCurrentOpenSubMenuKey(
      getMenuNeedOpen(location.pathname, pcRoutes || []),
    );
    // 监听路由变化,更新左侧菜单
    const unlisten = history.listen(
      (location: Location, action: History['action']) => {
        setCurrentMenuKey([location.pathname]);
      },
    );
    // 组件销毁前解除监听
    return () => {
      unlisten();
    };
  }, []);

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
        <div className="logo" />
        <Menu
          theme="light"
          onSelect={({ key: path }: { key: any }) => history.push(path)}
          selectedKeys={currentMenuKey}
          openKeys={currentOpenSubMenuKey}
          onOpenChange={(openKeys) => setCurrentOpenSubMenuKey(openKeys)}
          mode="inline"
        >
          {pcRoutes
            ? pcRoutes.map((route) => {
                if (route.extraOpt?.hidden || !route.extraOpt?.menu) return;
                if (
                  route.extraOpt?.sub &&
                  route.routes &&
                  route.routes.length > 0
                )
                  return (
                    <SubMenu key={route.path} title={route.extraOpt?.name}>
                      {route.routes.map((childRoute) =>
                        childRoute.extraOpt?.hidden ? null : (
                          <Menu.Item key={childRoute.path}>
                            {childRoute.extraOpt?.name}
                          </Menu.Item>
                        ),
                      )}
                    </SubMenu>
                  );
                else
                  return (
                    <Menu.Item key={route.path}>
                      {route.extraOpt?.name}
                    </Menu.Item>
                  );
              })
            : null}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-header" style={{ padding: 0 }} />
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
