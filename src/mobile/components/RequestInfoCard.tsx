import TicketStatusComponent from '@/components/TicketStatusComp';
import { formatDate } from '@/utils';
import { Card, Space, Typography } from 'antd';
import apiInterface from 'api';
import { FC } from 'react';
import { InfoCardProp } from 'typings';

const RequestInfoCard: FC<InfoCardProp> = (props) => {
  const { onClick } = props;
  const { data }: { data: apiInterface.Ticket } = props;
  return (
    <Card onClick={onClick} hoverable title={formatDate(data.createTime, true)}>
      <Space direction="vertical">
        <TicketStatusComponent ticket={data} />
        <Typography.Text>{`宿舍楼-房间号：${data.user.dormBlock.string}-${data.user.dormRoom}`}</Typography.Text>
        <Typography.Text>{`故障类型：${data.faultType.content}`}</Typography.Text>
      </Space>
    </Card>
  );
};

export default RequestInfoCard;
