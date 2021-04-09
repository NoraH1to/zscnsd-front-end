import { userEdit } from '@/api/user';
import { dormBlocks, isps, TableFilterType } from '@/common';
import MemberInfoCard from '@/components/MemberInfoCard';
import UserInfoCard from '@/components/UserInfoCard';
import { useDialogForm } from '@/hooks';
import PageContainer from '@/mobile/components/PageContainer';
import { mobileAuthContext } from '@/mobile/wrappers/Auth/mobileAuthContext';
import UserInfo from '@/pages/userCenter/UserInfo';
import { Space, Typography } from 'antd';
import { Button, Card, WhiteSpace } from 'antd-mobile';
import { User } from 'api';
import { FC, useContext, useEffect } from 'react';
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
  const propData: componentData.PropData[] = [
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
  const { visible, setVisible, DialogForm, setForm } = useDialogForm(
    userEdit,
    propData,
  );
  const showEditUserInfoDialog = () => {
    setForm({
      isp: user?.isp.id,
      networkAccount: user?.networkAccount,
      dormBlock: user?.dormBlock.id,
      dormRoom: user?.dormRoom,
      telephone: user?.telephone,
    });
    setVisible(true);
  };
  return (
    <PageContainer title="个人中心">
      <div className="m-user-center">
        <UserInfoCard user={user} cardProps={{ loading: !user }} />
        <WhiteSpace />
        {!!user?.member && (
          <MemberInfoCard user={user} cardProps={{ loading: !user }} />
        )}
        <WhiteSpace />
        <Button onClick={() => showEditUserInfoDialog()}>修改信息</Button>
      </div>
      {DialogForm}
    </PageContainer>
  );
};

export default userCenter;
