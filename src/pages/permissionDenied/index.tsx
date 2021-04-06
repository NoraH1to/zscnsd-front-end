import { history } from 'umi';
import { useRealLocation } from '@/hooks';
import { authContext } from '@/wrappers/Auth/authContext';
import { FC, useEffect, useState, useContext } from 'react';
import './index.scss';
import { ParsedQuery } from 'query-string';

const permissionDenied: FC = () => {
  const userContext = useContext(authContext);
  const [count, setCount] = useState(5);
  const { query } = useRealLocation();
  const [go, setGo] = useState<{ path: string; tip: string }>({
    path: query.path?.toString() || '/login',
    tip: query.tip?.toString() || '登入',
  });
  useEffect(() => {
    if (count != 0) {
      setTimeout(() => {
        setCount((count) => count - 1);
      }, 1000);
    } else {
      history.push(go.path);
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
