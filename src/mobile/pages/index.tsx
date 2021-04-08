import { FC, useEffect } from 'react';
import { Button } from 'antd-mobile';
import { appId } from '@/api/wx';

const WxRedirect: FC = () => {
  const wxRedirect = () =>
    window.open(
      `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(
        'http://zscnsd.norah1to.com:8000/m',
      )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`,
      '_self',
    );
  useEffect(() => {
    wxRedirect();
  }, []);
  return <></>;
};

const mobileIndex: FC = (props) => {
  // TODO: 根据 Code 有无决定是否渲染页面
  return <div>{props.children}</div>;
};

export default mobileIndex;
