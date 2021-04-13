import { history } from '@/.umi/core/history';
import { ticketDeleteUser, ticketDetail, ticketEditUser } from '@/api/ticket';
import { ticketFaultMenuList } from '@/api/ticketFaultMenu';
import { TableFilterType } from '@/common';
import TicketCommentCard from '@/components/TicketCommentCard';
import { useApi, useDialogForm, useInit, useRealLocation } from '@/hooks';
import PageContainer from '@/mobile/components/PageContainer';
import RequestDetail from '@/mobile/components/RequestDetail';
import { confirmDialog } from '@/utils';
import { Button, WhiteSpace } from 'antd-mobile';
import { stringify } from 'query-string';
import { FC } from 'react';

const RECORDS_PATH = '/m/my-requests/records';

const detail: FC = () => {
  const location = useRealLocation();
  const ticketId = parseInt(location.query.ticketId?.toString() || '-1');
  const init = useInit(ticketDetail, {
    ticketId,
  });
  const { loading, setLoading } = init;
  const {
    data: { data },
  }: { data: { data: apiInterface.Ticket } } = init;
  const EditPropData: componentData.PropData[] = [
    {
      key: 'id',
      type: TableFilterType.number,
      name: '报修ID',
      rules: [{ required: true }],
      default: ticketId,
      hidden: true,
    },
    {
      key: 'faultTypeId',
      type: TableFilterType.select,
      name: '报修故障类型',
      selectData: ticketFaultMenuList,
      rules: [{ required: true }],
    },
    {
      key: 'comment',
      type: TableFilterType.str,
      name: '备注',
      rules: [{ required: true }],
    },
  ];

  // 修改
  const { visible, setVisible, DialogForm, setForm } = useDialogForm(
    ticketEditUser,
    EditPropData,
    '修改报修',
    () => setLoading(true),
    true,
  );

  // 撤销
  const {
    loading: deleteLoading,
    setLoading: setDeleteLoading,
  } = useApi(ticketDeleteUser, { id: [ticketId] }, () => history.goBack());

  return (
    <PageContainer title="报修详情">
      <RequestDetail ticket={data} cardProps={{ loading }} />
      <WhiteSpace />
      <TicketCommentCard ticket={data} cardProps={{ loading }} />
      <WhiteSpace />
      <Button
        disabled={loading}
        onClick={() =>
          history.push({
            pathname: RECORDS_PATH,
            search: stringify({ ticketId: data?.id || -1 }),
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
          setForm({
            id: ticketId,
            faultTypeId: data.faultType.id,
            comment: data.comment,
          });
          setVisible(true);
        }}
      >
        修改
      </Button>
      <WhiteSpace />
      <Button
        disabled={loading}
        type="warning"
        onClick={() => {
          confirmDialog({
            actionText: '撤销报修',
            loading: deleteLoading,
            onOk: () => setDeleteLoading(true),
          });
        }}
      >
        撤销
      </Button>
      {DialogForm}
      <WhiteSpace />
    </PageContainer>
  );
};

export default detail;
