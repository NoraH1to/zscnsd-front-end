import { history } from '@/.umi/core/history';
import { ticketDetail, ticketOperate } from '@/api/ticket';
import { TableFilterType, ticketStatus } from '@/common';
import TicketCommentCard from '@/components/TicketCommentCard';
import UserInfoCard from '@/components/UserInfoCard';
import { useDialogForm, useInit, useRealLocation } from '@/hooks';
import PageContainer from '@/mobile/components/PageContainer';
import RequestDetail from '@/mobile/components/RequestDetail';
import { Button, WhiteSpace } from 'antd-mobile';
import { stringify } from 'query-string';
import { FC } from 'react';

const RECORDS_PATH = '/m/repair-requests/records';

const detail: FC = () => {
  const location = useRealLocation();
  const ticketId = parseInt(location.query.ticketId?.toString() || '-1');
  const { data, loading, setLoading } = useInit(ticketDetail, {
    ticketId,
  });
  const OperatePropData: componentData.PropData[] = [
    {
      key: 'id',
      type: TableFilterType.number,
      name: '报修ID',
      rules: [{ required: true }],
      default: ticketId,
      hidden: true,
    },
    {
      key: 'status',
      type: TableFilterType.select,
      name: '报修状态',
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
    ticketOperate,
    OperatePropData,
    '处理报修',
    () => setLoading(true),
    true,
  );
  return (
    <PageContainer title="报修详情">
      <RequestDetail ticket={data?.data} cardProps={{ loading }} />
      <WhiteSpace />
      <UserInfoCard user={data?.data?.user} cardProps={{ loading }} />
      <WhiteSpace />
      <TicketCommentCard ticket={data?.data} cardProps={{ loading }} />
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
          setForm({ id: ticketId });
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
