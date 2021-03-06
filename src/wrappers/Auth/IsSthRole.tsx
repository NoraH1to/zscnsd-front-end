import { FC, useContext } from 'react';
import { Redirect } from 'umi';
import { authContext } from '@/wrappers/Auth/authContext';
import { find } from 'ramda';
import { stringify } from 'query-string';
import { hasToken } from '@/utils';

const IsSthRole: FC<{ roles: number[] }> = (props) => {
  const userContext = useContext(authContext);
  const roleId = find(
    (roleId) => userContext.user?.member?.role.id == roleId,
    props.roles,
  );
  let query = { path: '/d', tip: '首页' };
  if (!!roleId) {
    return <div>{props.children}</div>;
  } else {
    if (
      userContext.user?.member?.role.id == 0 ||
      userContext.user?.member?.role.id == 1 ||
      !hasToken()
    )
      query = { path: '/d/login', tip: '登入页' };
    return (
      <Redirect
        to={{ pathname: '/d/permission-denied', search: stringify(query) }}
      />
    );
  }
};

export default IsSthRole;
