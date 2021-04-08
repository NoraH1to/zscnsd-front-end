import { FC, useContext } from 'react';
import { Redirect } from 'umi';
import { authContext } from '@/wrappers/Auth/authContext';

const IsLogin: FC = (props) => {
  const userContext = useContext(authContext);
  if (!!userContext.user || !!window.localStorage.getItem('Token')) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/d/login" />;
  }
};

export default IsLogin;
