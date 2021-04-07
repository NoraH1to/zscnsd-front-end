import { ispTicketList } from '@/api/ispTicket';
import { ticketList } from '@/api/ticket';
import { useApi, useInit } from '@/hooks';
import { Row, Col, Card, Statistic } from 'antd';
import { FC } from 'react';

const DataPanel: FC = () => {
  const { data: ticketData, loading: ticketLoading } = useInit(ticketList, {
    status: 0,
    page: 1,
    count: 1,
  });
  const { data: ispData, loading: ispLoading } = useInit(ispTicketList, {
    status: 0,
    page: 1,
    count: 1,
  });
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card>
          <Statistic
            loading={ticketLoading}
            title="未处理报修"
            value={ticketData?.data?.totalRecords}
            precision={0}
            valueStyle={{ color: 'orange' }}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            loading={ispLoading}
            title="未处理工单"
            value={ispData?.data?.totalRecords}
            precision={0}
            valueStyle={{ color: 'orange' }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default DataPanel;
