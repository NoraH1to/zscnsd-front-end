import { FC, useContext, useEffect, useState } from 'react';
import { TabBar, WhiteSpace, WingBlank } from 'antd-mobile';
import { history, Location } from 'umi';
import './main.scss';
import { mobileAuthContext } from '../wrappers/Auth/mobileAuthContext';

const ImgIcon: FC<{ src: string }> = ({ src }) => (
  <div
    style={{
      width: '22px',
      height: '22px',
      background: `url(${src}) center center /  21px 21px no-repeat`,
    }}
  />
);

const HOME = 'home';
const HOME_PATH = '/m/home';
const WORK = 'work';
const WORK_PATH = '/m/work';
const USERCENTER = 'userCenter';
const USERCENTER_PATH = '/m/user-center';

const Navigation: FC = () => {
  const { user, setUser } = useContext(mobileAuthContext);

  const [currentTab, setCurrentTab] = useState<string>(HOME);

  const setActive = (location: Location) => {
    if (location.pathname.indexOf(HOME_PATH) != -1) {
      setCurrentTab(HOME);
    } else if (location.pathname.indexOf(WORK_PATH) != -1) {
      setCurrentTab(WORK);
    } else if (location.pathname.indexOf(USERCENTER_PATH) != -1) {
      setCurrentTab(USERCENTER);
    } else {
      setCurrentTab('');
    }
  };

  useEffect(() => {
    setActive(history.location);
    // 监听路由变化,更新菜单
    const unlisten = history.listen((location: Location) =>
      setActive(location),
    );
    // 组件销毁前解除监听
    return () => {
      unlisten();
    };
  }, []);

  // 因为 antd mobile 内部屎一般的实现，只能出此下策
  useEffect(() => {
    if (user && !user.member) {
      document.getElementsByClassName('am-tab-bar-tab')[1].style.display =
        'none';
    }
  }, [user]);

  // 如果当前是子路由或者就是本身，则不跳转
  const go = (path: string) =>
    history.location.pathname.indexOf(path) == -1 && history.push(path);

  return (
    <div className="m-navigation">
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        <TabBar.Item
          selected={currentTab == HOME}
          title="首页"
          key={HOME}
          onPress={() => {
            setCurrentTab(HOME);
            go(HOME_PATH);
          }}
          icon={<ImgIcon src={require('@/mobile/asset/home_gray_21px.svg')} />}
          selectedIcon={
            <ImgIcon src={require('@/mobile/asset/home_blue_21px.svg')} />
          }
        />
        <TabBar.Item
          selected={currentTab == WORK}
          title="工作"
          key={WORK}
          onPress={() => {
            setCurrentTab(WORK);
            go(WORK_PATH);
          }}
          icon={
            <ImgIcon src={require('@/mobile/asset/calendar_gray_21px.svg')} />
          }
          selectedIcon={
            <ImgIcon src={require('@/mobile/asset/calendar_blue_21px.svg')} />
          }
        />
        <TabBar.Item
          selected={currentTab == USERCENTER}
          title="个人中心"
          key={USERCENTER}
          onPress={() => {
            setCurrentTab(USERCENTER);
            go(USERCENTER_PATH);
          }}
          icon={<ImgIcon src={require('@/mobile/asset/user_gray_21px.svg')} />}
          selectedIcon={
            <ImgIcon src={require('@/mobile/asset/user_blue_21px.svg')} />
          }
        />
      </TabBar>
    </div>
  );
};

const main: FC = (props) => {
  return (
    <div className="m-container">
      <div className="m-content-container">
        <div className="m-content">{props.children}</div>
      </div>
      <Navigation />
    </div>
  );
};

export default main;
