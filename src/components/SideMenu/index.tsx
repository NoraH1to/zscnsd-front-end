import { Menu } from 'antd';
import './index.scss';

import { History, Location } from 'umi';

import { useState, useEffect, FC } from 'react';
import { routeInterface } from 'route';

const { SubMenu } = Menu;

const SideMenu: FC<{ history: History; pcRoutes?: routeInterface.route[] }> = (
  props,
) => {
  const { history, pcRoutes } = props;
  // 当前选中的菜单
  const [currentMenuKey, setCurrentMenuKey] = useState([
    history.location.pathname,
  ]);
  // 当前展开的菜单
  const [currentOpenSubMenuKey, setCurrentOpenSubMenuKey] = useState<any[]>([]);

  // 根据路径获取需要展开的菜单
  const getMenuNeedOpen = (
    path: string,
    routes: routeInterface.route[],
  ): any => {
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

  useEffect(() => {
    // 首次进入展开对应菜单
    setCurrentOpenSubMenuKey(
      getMenuNeedOpen(location.pathname, pcRoutes || []),
    );
    // 监听路由变化,更新菜单
    const unlisten = history.listen((location: Location) => {
      setCurrentMenuKey([location.pathname]);
    });
    // 组件销毁前解除监听
    return () => {
      unlisten();
    };
  }, []);

  useEffect(() => {
    setCurrentOpenSubMenuKey(
      currentOpenSubMenuKey.concat(
        getMenuNeedOpen(currentMenuKey[0], pcRoutes || []),
      ),
    );
  }, [currentMenuKey]);

  return (
    <>
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
                  <Menu.Item key={route.path}>{route.extraOpt?.name}</Menu.Item>
                );
            })
          : null}
      </Menu>
    </>
  );
};

export default SideMenu;
