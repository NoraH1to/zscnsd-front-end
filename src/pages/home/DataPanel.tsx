import { ispTicketList } from '@/api/ispTicket';
import { ticketList } from '@/api/ticket';
import { useInit } from '@/hooks';
import { Row, Col, Card, Statistic } from 'antd';
import { FC } from 'react';
import { history } from 'umi';

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
  const gotoTicket = () =>
    history.push({
      pathname: '/d/repair-requests-mgmt/requests',
    });
  const gotoIspTicket = () =>
    history.push({
      pathname: '/d/isp-tickets-mgmt/tickets',
    });
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card hoverable onClick={() => gotoTicket()}>
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
        <Card hoverable onClick={() => gotoIspTicket()}>
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
