import { FC, useState } from 'react';
import { mobileAuthContext } from '../wrappers/Auth/mobileAuthContext';
import apiInterface from 'api';

const mobileIndex: FC = (props) => {
  const [user, setUser] = useState<
    apiInterface.User | apiInterface.User | undefined
  >();

  return (
    <div>
      <mobileAuthContext.Provider value={{ user, setUser }}>
        {props.children}
      </mobileAuthContext.Provider>
    </div>
  );
};

export default mobileIndex;
