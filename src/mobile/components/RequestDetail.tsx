import TicketStatusComponent from '@/components/TicketStatus';
import { formatDate } from '@/utils';
import { Card, CardProps, Space, Typography } from 'antd';
import { FC } from 'react';

const RequestDetail: FC<{
  ticket: apiInterface.Ticket;
  cardProps?: CardProps;
}> = ({ ticket, cardProps }) => {
  return (
    <Card
      hoverable
      title={!!ticket ? formatDate(ticket.createTime, true) : '加载中'}
      loading={!ticket}
      {...cardProps}
    >
      {!!ticket && (
        <Space direction="vertical">
          <TicketStatusComponent ticket={ticket} />
          <Typography.Text>{`宿舍楼-房间号：${ticket.user.dormBlock.string}-${ticket.user.dormRoom}`}</Typography.Text>
          <Typography.Text>{`故障类型：${ticket.faultType.content}`}</Typography.Text>
        </Space>
      )}
    </Card>
  );
};

export default RequestDetail;
