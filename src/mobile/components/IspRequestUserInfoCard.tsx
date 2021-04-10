import { Card, CardProps, Space, Typography } from 'antd';
import { IspTicket } from 'api';
import { FC } from 'react';

const IspRequestUserInfoCard: FC<{
  ispTicket: IspTicket;
  cardProps: CardProps;
}> = ({ ispTicket, cardProps }) => {
  return (
    <Card title="用户信息" {...cardProps}>
      {!!ispTicket && Object.keys(ispTicket).length > 0 && (
        <Space direction="vertical">
          <Typography.Text>{`姓名：${ispTicket.name}`}</Typography.Text>
          <Typography.Text>
            {'宿舍楼 - 房间号：'}
            <Typography.Text strong>
              {`${ispTicket.dormBlock.string} - ${ispTicket.dormRoom}`}
            </Typography.Text>
          </Typography.Text>
          <Typography.Text copyable={{ text: ispTicket.telephone }}>
            {`手机号：${ispTicket.telephone}`}
          </Typography.Text>
        </Space>
      )}
    </Card>
  );
};

export default IspRequestUserInfoCard;
