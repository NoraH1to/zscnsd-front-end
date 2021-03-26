import { FC, useState } from 'react';
import { TableFilterType, workSemesterCollecting } from '@/common';
import {
  useApi,
  useDialogForm,
  useInit,
  useMuitActionDialog,
} from '@/hooks/index';
import { TableColumnProps, TableProps } from 'antd';
import apiInterface from 'api';
import CustomTable, { dateCell } from '@/components/CustomTable';
import componentData from 'typings';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import WorkSemesterCollectingStatusComponent from '@/components/WorkSemesterCollectingStatus';
import {
  workSemesterAdd,
  workSemesterCollect,
  workSemesterDelete,
  workSemesterEdit,
  workSemesterList,
} from '@/api/workSemester';

const filters: componentData.PropData[] = [
  {
    key: 'name',
    type: TableFilterType.str,
    name: '名称',
  },
  {
    key: 'submitTimeRange',
    type: TableFilterType.timeRange,
    name: '学期时间范围',
    timeRange: {
      rangeStartProp: 'start',
      rangeEndProp: 'end',
    },
  },
  {
    key: 'collecting',
    type: TableFilterType.select,
    name: '是否正在收集',
    selectData: workSemesterCollecting,
  },
];

const addPropData: componentData.PropData[] = [
  {
    key: 'name',
    type: TableFilterType.str,
    name: '名称',
    rules: [{ required: true }],
  },
  {
    key: 'submitTimeRange',
    type: TableFilterType.timeRange,
    name: '学期时间范围',
    timeRange: {
      rangeStartProp: 'startDate',
      rangeEndProp: 'endDate',
    },
    rules: [{ required: true }],
  },
];

const EditPropData: componentData.PropData[] = [
  {
    key: 'id',
    type: TableFilterType.number,
    name: '学期ID',
    rules: [{ required: true }],
    hidden: true,
  },
  {
    key: 'name',
    type: TableFilterType.str,
    name: '名称',
    rules: [{ required: true }],
  },
  {
    key: 'startDate',
    type: TableFilterType.time,
    name: '学期开始时间',
    rules: [{ required: true }],
  },
  {
    key: 'endDate',
    type: TableFilterType.time,
    name: '学期结束时间',
    rules: [{ required: true }],
  },
];

const CollectPropData: componentData.PropData[] = [
  {
    key: 'id',
    type: TableFilterType.number,
    name: '申请ID',
    rules: [{ required: true }],
    hidden: true,
  },
  {
    key: 'collecting',
    type: TableFilterType.select,
    name: '收集状态',
    selectData: workSemesterCollecting,
    rules: [{ required: true }],
  },
];

const colums: TableColumnProps<apiInterface.WorkSemester>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    fixed: 'left',
  },
  {
    title: '学期名称',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '收集状态',
    render: (value, record, index) => (
      <WorkSemesterCollectingStatusComponent workSemester={record} />
    ),
    width: 110,
  },
  {
    title: '开始日期',
    dataIndex: 'startDate',
    render: (value, record, index) => dateCell([value]),
    width: 110,
  },
  {
    title: '结束日期',
    dataIndex: 'startDate',
    render: (value, record, index) => dateCell([value]),
    width: 110,
  },
];

const onRow: TableProps<apiInterface.WorkSemester>['onRow'] = (record) => {
  return {
    onClick: (event) => {
      // TODO: 点击行路由跳转
    }, // 点击行
  };
};

const workSemester: FC<{}> = () => {
  // 表单数据
  const [formData, setFormData] = useState<apiInterface.WorkSemesterListQuery>({
    page: 1,
    count: 10,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.WorkSemesterListQuery>(
    workSemesterList,
    formData,
  );

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.WorkSemesterAddData>(
    workSemesterAdd,
    addPropData,
    '新增值班学期',
    () => apiHooks.setLoading(true),
  );

  const muitActions: componentData.MuitActionProp[] = [
    {
      key: 'delete',
      value: '删除',
      propData: [],
      api: workSemesterDelete,
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
        api: workSemesterEdit,
        propData: EditPropData,
        title: '编辑值班学期',
        onSubmit: () => apiHooks.setLoading(true),
      },
      apiParamKeys: (record: apiInterface.WorkSemester) => ({
        id: record.id,
        name: record.name,
        startDate: record.startDate,
        endDate: record.endDate,
      }),
      type: 'dialog',
    },
    {
      key: 'delete',
      text: '删除',
      icon: <DeleteOutlined />,
      hooks: useApi(workSemesterDelete, undefined, () =>
        apiHooks.setLoading(true),
      ),
      apiParamKeys: (record: apiInterface.WorkSemester) => ({
        id: [record.id],
      }),
      type: 'api',
      btnProps: {
        danger: true,
      },
    },
    {
      key: 'collect',
      text: '修改收集状态',
      hooks: {
        api: workSemesterCollect,
        propData: CollectPropData,
        title: '修改收集状态',
        onSubmit: () => apiHooks.setLoading(true),
      },
      apiParamKeys: (record: apiInterface.WorkSemester) => ({
        id: record.id,
        collecting: record.collectingTimetable,
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
      onRow={onRow}
    />
  );
};

export default workSemester;
