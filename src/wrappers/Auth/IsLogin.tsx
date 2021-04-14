import { FC } from 'react';
import { Redirect } from 'umi';
import { hasToken } from '@/utils';

const IsLogin: FC = (props) => {
  if (hasToken()) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/d/login" />;
  }
};

export default IsLogin;
