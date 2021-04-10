import TicketStatusComponent from '@/components/TicketStatusComp';
import { formatDate } from '@/utils';
import { Card, Space, Typography } from 'antd';
import { FC } from 'react';
import { InfoCardProp } from 'typings';

const RequestRecordInfoCard: FC<InfoCardProp> = (props) => {
  const { onClick } = props;
  const { data }: { data: apiInterface.TicketLog } = props;
  return (
    <Card onClick={onClick} hoverable title={formatDate(data.createTime, true)}>
      <Space direction="vertical">
        <TicketStatusComponent ticket={data} />
        <Typography.Text>{`处理人姓名-工号：${data.operator.name}-${data.operator.member?.workId}`}</Typography.Text>
        <Typography.Text>{`处理时间：${data.createTime}`}</Typography.Text>
        <Typography.Paragraph
          ellipsis={{ rows: 5, expandable: true, symbol: 'more' }}
        >
          {`备注：${data.comment}`}
        </Typography.Paragraph>
      </Space>
    </Card>
  );
};

export default RequestRecordInfoCard;
