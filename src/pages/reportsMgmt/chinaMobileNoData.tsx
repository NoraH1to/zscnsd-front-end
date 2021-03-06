import { FC, useState } from 'react';
import { reportChinaMobileNoDataSortableList, TableFilterType } from '@/common';
import {
  useApi,
  useDialogForm,
  useInit,
  useMuitActionDialog,
} from '@/hooks/index';
import { TableColumnProps, TableProps, Button } from 'antd';
import apiInterface from 'api';
import CustomTable, {
  dateTimeCell,
  goMemberCenterCell,
} from '@/components/CustomTable';
import componentData from 'typings';
import { userSearch } from '@/api/user';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  reportChinaMobileNoDataAdd,
  reportChinaMobileNoDataDelete,
  reportChinaMobileNoDataEdit,
  reportChinaMobileNoDataExport,
  reportChinaMobileNoDataList,
} from '@/api/report';
import { fileDownload } from '@/api/file';

const filters: componentData.PropData[] = [
  {
    key: 'userId',
    type: TableFilterType.selectSearch,
    name: '上报用户',
    selectData: userSearch,
    holder: '姓名/学号/工号',
    searchOption: {
      keyProp: 'id',
      labelProp: 'name',
    },
  },
  {
    key: 'submitTimeRange',
    type: TableFilterType.timeRange,
    name: '上报时间范围',
    timeRange: {
      rangeStartProp: 'start',
      rangeEndProp: 'end',
    },
  },
];

const addPropData: componentData.PropData[] = [
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

const EditPropData: componentData.PropData[] = [
  {
    key: 'id',
    type: TableFilterType.number,
    name: '上报ID',
    rules: [{ required: true }],
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

const colums: TableColumnProps<apiInterface.ReportChinaMobileNoData>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    fixed: 'left',
  },
  {
    title: '上报人姓名-工号',
    render: (value, record, index) => goMemberCenterCell(record.user),
    width: 140,
  },
  {
    title: '用户宽带账号',
    dataIndex: 'networkAccount',
    width: 120,
  },
  {
    title: '交换机SN码',
    dataIndex: 'switchSerialNumber',
    width: 120,
  },
  {
    title: 'ONU数据',
    dataIndex: 'onuData',
    width: 120,
  },
  {
    title: '上报时间',
    dataIndex: 'createTime',
    render: (value, record, index) => dateTimeCell([value]),
    width: 160,
  },
];

const chinaMobileNoData: FC = () => {
  // 表单数据
  const [
    formData,
    setFormData,
  ] = useState<apiInterface.ReportSwitchFaultListQuery>({
    page: 1,
    count: 10,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.ReportChinaMobileNoDataListQuery>(
    reportChinaMobileNoDataList,
    formData,
  );

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.ReportChinaMobileNoDataAddData>(
    reportChinaMobileNoDataAdd,
    addPropData,
    '新增移动无数据上报',
    () => apiHooks.setLoading(true),
  );

  const muitActions: componentData.MuitActionProp[] = [
    {
      key: 'delete',
      value: '删除',
      propData: [],
      api: reportChinaMobileNoDataDelete,
    },
  ];

  const apiMuiltActionDialogHooks = useMuitActionDialog(muitActions, () =>
    apiHooks.setLoading(true),
  );

  const onRow: TableProps<apiInterface.ReportChinaMobileNoData>['onRow'] = (
    record,
  ) => {
    return {
      onClick: (event) => {
        // TODO: 点击行路由跳转
      }, // 点击行
    };
  };

  const actions: componentData.CustomTableAction[] = [
    {
      key: 'edit',
      text: '编辑',
      icon: <EditOutlined />,
      hooks: {
        api: reportChinaMobileNoDataEdit,
        propData: EditPropData,
        title: '编辑移动无数据上报',
        onSubmit: () => apiHooks.setLoading(true),
      },
      apiParamKeys: (record: apiInterface.ReportChinaMobileNoData) => ({
        id: record.id,
        networkAccount: record.networkAccount,
        switchSerialNumber: record.switchSerialNumber,
        onuData: record.onuData,
      }),
      type: 'dialog',
    },
    {
      key: 'delete',
      text: '删除',
      icon: <DeleteOutlined />,
      hooks: useApi(reportChinaMobileNoDataDelete, undefined, () =>
        apiHooks.setLoading(true),
      ),
      apiParamKeys: (record: apiInterface.ReportChinaMobileNoData) => ({
        id: [record.id],
      }),
      type: 'api',
      btnProps: {
        danger: true,
      },
    },
  ];

  const {
    loading: exportLoading,
    setLoading: setExportLoading,
    setParams: setExportParams,
  } = useApi(reportChinaMobileNoDataExport, formData, (res: any) => {
    fileDownload(res.data.filePath);
  });
  const ExportBtn = (
    <Button
      loading={exportLoading}
      onClick={() => {
        setExportParams(formData);
        setExportLoading(true);
      }}
      type="dashed"
    >
      导出结果为Excel
    </Button>
  );

  return (
    <CustomTable
      formData={formData}
      setFormData={setFormData}
      filters={filters}
      colums={colums}
      apiHooks={apiHooks}
      apiAddHooks={apiAddHooks}
      apiMuiltActionDialogHooks={apiMuiltActionDialogHooks}
      actions={actions}
      sortList={reportChinaMobileNoDataSortableList}
      extraComponent={{ Right: ExportBtn }}
    />
  );
};

export default chinaMobileNoData;
