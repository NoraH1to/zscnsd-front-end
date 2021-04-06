import { Card, Space, Typography, CardProps } from 'antd';
import apiInterface from 'api';
import { FC } from 'react';

const UserInfoCard: FC<{
  user: apiInterface.Member | undefined;
  cardProps: CardProps;
}> = ({ user, cardProps }) => {
  return (
    <Card title="基本信息" {...cardProps}>
      {!!user && (
        <Space direction="vertical">
          <Typography.Text>{`姓名：${user.name}`}</Typography.Text>
          <Typography.Text
            copyable={{ text: user.studentId.toString() }}
          >{`学号：${user.studentId}`}</Typography.Text>
          <Typography.Text>{`运营商：${user.isp.string}`}</Typography.Text>
          <Typography.Text
            copyable={{ text: user.networkAccount }}
          >{`宽带账号：${user.networkAccount}`}</Typography.Text>
          <Typography.Text>{`宿舍楼-房间号：${user.dormBlock.string}-${user.dormRoom}`}</Typography.Text>
          <Typography.Text
            copyable={{ text: user.telephone }}
          >{`手机号：${user.telephone}`}</Typography.Text>
        </Space>
      )}
    </Card>
  );
};

export default UserInfoCard;
