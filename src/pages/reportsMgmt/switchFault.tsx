import { FC, useState } from 'react';
import {
  dormBlocks,
  reportSwitchFaultSortableList,
  TableFilterType,
} from '@/common';
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
  reportSwitchFaultAdd,
  reportSwitchFaultDelete,
  reportSwitchFaultEdit,
  reportSwitchFaultList,
} from '@/api/report';

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
    rules: [{ required: true }, { min: 1, type: 'number' }],
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
    name: '交换机位置（从上往下）',
    rules: [{ required: true }, { min: 1, type: 'number' }],
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
    rules: [{ required: true }, { min: 1, type: 'number' }],
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
    name: '交换机位置（从上往下）',
    rules: [{ required: true }, { min: 1, type: 'number' }],
  },
];

const colums: TableColumnProps<apiInterface.ReportSwitchFault>[] = [
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
    title: '宿舍楼栋',
    dataIndex: ['dormBlock', 'string'],
    width: 110,
  },
  {
    title: '宿舍楼层',
    render: (value, record, index) => `${record.dormFloor} 楼`,
    width: 90,
  },
  {
    title: '交换机SN码',
    dataIndex: 'switchSerialNumber',
    width: 120,
  },
  {
    title: '交换机位置（从上往下）',
    render: (value, record, index) => `第 ${record.index} 台`,
    width: 120,
  },
  {
    title: '上报时间',
    dataIndex: 'createTime',
    render: (value, record, index) => dateTimeCell([value]),
    width: 160,
  },
];

const switchFault: FC = () => {
  // 表单数据
  const [
    formData,
    setFormData,
  ] = useState<apiInterface.ReportSwitchFaultListQuery>({
    page: 1,
    count: 10,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.ReportSwitchFaultListQuery>(
    reportSwitchFaultList,
    formData,
  );

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.ReportSwitchFaultAddData>(
    reportSwitchFaultAdd,
    addPropData,
    '新增交换机故障上报',
    () => apiHooks.setLoading(true),
  );

  const muitActions: componentData.MuitActionProp[] = [
    {
      key: 'delete',
      value: '删除',
      propData: [],
      api: reportSwitchFaultDelete,
    },
  ];

  const apiMuiltActionDialogHooks = useMuitActionDialog(muitActions, () =>
    apiHooks.setLoading(true),
  );

  const onRow: TableProps<apiInterface.ReportSwitchFault>['onRow'] = (
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
        api: reportSwitchFaultEdit,
        propData: EditPropData,
        title: '编辑交换机故障上报',
        onSubmit: () => apiHooks.setLoading(true),
      },
      apiParamKeys: (record: apiInterface.ReportSwitchFault) => ({
        id: record.id,
        dormBlock: record.dormBlock.id,
        dormFloor: record.dormFloor,
        switchSerialNumber: record.switchSerialNumber,
        index: record.index,
      }),
      type: 'dialog',
    },
    {
      key: 'delete',
      text: '删除',
      icon: <DeleteOutlined />,
      hooks: useApi(reportSwitchFaultDelete, undefined, () =>
        apiHooks.setLoading(true),
      ),
      apiParamKeys: (record: apiInterface.ReportSwitchFault) => ({
        id: [record.id],
      }),
      type: 'api',
      btnProps: {
        danger: true,
      },
    },
  ];

  // TODO: 导出excel
  const ExportBtn = (
    <Button onClick={() => {}} type="dashed">
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
      sortList={reportSwitchFaultSortableList}
      extraComponent={{ Right: ExportBtn }}
    />
  );
};

export default switchFault;
