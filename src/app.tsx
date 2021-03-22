import { History, Location, history } from 'umi';
import routes from '@/../config/routes';
import { map, prop, find } from 'ramda';

// 有默认子由路的路由
const getRoutesHasDefault = (
  routes: (routeInterface.route | routeInterface.mRoute)[],
): (routeInterface.route | routeInterface.mRoute)[] => {
  let result: (routeInterface.route | routeInterface.mRoute)[] = [];
  routes.forEach((route) => {
    if (route.extraOpt?.default) {
      result.push(route);
    }
    if (route.routes && route.routes.length > 0) {
      result = result.concat(getRoutesHasDefault(route.routes));
    }
  });
  return result;
};
const routesHasDefault = getRoutesHasDefault(routes);
const routePathsHasDefault = map(prop('path'), routesHasDefault);

// 监听路由变化
export function onRouteChange({
  location,
  routes,
  action,
}: {
  location: Location;
  routes: (routeInterface.route | routeInterface.mRoute)[];
  action: History['action'];
}) {
  // 如果当前为需要跳转至默认子路由的路由,则跳转
  const targetPath = find(
    (item) => item.path == location.pathname,
    routesHasDefault,
  )?.extraOpt?.default;
  if (targetPath) history.push(targetPath);
}
