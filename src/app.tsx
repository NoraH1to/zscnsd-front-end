import { History, Location, history } from 'umi';
import routes, { route } from '@/../config/routes';
import { map, prop, propEq, find } from 'ramda';

// 有默认子由路的路由
const getRoutesHasDefault = (routes: route[]): route[] => {
  let result: route[] = [];
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
  routes: route[];
  action: History['action'];
}) {
  // 如果当前为需要跳转至默认子路由的路由,则跳转
  const targetPath = find(propEq('path', location.pathname), routesHasDefault)
    ?.extraOpt?.default;
  if (targetPath) history.push(targetPath);
}
