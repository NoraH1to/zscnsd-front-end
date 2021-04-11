import {
  reportSwitchFaultDelete,
  reportSwitchFaultDetail,
  reportSwitchFaultEdit,
} from '@/api/report';
import { dormBlocks, TableFilterType, ticketStatus } from '@/common';
import { useApi, useDialogForm, useInit, useRealLocation } from '@/hooks';
import PageContainer from '@/mobile/components/PageContainer';
import SwitchFaultReportInfoDetail from '@/mobile/components/SwitchFaultReportInfoDetail';
import { confirmDialog } from '@/utils';
import { Button, WhiteSpace } from 'antd-mobile';
import apiInterface from 'api';
import { FC } from 'react';

const detail: FC = () => {
  const location = useRealLocation();
  const reportId = parseInt(location.query.reportId?.toString() || '-1');
  const init = useInit(reportSwitchFaultDetail, {
    reportId,
  });
  const { loading, setLoading } = init;
  const {
    data: { data },
  }: { data: { data: apiInterface.ReportSwitchFault } } = init;

  const EditPropData: componentData.PropData[] = [
    {
      key: 'reportId',
      type: TableFilterType.number,
      name: '上报ID',
      rules: [{ required: true }],
      default: reportId,
      hidden: true,
    },
    {
      key: 'dormBlock',
      type: TableFilterType.select,
      name: '宿舍楼',
      selectData: dormBlocks,
      rules: [{ required: true }],
    },
    {
      key: 'dormFloor',
      type: TableFilterType.number,
      name: '宿舍楼层',
      rules: [{ required: true }],
    },
    {
      key: 'switchSerialNumber',
      type: TableFilterType.str,
      name: '交换机SN码',
      rules: [{ required: true }],
    },
    {
      key: 'index',
      type: TableFilterType.number,
      name: '交换机位置',
      holder: '从上往下',
      rules: [{ required: true }],
    },
  ];

  const { visible, setVisible, DialogForm, setForm } = useDialogForm(
    reportSwitchFaultEdit,
    EditPropData,
    '修改上报',
    () => setLoading(true),
    true,
  );

  const { loading: deleteLoading, setLoading: setDeleteLoading } = useApi(
    reportSwitchFaultDelete,
    {
      id: [reportId],
    },
  );
  const onDelete = () => {
    confirmDialog({
      actionText: '删除',
      loading: deleteLoading,
      onOk: () => setDeleteLoading(true),
    });
  };
  return (
    <PageContainer title="上报详情">
      <SwitchFaultReportInfoDetail switchFaultReport={data} />
      <WhiteSpace />
      <Button
        disabled={loading}
        type="primary"
        onClick={() => {
          setForm({
            id: reportId,
            dormBlock: data.dormBlock.id,
            dormFloor: data.dormFloor,
            switchSerialNumber: data.switchSerialNumber,
            index: data.index,
          });
          setVisible(true);
        }}
      >
        修改
      </Button>
      <WhiteSpace />
      <Button type="warning" disabled={loading} onClick={() => onDelete()}>
        删除
      </Button>
      {DialogForm}
      <WhiteSpace />
    </PageContainer>
  );
};

export default detail;
