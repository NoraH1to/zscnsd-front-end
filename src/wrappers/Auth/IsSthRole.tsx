import { FC, useContext } from 'react';
import { Redirect } from 'umi';
import { authContext } from '@/wrappers/Auth/authContext';
import { find } from 'ramda';

const IsSthRole: FC<{ roles: number[] }> = (props) => {
  const userContext = useContext(authContext);
  if (
    !!find((roleId) => userContext.user?.member?.role.id == roleId, props.roles)
  ) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/permission-denied" />;
  }
};

export default IsSthRole;
