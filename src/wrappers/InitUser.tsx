import { FC, useContext } from 'react';
import { authContext } from '@/wrappers/Auth/authContext';
import { useInit } from '@/hooks';
import { memberDetail } from '@/api/member';
import LoadingPage from '@/components/LoadingPage';

const InitUser: FC = (props) => {
  const { user, setUser } = useContext(authContext);
  const { data } = useInit(
    memberDetail,
    undefined,
    (res: any) => setUser && setUser(res.data),
  );
  if (!user) return <LoadingPage />;
  return <>{props.children}</>;
};

export default InitUser;
