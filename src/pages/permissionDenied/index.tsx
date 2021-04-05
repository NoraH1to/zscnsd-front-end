import { history } from '@/.umi/core/history';
import { authContext } from '@/wrappers/Auth/authContext';
import { FC, useEffect, useState, useContext } from 'react';
import './index.scss';

const permissionDenied: FC = () => {
  const userContext = useContext(authContext);
  const [count, setCount] = useState(5);
  const [go, setGo] = useState<{ path: string; tip: string }>({
    path: '/',
    tip: '首页',
  });
  useEffect(() => {
    if (!userContext.user) {
      setGo({ path: '/login', tip: '登录页面' });
      return;
    }
    if (!!userContext?.user?.member?.role?.id) {
      switch (userContext.user.member.role.id) {
        case 0:
          setGo({ path: '/login', tip: '登录页面' });
          break;
        case 1:
          setGo({ path: '/login', tip: '登录页面' });
          break;
      }
    }
    return;
  }, []);
  useEffect(() => {
    if (count != 0) {
      setTimeout(() => {
        setCount((count) => count - 1);
      }, 1000);
    } else {
      if (go.path == '-1') history.goBack();
      else history.push(go.path);
    }
  }, [count]);
  return (
    <div className="permission-denied-container">
      <div className="text">
        无权访问，<span>{count}</span> 秒后自动返回{go.tip}
      </div>
    </div>
  );
};

export default permissionDenied;
