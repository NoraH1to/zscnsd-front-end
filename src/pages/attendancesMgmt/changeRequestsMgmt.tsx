import { FC, useState } from 'react';
import {
  TableFilterType,
  attendanceChangeSortableList,
  attendanceChangeType,
  attendanceChangeStatus,
  areas,
} from '@/common';
import {
  useApi,
  useDialogForm,
  useInit,
  useMuitActionDialog,
} from '@/hooks/index';
import { Space, TableColumnProps, TableProps, Tooltip, Typography } from 'antd';
import apiInterface from 'api';
import CustomTable, {
  dateTimeCell,
  dateRangeCell,
  goMemberCenterCell,
} from '@/components/CustomTable';
import componentData from 'typings';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AttendanceChangeStatusComponent from '@/components/AttendanceChangeStatus';
import { userSearch } from '@/api/user';
import {
  attendanceChangeAddAdmin,
  attendanceChangeEditAdmin,
  attendanceChangeList,
  attendanceChangeDelete,
  attendanceChangeOperate,
} from '@/api/attendanceChange';

const filters: componentData.PropData[] = [
  {
    key: 'userId',
    type: TableFilterType.selectSearch,
    name: '申请人',
    selectData: userSearch,
    holder: '姓名/学号/工号',
    searchOption: {
      keyProp: 'id',
      labelProp: 'name',
    },
  },
  {
    key: 'type',
    type: TableFilterType.select,
    name: '申请类型',
    selectData: attendanceChangeType,
  },
  {
    key: 'status',
    type: TableFilterType.select,
    name: '申请状态',
    selectData: attendanceChangeStatus,
  },
  {
    key: 'submitTimeRange',
    type: TableFilterType.timeRange,
    name: '申请时间范围',
    timeRange: {
      rangeStartProp: 'start',
      rangeEndProp: 'end',
    },
  },
  {
    key: 'operatorId',
    type: TableFilterType.selectSearch,
    name: '处理人',
    selectData: userSearch,
    holder: '姓名/学号/工号',
    searchOption: {
      keyProp: 'id',
      labelProp: 'name',
    },
  },
];

