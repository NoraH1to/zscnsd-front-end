import apiInterface from 'api';
import { FC, useContext, useState } from 'react';
import { authContext } from './wrappers/Auth/authContext';

const index: FC = (props) => {
  const [user, setUser] = useState<apiInterface.Member>();
  return (
    <authContext.Provider value={{ user, setUser }}>
      {props.children}
    </authContext.Provider>
  );
};

export default index;
