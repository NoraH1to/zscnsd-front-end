import { history } from '@/.umi/core/history';
import { ispTickeDetail, ispTicketOperate } from '@/api/ispTicket';
import { TableFilterType, ticketStatus } from '@/common';
import TicketCommentCard from '@/components/TicketCommentCard';
import { useDialogForm, useInit, useRealLocation } from '@/hooks';
import IspRequestDetail from '@/mobile/components/IspRequestDetail';
import IspRequestUserInfoCard from '@/mobile/components/IspRequestUserInfoCard';
import PageContainer from '@/mobile/components/PageContainer';
import { Button, WhiteSpace } from 'antd-mobile';
import { stringify } from 'query-string';
import { FC } from 'react';

const RECORDS_PATH = '/m/isp-requests/records';

const detail: FC = () => {
  const location = useRealLocation();
  const ispTicketId = parseInt(location.query.ispTicketId?.toString() || '-1');
  const { data, loading, setLoading } = useInit(ispTickeDetail, {
    ispTicketId,
  });
  const OperatePropData: componentData.PropData[] = [
    {
      key: 'id',
      type: TableFilterType.number,
      name: '工单ID',
      rules: [{ required: true }],
      default: ispTicketId,
      hidden: true,
    },
    {
      key: 'status',
      type: TableFilterType.select,
      name: '工单状态',
      selectData: ticketStatus,
      rules: [{ required: true }],
    },
    {
      key: 'comment',
      type: TableFilterType.str,
      name: '备注',
      rules: [{ required: true }],
    },
  ];
  const { visible, setVisible, DialogForm, setForm } = useDialogForm(
    ispTicketOperate,
    OperatePropData,
    '处理工单',
    () => setLoading(true),
    true,
  );
  return (
    <PageContainer title="工单详情">
      <IspRequestDetail ispTicket={data?.data} cardProps={{ loading }} />
      <WhiteSpace />
      <IspRequestUserInfoCard ispTicket={data?.data} cardProps={{ loading }} />
      <WhiteSpace />
      <TicketCommentCard
        ticket={data?.data}
        cardProps={{ loading, title: '工单备注' }}
      />
      <WhiteSpace />
      <Button
        disabled={loading}
        onClick={() =>
          history.push({
            pathname: RECORDS_PATH,
            search: stringify({ ticketId: data?.data?.id || -1 }),
          })
        }
      >
        处理记录
      </Button>
      <WhiteSpace />
      <Button
        disabled={loading}
        type="primary"
        onClick={() => {
          setForm({ id: ispTicketId });
          setVisible(true);
        }}
      >
        处理
      </Button>
      {DialogForm}
      <WhiteSpace />
    </PageContainer>
  );
};

export default detail;
