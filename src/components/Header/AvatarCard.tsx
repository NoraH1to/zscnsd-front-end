import apiInterface from 'api';
import { FC, useContext, useEffect } from 'react';
import { Button, Space, Typography } from 'antd';
import { history } from 'umi';
import { useApi, useDialogForm } from '@/hooks';
import { userLogoutAdmin, userPasswordEdit } from '@/api/user';
import componentData from 'typings';
import { TableFilterType } from '@/common';
import { headerContext as _headerContext } from '.';
import { removeToken } from '@/utils';

const LogoutBtn: FC = () => {
  const afterLogout = () => {
    removeToken();
    history.replace('/d/login');
  };
  const { loading, setLoading } = useApi(
    userLogoutAdmin,
    undefined,
    afterLogout,
  );
  const handerClickLogout = () => setLoading(true);
  return (
    <Button
      onClick={() => handerClickLogout()}
      danger
      type="primary"
      loading={loading}
      style={{ width: '100%' }}
    >
      登出
    </Button>
  );
};

const EditPasswordBtn = () => {
  const propData: componentData.PropData[] = [
    {
      key: 'oldPassword',
      name: '旧密码',
      type: TableFilterType.password,
      rules: [{ required: true }],
    },
    {
      key: 'newPassword',
      name: '新密码',
      type: TableFilterType.password,
      rules: [{ required: true }],
    },
  ];
  const { setVisible, DialogForm } = useDialogForm(
    userPasswordEdit,
    propData,
    '修改密码',
  );
  const handerClickEditPassword = () => setVisible(true);
  return (
    <>
      <Button
        onClick={() => handerClickEditPassword()}
        style={{ width: '100%' }}
      >
        修改密码
      </Button>
      {DialogForm}
    </>
  );
};

const AvatarCard: FC<{ user?: apiInterface.User }> = ({ user }) => {
  const headerContext = useContext(_headerContext);
  const handlerClickUserCenterLink = () => {
    history.push('/d/user-center');
  };
  // 代理所有按钮点击事件，手动关闭 popover
  const handlerBtnClickProxy = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const elemet = e.target as HTMLElement;
    if (elemet.tagName == 'BUTTON' || elemet.tagName == 'SPAN')
      headerContext.setpopoverVisible && headerContext.setpopoverVisible(false);
  };
  return (
    <div onClick={handlerBtnClickProxy}>
      <Space direction="vertical" style={{ width: '150px' }}>
        <Typography.Title
          level={4}
          type="secondary"
          style={{ display: 'block', textAlign: 'center', width: '100%' }}
        >
          {user?.name}
        </Typography.Title>
        <Button
          onClick={() => handlerClickUserCenterLink()}
          type="link"
          style={{ width: '100%' }}
        >
          个人中心
        </Button>
        <EditPasswordBtn />
        <LogoutBtn />
      </Space>
    </div>
  );
};

export default AvatarCard;
