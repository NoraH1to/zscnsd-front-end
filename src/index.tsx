import apiInterface from 'api';
import { FC, useContext, useState } from 'react';
import { memberDetail } from './api/member';
import { useInit } from './hooks';
import { authContext } from './wrappers/Auth/authContext';

const index: FC = (props) => {
  const [user, setUser] = useState<apiInterface.Member>();
  const { data } = useInit(
    memberDetail,
    undefined,
    (res: any) => setUser && setUser(res.data),
  );
  return (
    <authContext.Provider value={{ user, setUser }}>
      {props.children}
    </authContext.Provider>
  );
};

export default index;
