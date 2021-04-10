import TicketStatusComponent from '@/components/TicketStatusComp';
import { formatDate } from '@/utils';
import { Card, CardProps, Space, Typography } from 'antd';
import { FC } from 'react';

const IspRequestDetail: FC<{
  ispTicket: apiInterface.IspTicket;
  cardProps?: CardProps;
}> = ({ ispTicket, cardProps }) => {
  return (
    <Card
      hoverable
      title={!!ispTicket ? formatDate(ispTicket.createTime, true) : '加载中'}
      loading={!ispTicket}
      {...cardProps}
    >
      {!!ispTicket && Object.keys(ispTicket).length > 0 && (
        <Space direction="vertical">
          <TicketStatusComponent ticket={ispTicket} />
          <Typography.Text>{`宿舍楼-房间号：${ispTicket.dormBlock.string}-${ispTicket.dormRoom}`}</Typography.Text>
        </Space>
      )}
    </Card>
  );
};

export default IspRequestDetail;
