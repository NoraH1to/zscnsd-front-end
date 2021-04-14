import { history } from 'umi';
import {
  reportWallLineDelete,
  reportWallLineDetail,
  reportWallLineEdit,
} from '@/api/report';
import { dormBlocks, TableFilterType } from '@/common';
import { useApi, useDialogForm, useInit, useRealLocation } from '@/hooks';
import PageContainer from '@/mobile/components/PageContainer';
import WallLineReportInfoDetail from '@/mobile/components/WallLineReportInfoDetail';
import { confirmDialog } from '@/utils';
import { Button, WhiteSpace } from 'antd-mobile';
import apiInterface from 'api';
import { FC } from 'react';

const detail: FC = () => {
  const location = useRealLocation();
  const reportId = parseInt(location.query.reportId?.toString() || '-1');
  const init = useInit(reportWallLineDetail, {
    reportId,
  });
  const { loading, setLoading } = init;
  const {
    data: { data },
  }: { data: { data: apiInterface.ReportWallLine } } = init;

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
      key: 'dormBlock',
      type: TableFilterType.select,
      name: '宿舍楼',
      selectData: dormBlocks,
      rules: [{ required: true }],
    },
    {
      key: 'dormRoom',
      type: TableFilterType.number,
      name: '房间号',
      rules: [{ required: true }],
    },
    {
      key: 'name',
      type: TableFilterType.str,
      name: '用户姓名',
      rules: [{ required: true }],
    },
    {
      key: 'telephone',
      type: TableFilterType.str,
      name: '用户手机号',
      rules: [{ required: true }],
    },
  ];

  const { visible, setVisible, DialogForm, setForm } = useDialogForm(
    reportWallLineEdit,
    EditPropData,
    '修改上报',
    () => setLoading(true),
    true,
  );

  const { loading: deleteLoading, setLoading: setDeleteLoading } = useApi(
    reportWallLineDelete,
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
      <WallLineReportInfoDetail wallLineReport={data} />
      <WhiteSpace />
      <Button
        disabled={loading}
        type="primary"
        onClick={() => {
          setForm({
            id: reportId,
            dormBlock: data.dormBlock.id,
            dormRoom: data.dormRoom,
            name: data.name,
            telephone: data.telephone,
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
