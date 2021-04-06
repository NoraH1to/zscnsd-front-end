import { authContext } from '@/wrappers/Auth/authContext';
import { Avatar, Popover } from 'antd';
import { FC, useContext, createContext, Dispatch, useState } from 'react';
import './index.scss';
import { history } from 'umi';
import AvatarCard from './AvatarCard';

interface HeaderContext {
  popoverVisible?: boolean;
  setpopoverVisible?: Dispatch<boolean>;
}

export const headerContext = createContext<HeaderContext>({
  popoverVisible: false,
});

const Header: FC = () => {
  const [popoverVisible, setpopoverVisible] = useState<boolean>(false);
  const userContext = useContext(authContext);
  const handlerClickAvatar = () => {
    history.push('/d/user-center');
  };
  return (
    <headerContext.Provider value={{ popoverVisible, setpopoverVisible }}>
      <div className="header-container">
        <Popover
          placement="bottom"
          content={<AvatarCard user={userContext.user} />}
          visible={popoverVisible}
          onVisibleChange={(visible) => setpopoverVisible(visible)}
        >
          <div
            className="avatar-container"
            onClick={() => handlerClickAvatar()}
          >
            <Avatar>{userContext.user?.name.slice(-1)}</Avatar>
          </div>
        </Popover>
      </div>
    </headerContext.Provider>
  );
};

export default Header;
