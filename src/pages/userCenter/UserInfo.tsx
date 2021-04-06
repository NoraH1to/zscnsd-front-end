import MemberInfoCard from '@/components/MemberInfoCard';
import UserInfoCard from '@/components/UserInfoCard';
import { Col, Row } from 'antd';
import apiInterface from 'api';
import { FC } from 'react';

const UserInfo: FC<{ user?: apiInterface.Member; loading: boolean }> = ({
  user,
  loading,
}) => {
  return (
    <Row gutter={18}>
      <Col span={12}>
        <UserInfoCard user={user} cardProps={{ loading }} />
      </Col>
      <Col span={12}>
        <MemberInfoCard user={user} cardProps={{ loading }} />
      </Col>
    </Row>
  );
};

export default UserInfo;
