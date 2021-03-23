import { FC, useState } from 'react';
import {
  reportChinaMobileOccupiedOnuSortableList,
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
import CustomTable, { getRouteCell } from '@/components/CustomTable';
import componentData from 'typings';
import { useHistory } from '@umijs/runtime';
import { userSearch } from '@/api/user';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  reportChinaMobileOccupiedOnuAdd,
  reportChinaMobileOccupiedOnuDelete,
  reportChinaMobileOccupiedOnuEdit,
  reportChinaMobileOccupiedOnuList,
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

const EditPropData: componentData.PropData[] = [
  {
    key: 'id',
    type: TableFilterType.number,
    name: '上报ID',
    rules: [{ required: true }],
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

const colums: TableColumnProps<apiInterface.ReportChinaMobileOccupiedOnu>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 70,
    fixed: 'left',
  },
  {
    title: '上报人姓名-工号',
    render: getRouteCell<apiInterface.ReportChinaMobileOccupiedOnu>(
      (record) =>
        `${record.user.name}-${record.user.member.workId || '已退出'}`,
      (record) => '/d/repair-requests-mgmt/records', // TODO: 路由跳转
    ),
    width: 100,
  },
  {
    title: '原交换机SN码',
    dataIndex: 'oldSwitchSerialNumber',
    width: 100,
  },
  {
    title: '原ONU数据',
    dataIndex: 'oldOnuData',
    width: 100,
  },
  {
    title: '现交换机SN码',
    dataIndex: 'newSwitchSerialNumber',
    width: 100,
  },
  {
    title: '现ONU数据',
    dataIndex: 'newOnuData',
    width: 100,
  },
  {
    title: '上报时间',
    dataIndex: 'createTime',
    width: 100,
  },
];

const chinaMobileOccupiedOnu: FC = () => {
  // 表单数据
  const [
    formData,
    setFormData,
  ] = useState<apiInterface.ReportChinaMobileOccupiedOnuListQuery>({
    page: 1,
    count: 10,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.ReportChinaMobileOccupiedOnuListQuery>(
    reportChinaMobileOccupiedOnuList,
    formData,
  );

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.ReportChinaMobileOccupiedOnuAddData>(
    reportChinaMobileOccupiedOnuAdd,
    addPropData,
    '新增移动ONU被占上报',
    () => apiHooks.setLoading(true),
  );

  const muitActions: componentData.MuitActionProp[] = [
    {
      key: 'delete',
      value: '删除',
      propData: [],
      api: reportChinaMobileOccupiedOnuDelete,
    },
  ];

  const apiMuiltActionDialogHooks = useMuitActionDialog(muitActions, () =>
    apiHooks.setLoading(true),
  );

  const onRow: TableProps<apiInterface.ReportChinaMobileOccupiedOnu>['onRow'] = (
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
        api: reportChinaMobileOccupiedOnuEdit,
        propData: EditPropData,
        title: '编辑移动ONU被占上报',
        onSubmit: () => apiHooks.setLoading(true),
      },
      apiParamKeys: (record: apiInterface.ReportChinaMobileOccupiedOnu) => ({
        id: record.id,
        oldSwitchSerialNumber: record.oldSwitchSerialNumber,
        oldOnuData: record.oldOnuData,
        newSwitchSerialNumber: record.newSwitchSerialNumber,
        newOnuData: record.newOnuData,
      }),
      type: 'dialog',
    },
    {
      key: 'delete',
      text: '删除',
      icon: <DeleteOutlined />,
      hooks: useApi(reportChinaMobileOccupiedOnuDelete, undefined, () =>
        apiHooks.setLoading(true),
      ),
      apiParamKeys: (record: apiInterface.ReportChinaMobileOccupiedOnu) => ({
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
      sortList={reportChinaMobileOccupiedOnuSortableList}
      extraComponent={{ Right: ExportBtn }}
    />
  );
};

export default chinaMobileOccupiedOnu;
