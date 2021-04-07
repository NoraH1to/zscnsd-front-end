import { FC, useContext } from 'react';
import { Redirect } from 'umi';
import { authContext } from '@/wrappers/Auth/authContext';
import { find } from 'ramda';
import { stringify } from 'query-string';

const IsSthRole: FC<{ roles: number[] }> = (props) => {
  const userContext = useContext(authContext);
  const roleId = find(
    (roleId) => userContext.user?.member?.role.id == roleId,
    props.roles,
  );
  let query = { path: '/', tip: '首页' };
  if (!!roleId) {
    return <div>{props.children}</div>;
  } else {
    if (
      userContext.user?.member?.role.id == 0 ||
      userContext.user?.member?.role.id == 1 ||
      (!userContext.user && !window.localStorage.getItem('Token'))
    )
      query = { path: '/login', tip: '登入页' };
    return (
      <Redirect
        to={{ pathname: '/permission-denied', search: stringify(query) }}
      />
    );
  }
};

export default IsSthRole;
