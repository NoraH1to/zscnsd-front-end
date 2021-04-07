import apiInterface from 'api';
import axios from 'axios';
import { FC, useContext, useState } from 'react';
import { memberDetail } from './api/member';
import LoadingPage from './components/LoadingPage';
import { useInit } from './hooks';
import { authContext } from './wrappers/Auth/authContext';

const index: FC = (props) => {
  const [user, setUser] = useState<apiInterface.Member | undefined>();
  const { data } = useInit(
    memberDetail,
    undefined,
    (res: any) => setUser && setUser(res.data),
  );
  if (!user) return <LoadingPage />;
  else
    return (
      <authContext.Provider value={{ user, setUser }}>
        {props.children}
      </authContext.Provider>
    );
};

export default index;
