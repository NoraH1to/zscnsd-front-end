import { history } from 'umi';
import {
  reportChinaMobileOccupiedOnuDelete,
  reportChinaMobileOccupiedOnuDetail,
  reportChinaMobileOccupiedOnuEdit,
} from '@/api/report';
import { dormBlocks, TableFilterType, ticketStatus } from '@/common';
import { useApi, useDialogForm, useInit, useRealLocation } from '@/hooks';
import PageContainer from '@/mobile/components/PageContainer';
import ChinaMobileOccupiedOnuReportInfoDetail from '@/mobile/components/ChinaMobileOccupiedOnuReportInfoDetail';
import { confirmDialog } from '@/utils';
import { Button, WhiteSpace } from 'antd-mobile';
import apiInterface from 'api';
import { FC } from 'react';

const detail: FC = () => {
  const location = useRealLocation();
  const reportId = parseInt(location.query.reportId?.toString() || '-1');
  const init = useInit(reportChinaMobileOccupiedOnuDetail, {
    reportId,
  });
  const { loading, setLoading } = init;
  const {
    data: { data },
  }: { data: { data: apiInterface.ReportChinaMobileOccupiedOnu } } = init;

  const EditPropData: componentData.PropData[] = [
    {
      key: 'id',
      type: TableFilterType.number,
      name: '上报ID',
      rules: [{ required: true }],
      default: reportId,
      hidden: true,
    },
    {
      key: 'oldSwitchSerialNumber',
      type: TableFilterType.str,
      name: '原交换机SN码',
      rules: [{ required: true }],
    },
    {
      key: 'oldOnuData',
      type: TableFilterType.str,
      name: '原ONU数据',
      rules: [{ required: true }],
    },
    {
      key: 'newSwitchSerialNumber',
      type: TableFilterType.str,
      name: '现交换机SN码',
      rules: [{ required: true }],
    },
    {
      key: 'newOnuData',
      type: TableFilterType.str,
      name: '现ONU数据',
      rules: [{ required: true }],
    },
  ];

  const { visible, setVisible, DialogForm, setForm } = useDialogForm(
    reportChinaMobileOccupiedOnuEdit,
    EditPropData,
    '修改上报',
    () => setLoading(true),
    true,
  );

  const { loading: deleteLoading, setLoading: setDeleteLoading } = useApi(
    reportChinaMobileOccupiedOnuDelete,
    {
      id: [reportId],
    },
    () => history.goBack(),
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
      <ChinaMobileOccupiedOnuReportInfoDetail
        chinaMobileOccupiedOnuReport={data}
      />
      <WhiteSpace />
      <Button
        disabled={loading}
        type="primary"
        onClick={() => {
          setForm({
            id: reportId,
            oldSwitchSerialNumber: data.oldSwitchSerialNumber,
            oldOnuData: data.oldOnuData,
            newSwitchSerialNumber: data.newSwitchSerialNumber,
            newOnuData: data.newOnuData,
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
