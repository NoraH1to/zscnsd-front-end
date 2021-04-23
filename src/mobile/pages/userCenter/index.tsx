import { userEdit, userPasswordEdit } from '@/api/user';
import { dormBlocks, isps, TableFilterType } from '@/common';
import MemberInfoCard from '@/components/MemberInfoCard';
import UserInfoCard from '@/components/UserInfoCard';
import { useDialogForm } from '@/hooks';
import PageContainer from '@/mobile/components/PageContainer';
import { mobileAuthContext } from '@/mobile/wrappers/Auth/mobileAuthContext';
import { Button, WhiteSpace } from 'antd-mobile';
import { FC, useContext } from 'react';
import componentData from 'typings';
import './index.scss';

// const UserInfoCard: FC<{ user: User | Member | undefined }> = ({ user }) => (
//   <Card>
//       <Space direction="vertical">
//         <Typography.Text>{`手机号：${user?.telephone}`}</Typography.Text>
//         <Typography.Text>
//           {`宿舍楼-房间号：${user?.dormBlock.string}-${user?.dormRoom}`}
//         </Typography.Text>
//       </Space>
//       <WhiteSpace />
//     </Card.Body>
//   </Card>
// );

const userCenter: FC = () => {
  const userContext = useContext(mobileAuthContext);
  const { user } = userContext;
  const infoPropData: componentData.PropData[] = [
    {
      key: 'isp',
      type: TableFilterType.select,
      name: '运营商',
      selectData: isps,
      rules: [{ required: true }],
    },
    {
      key: 'networkAccount',
      type: TableFilterType.str,
      name: '宽带账号',
      rules: [{ required: true }],
    },
    {
      key: 'dormBlock',
      type: TableFilterType.select,
      name: '宿舍楼',
      selectData: dormBlocks,
      rules: [{ required: true }],
    },
    {
      key: 'dormRoom',
      type: TableFilterType.number,
      name: '宿舍房间号',
      rules: [{ required: true }],
    },
    {
      key: 'telephone',
      type: TableFilterType.str,
      name: '手机号',
      rules: [{ required: true }],
    },
  ];
  const pwdPropData: componentData.PropData[] = [
    {
      key: 'oldPassword',
      type: TableFilterType.password,
      name: '旧密码',
      holder: '若无密码则留空',
    },
    {
      key: 'newPassword',
      type: TableFilterType.password,
      name: '新密码',
      rules: [{ required: true }],
    },
  ];
  // 修改信息
  const {
    visible: editInfoVisible,
    setVisible: setEditInfoVisible,
    DialogForm: EditInfoDialog,
    setForm: setEditInfoForm,
  } = useDialogForm(
    userEdit,
    infoPropData,
    '修改个人信息',
    (res) => userContext.setUser && userContext.setUser(res.data),
    true,
  );
  const showEditUserInfoDialog = () => {
    setEditInfoForm({
      isp: user?.isp.id,
      networkAccount: user?.networkAccount,
      dormBlock: user?.dormBlock.id,
      dormRoom: user?.dormRoom,
      telephone: user?.telephone,
    });
    setEditInfoVisible(true);
  };

  // 修改密码
  const {
    visible: editPwdVisible,
    setVisible: setEditPwdVisible,
    DialogForm: EditPwdDialog,
    setForm: setEditPwdForm,
  } = useDialogForm(userPasswordEdit, pwdPropData, '修改密码', undefined, true);

  return (
    <PageContainer title="个人中心">
      <div className="m-user-center">
        <UserInfoCard user={user} cardProps={{ loading: !user }} />
        <WhiteSpace />
        {!!user?.member && (
          <>
            <MemberInfoCard user={user} cardProps={{ loading: !user }} />
            <WhiteSpace />
          </>
        )}
        <Button onClick={() => showEditUserInfoDialog()}>修改信息</Button>
        <WhiteSpace />
        {user?.member?.role && user.member.role.id >= 2 && (
          <Button type="warning" onClick={() => setEditPwdVisible(true)}>
            修改密码
          </Button>
        )}
        <WhiteSpace />
      </div>
      {EditInfoDialog}
      {EditPwdDialog}
    </PageContainer>
  );
};

export default userCenter;
