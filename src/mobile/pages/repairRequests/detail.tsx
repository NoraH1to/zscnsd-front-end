import { ticketDetail, ticketOperate } from '@/api/ticket';
import { TableFilterType, ticketStatus } from '@/common';
import UserInfoCard from '@/components/UserInfoCard';
import { useDialogForm, useInit, useRealLocation } from '@/hooks';
import PageContainer from '@/mobile/components/PageContainer';
import RequestDetail from '@/mobile/components/RequestDetail';
import { Card, Typography } from 'antd';
import { Button, WhiteSpace } from 'antd-mobile';
import { FC } from 'react';

const detail: FC = () => {
  const location = useRealLocation();
  const ticketId = parseInt(location.query.id?.toString() || '-1');
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
      {data?.data && (
        <>
          <RequestDetail ticket={data.data} />
          <UserInfoCard user={data.data.user} />
          <WhiteSpace />
          <Card title="报修备注">
            <Typography.Paragraph
              ellipsis={{ rows: 5, expandable: true, symbol: 'more' }}
            >
              {data.data.comment}
            </Typography.Paragraph>
          </Card>
        </>
      )}
      <WhiteSpace />
      <Button disabled={loading}>处理记录</Button>
      {/* TODO: 处理记录 */}
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
