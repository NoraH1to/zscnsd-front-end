import { useState, FC } from 'react';

import { memberDetail } from '@/api/member';
import { useInit } from '@/hooks';
import LoadingPage from '@/components/LoadingPage';
import { authContext } from '@/wrappers/Auth/authContext';

const index: FC = (props) => {
  const [user, setUser] = useState<apiInterface.User | undefined>();
  const { data } = useInit(
    memberDetail,
    undefined,
    (res: any) => setUser && setUser(res.data),
  );
  if (!user) return <LoadingPage />;
  else
    return (
      <authContext.Provider value={{ user, setUser }}>
        <>{props.children}</>
      </authContext.Provider>
    );
};

export default index;
