import MemberInfoCard from '@/components/MemberInfoCard';
import UserInfoCard from '@/components/UserInfoCard';
import PageContainer from '@/mobile/components/PageContainer';
import { mobileAuthContext } from '@/mobile/wrappers/Auth/mobileAuthContext';
import UserInfo from '@/pages/userCenter/UserInfo';
import { Space, Typography } from 'antd';
import { Button, Card, WhiteSpace } from 'antd-mobile';
import { User } from 'api';
import { FC, useContext } from 'react';
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
  return (
    <PageContainer title="个人中心">
      <div className="m-user-center">
        <UserInfoCard user={user} cardProps={{ loading: !user }} />
        <WhiteSpace />
        {!!user?.member && (
          <MemberInfoCard user={user} cardProps={{ loading: !user }} />
        )}
        <WhiteSpace />
        <Button>修改信息</Button>
      </div>
    </PageContainer>
  );
};

export default userCenter;
