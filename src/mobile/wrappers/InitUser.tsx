import { FC, useContext, useEffect } from 'react';
import LoadingPage from '@/components/LoadingPage';
import { mobileAuthContext } from './Auth/mobileAuthContext';
import { setToken } from '@/utils';
import { userLogin } from '@/api/user';
import { useApi, useRealLocation } from '@/hooks';
import { appId } from '@/api/wx';
import { history } from 'umi';

const wxRedirect = () => {
  if (NODE_ENV == 'dev') {
    window.open(`${HOST}/m/home?code=testCode`, '_self');
  } else {
    window.open(
      `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(
        `${HOST}/m/home`,
      )}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`,
      '_self',
    );
  }
};

const InitUser: FC = (props) => {
  const { user, setUser } = useContext(mobileAuthContext);
  const location = useRealLocation();

  const { data, loading, setLoading, setParams } = useApi(
    userLogin,
    undefined,
    (res: any) => {
      setUser && setUser(res.data.user);
      setToken(res.data.token);
    },
  );

  useEffect(() => {
    if (!user) {
      if (!!location.query.code) {
        setParams({ code: location.query.code?.toString() });
        setLoading(true);
      } else {
        wxRedirect();
      }
    }
  }, [location.query.code]);

  useEffect(() => {
    if (data.data) {
      if (data.data.token && !data.data.user) history.replace('/m/bind-wx');
    }
  }, [data]);

  if (!user) return <LoadingPage />;
  return <>{props.children}</>;
};

export default InitUser;
