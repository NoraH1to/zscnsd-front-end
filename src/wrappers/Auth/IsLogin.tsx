import { FC, useContext } from 'react';
import { Redirect } from 'umi';
import { authContext } from '@/wrappers/Auth/authContext';
import { hasToken } from '@/utils';

const IsLogin: FC = (props) => {
  const userContext = useContext(authContext);
  if (hasToken()) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/d/login" />;
  }
};

export default IsLogin;
