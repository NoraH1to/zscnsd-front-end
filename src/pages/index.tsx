import { useState, FC } from 'react';
import { authContext } from '@/wrappers/Auth/authContext';

const index: FC = (props) => {
  const [user, setUser] = useState<apiInterface.User | undefined>();
  return (
    <authContext.Provider value={{ user, setUser }}>
      <>{props.children}</>
    </authContext.Provider>
  );
};

export default index;
