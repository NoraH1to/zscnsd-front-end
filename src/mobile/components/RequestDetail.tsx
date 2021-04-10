import TicketStatusComponent from '@/components/TicketStatus';
import { formatDate } from '@/utils';
import { Card, Space, Typography } from 'antd';
import { FC } from 'react';

const RequestDetail: FC<{
  ticket: apiInterface.Ticket;
}> = ({ ticket }) => {
  return (
    <div style={{ margin: '12px 0' }}>
      <Card
        hoverable
        title={formatDate(!!ticket && ticket.createTime, true)}
        loading={!ticket}
      >
        {!!ticket && (
          <Space direction="vertical">
            <TicketStatusComponent ticket={ticket} />
            <Typography.Text>{`宿舍楼-房间号：${ticket.user.dormBlock.string}-${ticket.user.dormRoom}`}</Typography.Text>
            <Typography.Text>{`故障类型：${ticket.faultType.content}`}</Typography.Text>
          </Space>
        )}
      </Card>
    </div>
  );
};

export default RequestDetail;
