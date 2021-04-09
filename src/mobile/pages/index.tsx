import { FC, useEffect, useState } from 'react';
import { appId } from '@/api/wx';
import { mobileAuthContext } from '../wrappers/Auth/mobileAuthContext';
import apiInterface from 'api';
import { useInit, useRealLocation } from '@/hooks';
import { userDetail } from '@/api/user';
import LoadingPage from '@/components/LoadingPage';

const WxRedirect: FC = () => {
  const wxRedirect = () => {
    window.open(
      `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(
        'http://zscnsd.norah1to.com:8000/m',
      )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`,
      '_self',
    );
  };
  useEffect(() => {
    wxRedirect();
  }, []);
  return <></>;
};

const mobileIndex: FC = (props) => {
  const [user, setUser] = useState<
    apiInterface.User | apiInterface.User | undefined
  >();
  const { data } = useInit(
    userDetail,
    undefined,
    (res: any) => setUser && setUser(res.data),
  );

  const location = useRealLocation();

  if (location.query.CODE) return <WxRedirect />; // TODO: 根据 Code 有无决定是否渲染页面
  if (!user) return <LoadingPage />;
  else
    return (
      <div>
        <mobileAuthContext.Provider value={{ user, setUser }}>
          {props.children}
        </mobileAuthContext.Provider>
      </div>
    );
};

export default mobileIndex;