const addPropData: componentData.PropData[] = [
  {
    key: 'userId',
    type: TableFilterType.selectSearch,
    name: '申请用户',
    selectData: userSearch,
    holder: '姓名/学号/工号',
    searchOption: {
      keyProp: 'id',
      labelProp: 'name',
    },
    rules: [{ required: true }],
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
  },
  {
    key: 'status',
    type: TableFilterType.select,
    name: '申请状态',
    selectData: attendanceChangeStatus,
    rules: [{ required: true }],
  },
  {
    key: 'area',
    type: TableFilterType.select,
    name: '蹭班值班片区',
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

const EditPropData: componentData.PropData[] = [
  {
    key: 'id',
    type: TableFilterType.number,
    name: '申请ID',
    rules: [{ required: true }],
    hidden: true,
  },
  {
    key: 'userId',
    type: TableFilterType.selectSearch,
    name: '申请用户',
    selectData: userSearch,
    holder: '姓名/学号/工号',
    searchOption: {
      keyProp: 'id',
      labelProp: 'name',
    },
    rules: [{ required: true }],
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
  },
  {
    key: 'status',
    type: TableFilterType.select,
    name: '申请状态',
    selectData: attendanceChangeStatus,
    rules: [{ required: true }],
  },
  {
    key: 'area',
    type: TableFilterType.select,
    name: '蹭班值班片区',
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

const OperatePropData: componentData.PropData[] = [
  {
    key: 'id',
    type: TableFilterType.number,
    name: '申请ID',
    rules: [{ required: true }],
    hidden: true,
  },
  {
    key: 'status',
    type: TableFilterType.select,
    name: '申请状态',
    selectData: attendanceChangeStatus,
    rules: [{ required: true }],
  },
];

const colums: TableColumnProps<apiInterface.AttendanceChange>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    fixed: 'left',
  },
  {
    title: '申请人姓名-工号',
    render: (value, record, index) => goMemberCenterCell(record.user),
    width: 140,
  },
  {
    title: '类型',
    dataIndex: ['type', 'string'],
    width: 70,
  },
  {
    title: '日期',
    dataIndex: 'date',
    render: (value, record, index) =>
      dateRangeCell([record.date, record.changeDate]),
    width: 160,
  },
  {
    title: '值班片区',
    dataIndex: ['area', 'string'],
    width: 100,
  },
  {
    title: '状态',
    render: (value, record, index) => (
      <AttendanceChangeStatusComponent attendanceChange={record} />
    ),
    width: 100,
  },
  {
    title: '理由',
    dataIndex: 'reason',
    width: 100,
    ellipsis: {
      showTitle: false,
    },
    render: (value) => (
      <Tooltip placement="topLeft" title={value}>
        {value}
      </Tooltip>
    ),
  },
  {
    title: '申请时间',
    dataIndex: 'createTime',
    render: (value, record, index) => dateTimeCell([value]),
    width: 160,
  },
  {
    title: '处理人姓名-工号',
    render: (value, record, index) => goMemberCenterCell(record.operator),
    width: 140,
  },
  {
    title: '处理时间',
    dataIndex: 'operateTime',
    render: (value, record, index) => dateTimeCell([value]),
    width: 160,
  },
];

const changeRequestsMgmt: FC = () => {
  // 表单数据
  const [
    formData,
    setFormData,
  ] = useState<apiInterface.AttendanceChangeListQuery>({
    page: 1,
    count: 10,
    deleted: false,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.AttendanceChangeListQuery>(
    attendanceChangeList,
    formData,
  );

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.AttendanceChangeAddAdminData>(
    attendanceChangeAddAdmin,
    addPropData,
    '新增考勤变动申请',
    () => apiHooks.setLoading(true),
  );

  const muitActions: componentData.MuitActionProp[] = [
    {
      key: 'delete',
      value: '删除',
      propData: [],
      api: attendanceChangeDelete,
    },
    {
      key: 'operate',
      value: '处理',
      propData: [
        {
          key: 'status',
          type: TableFilterType.select,
          name: '申请状态',
          selectData: attendanceChangeStatus,
          rules: [{ required: true }],
        },
      ],
      api: attendanceChangeOperate,
    },
  ];

  const apiMuiltActionDialogHooks = useMuitActionDialog(muitActions, () =>
    apiHooks.setLoading(true),
  );

  const actions: componentData.CustomTableAction[] = [
    {
      key: 'edit',
      text: '编辑',
      icon: <EditOutlined />,
      hooks: {
        api: attendanceChangeEditAdmin,
        propData: EditPropData,
        title: '编辑申请',
        onSubmit: () => apiHooks.setLoading(true),
      },
      apiParamKeys: (record: apiInterface.AttendanceChange) => ({
        id: record.id,
        userId: record.userId,
        type: record.type.id,
        date: record.date,
        changeDate: record.changeDate,
        status: record.status.id,
        area: record.area?.id,
        reason: record.reason,
      }),
      type: 'dialog',
    },
    {
      key: 'delete',
      text: '删除',
      icon: <DeleteOutlined />,
      hooks: useApi(attendanceChangeDelete, undefined, () =>
        apiHooks.setLoading(true),
      ),
      apiParamKeys: (record: apiInterface.AttendanceChange) => ({
        id: [record.id],
      }),
      type: 'api',
      btnProps: {
        danger: true,
      },
    },
    {
      key: 'operate',
      text: '处理',
      hooks: {
        api: attendanceChangeOperate,
        propData: OperatePropData,
        title: '处理申请',
        onSubmit: () => apiHooks.setLoading(true),
      },
      apiParamKeys: (record: apiInterface.AttendanceChange) => ({
        id: [record.id],
      }),
      type: 'dialog',
    },
  ];

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
      sortList={attendanceChangeSortableList}
    />
  );
};

export default changeRequestsMgmt;
