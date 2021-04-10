import {
  attendanceChangeDelete,
  attendanceChangeDetail,
  attendanceChangeEditUser,
} from '@/api/attendanceChange';
import { areas, attendanceChangeType, TableFilterType } from '@/common';
import { useApi, useDialogForm, useInit, useRealLocation } from '@/hooks';
import AttendanceChangeDetail from '@/mobile/components/AttendanceChangeDetail';
import PageContainer from '@/mobile/components/PageContainer';
import { confirmDialog } from '@/utils';
import { Button, WhiteSpace } from 'antd-mobile';
import { FC } from 'react';

const attendanceChangeDetailComp: FC = () => {
  const location = useRealLocation();
  const attendanceChangeId = parseInt(
    location.query.attendanceChangeId?.toString() || '-1',
  );
  const { data, loading, setLoading } = useInit(attendanceChangeDetail, {
    attendanceChangeId,
  });
  const EditPropData: componentData.PropData[] = [
    {
      key: 'id',
      type: TableFilterType.number,
      name: '申请ID',
      rules: [{ required: true }],
      default: attendanceChangeId,
      hidden: true,
    },
    {
      key: 'type',
      type: TableFilterType.select,
      name: '申请类型',
      selectData: attendanceChangeType,
      rules: [{ required: true }],
    },
    {
      key: 'date',
      type: TableFilterType.timeWithoutTime,
      name: '日期',
      rules: [{ required: true }],
    },
    {
      key: 'changeDate',
      type: TableFilterType.timeWithoutTime,
      name: '换班日期',
      holder: '换班才需要填写',
    },
    {
      key: 'area',
      type: TableFilterType.select,
      name: '蹭班/值班片区',
      holder: '蹭班需选择',
      selectData: areas,
    },
    {
      key: 'reason',
      type: TableFilterType.str,
      name: '申请理由',
      rules: [{ required: true }],
    },
  ];
  const { visible, setVisible, DialogForm, setForm } = useDialogForm(
    attendanceChangeEditUser,
    EditPropData,
    '修改申请',
    () => setLoading(true),
    true,
  );
  const {
    loading: deleteLoading,
    setLoading: setDeleteLoading,
  } = useApi(attendanceChangeDelete, { id: [attendanceChangeId] }, () =>
    setLoading(true),
  );
  return (
    <PageContainer title="值班变动申请详情">
      <AttendanceChangeDetail
        attendanceChange={data?.data}
        cardProps={{ loading }}
      />
      <WhiteSpace />
      <Button
        disabled={loading}
        onClick={() => {
          setForm({
            id: attendanceChangeId,
            type: data.data?.type.id,
            date: data.data.date,
            changeDate: data.data.changeDate,
            area: data.data?.area.id,
            reason: data.data.reason,
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
        onClick={() =>
          confirmDialog({
            actionText: '删除',
            loading: deleteLoading,
            onOk: () => setDeleteLoading(true),
          })
        }
      >
        删除
      </Button>
      {DialogForm}
      <WhiteSpace />
    </PageContainer>
  );
};

export default attendanceChangeDetailComp;
