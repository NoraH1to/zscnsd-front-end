import TicketStatusComponent from '@/components/TicketStatusComp';
import { formatDate } from '@/utils';
import { Card, Space, Typography } from 'antd';
import apiInterface from 'api';
import { FC } from 'react';
import { InfoCardProp } from 'typings';

const IspRequestInfoCard: FC<InfoCardProp> = (props) => {
  const { onClick } = props;
  const { data }: { data: apiInterface.IspTicket } = props;
  return (
    <Card onClick={onClick} hoverable title={formatDate(data.createTime, true)}>
      <Space direction="vertical">
        <TicketStatusComponent ticket={data} />
        <Typography.Text>{`宿舍楼-房间号：${data.dormBlock.string}-${data.dormRoom}`}</Typography.Text>
      </Space>
    </Card>
  );
};

export default IspRequestInfoCard;
