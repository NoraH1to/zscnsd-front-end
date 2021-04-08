import { FC, useEffect, useState } from 'react';
import { TabBar, WhiteSpace, WingBlank } from 'antd-mobile';
import { history } from 'umi';
import './main.scss';

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
const WORK = 'work';
const USERCENTER = 'user-center';
const Navigation: FC = () => {
  const [currentTab, setCurrentTab] = useState<string>(HOME);
  useEffect(() => {
    let path = '';
    switch (currentTab) {
      case HOME:
        path = '/m/home';
        break;
      case WORK:
        path = '/m/work';
        break;
      case USERCENTER:
        path = '/m/user-center';
        break;
      default:
        path = '/m/home';
        break;
    }
    if (history.location.pathname != path) history.push(path);
  }, [currentTab]);
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
          onPress={() => setCurrentTab(HOME)}
          icon={<ImgIcon src={require('@/mobile/asset/home_gray_21px.svg')} />}
          selectedIcon={
            <ImgIcon src={require('@/mobile/asset/home_blue_21px.svg')} />
          }
        />
        <TabBar.Item
          selected={currentTab == WORK}
          title="工作"
          key={WORK}
          onPress={() => setCurrentTab(WORK)}
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
          onPress={() => setCurrentTab(USERCENTER)}
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
        <WhiteSpace />
        <WingBlank>{props.children}</WingBlank>
        <WhiteSpace />
      </div>
      <Navigation />
    </div>
  );
};

export default main;
