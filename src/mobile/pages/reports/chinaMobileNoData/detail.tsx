import { history } from '@/.umi/core/history';
import {
  reportChinaMobileNoDataDelete,
  reportChinaMobileNoDataDetail,
  reportChinaMobileOccupiedOnuEdit,
} from '@/api/report';
import { TableFilterType } from '@/common';
import { useApi, useDialogForm, useInit, useRealLocation } from '@/hooks';
import PageContainer from '@/mobile/components/PageContainer';
import ChinaMobileNoDataReportInfoDtetail from '@/mobile/components/ChinaMobileNoDataReportInfoDtetail';
import { confirmDialog } from '@/utils';
import { Button, WhiteSpace } from 'antd-mobile';
import apiInterface from 'api';
import { FC } from 'react';

const detail: FC = () => {
  const location = useRealLocation();
  const reportId = parseInt(location.query.reportId?.toString() || '-1');
  const init = useInit(reportChinaMobileNoDataDetail, {
    reportId,
  });
  const { loading, setLoading } = init;
  const {
    data: { data },
  }: { data: { data: apiInterface.ReportChinaMobileNoData } } = init;

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
      key: 'networkAccount',
      type: TableFilterType.str,
      name: '用户宽带账号',
      rules: [{ required: true }],
    },
    {
      key: 'switchSerialNumber',
      type: TableFilterType.str,
      name: '交换机SN码',
      rules: [{ required: true }],
    },
    {
      key: 'onuData',
      type: TableFilterType.str,
      name: 'ONU数据',
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
    reportChinaMobileNoDataDelete,
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
      <ChinaMobileNoDataReportInfoDtetail chinaMobileNoDataReport={data} />
      <WhiteSpace />
      <Button
        disabled={loading}
        type="primary"
        onClick={() => {
          setForm({
            id: reportId,
            networkAccount: data.networkAccount,
            switchSerialNumber: data.switchSerialNumber,
            onuData: data.onuData,
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
