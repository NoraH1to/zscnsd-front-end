import { FC, useState } from 'react';
import { TableFilterType, weekDays, workChangeType } from '@/common';
import {
  useApi,
  useDialogForm,
  useInit,
  useMuitActionDialog,
} from '@/hooks/index';
import { TableColumnProps, TableProps, Col, Row } from 'antd';
import apiInterface from 'api';
import componentData from 'typings';
import TimeCard from '@/components/timeCard';
import {
  workChangeAdd,
  workChangeDelete,
  workChangeEdit,
  workChangeList,
} from '@/api/workChange';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import CustomTable, { dateCell } from '@/components/CustomTable';
import { find, propEq } from 'ramda';

const addPropData: componentData.PropData[] = [
  {
    key: 'semesterId',
    type: TableFilterType.number,
    name: '值班学期ID',
    rules: [{ required: true }],
  },
  {
    key: 'type',
    type: TableFilterType.select,
    name: '变动类型',
    selectData: workChangeType,
    rules: [{ required: true }],
  },
  {
    key: 'date',
    type: TableFilterType.time,
    name: '日期',
    rules: [{ required: true }],
  },
  {
    key: 'changeWeekday',
    type: TableFilterType.select,
    selectData: weekDays,
    holder: '类型为变更才需填入',
    name: '更改的值班日期',
  },
];

const EditPropData: componentData.PropData[] = [
  {
    key: 'id',
    type: TableFilterType.number,
    name: '变动ID',
    rules: [{ required: true }],
    hidden: true,
  },
  {
    key: 'semesterId',
    type: TableFilterType.number,
    name: '值班学期ID',
    rules: [{ required: true }],
  },
  {
    key: 'type',
    type: TableFilterType.select,
    name: '变动类型',
    selectData: workChangeType,
    rules: [{ required: true }],
  },
  {
    key: 'date',
    type: TableFilterType.time,
    name: '日期',
    rules: [{ required: true }],
  },
  {
    key: 'changeWeekday',
    type: TableFilterType.select,
    selectData: weekDays,
    holder: '类型为变更才需填入',
    name: '更改的值班日期',
  },
];

const colums: TableColumnProps<apiInterface.WorkChange>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    fixed: 'left',
  },
  {
    title: '类型',
    dataIndex: ['type', 'string'],
    width: 80,
  },
  {
    title: '日期',
    dataIndex: 'date',
    render: (value, record, index) => dateCell([value]),
    width: 120,
  },
  {
    title: '更改的值班日',
    dataIndex: 'changeWeekday',
    render: (value, record, index) =>
      find(propEq('id', value), weekDays)?.string || '-',
    width: 160,
  },
];

const WorkChange: FC<{ semesterId: number }> = ({ semesterId }) => {
  // 表单数据
  const [formData, setFormData] = useState<apiInterface.WorkChangeListQuery>({
    page: 1,
    count: 10,
    semesterId,
  });

  const filters: componentData.PropData[] = [
    {
      key: 'semesterId',
      type: TableFilterType.number,
      name: '学期ID',
      default: semesterId,
      rules: [{ required: true }],
    },
    {
      key: 'type',
      type: TableFilterType.select,
      name: '变动类型',
      selectData: workChangeType,
    },
  ];

  // api hooks
  const apiHooks = useInit<apiInterface.WorkChangeListQuery>(
    workChangeList,
    formData,
  );

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.WorkChangeAddData>(
    workChangeAdd,
    addPropData,
    '新增值班变动',
    () => apiHooks.setLoading(true),
  );

  const muitActions: componentData.MuitActionProp[] = [
    {
      key: 'delete',
      value: '删除',
      propData: [],
      api: workChangeDelete,
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
        api: workChangeEdit,
        propData: EditPropData,
        title: '编辑值班变动',
        onSubmit: () => apiHooks.setLoading(true),
      },
      apiParamKeys: (record: apiInterface.WorkChange) => ({
        id: record.id,
        semesterId: record.semesterId,
        date: record.date,
        type: record.type.id,
        changeWeekday: record.changeWeekday,
      }),
      type: 'dialog',
    },
    {
      key: 'delete',
      text: '删除',
      icon: <DeleteOutlined />,
      hooks: useApi(workChangeDelete, undefined, () =>
        apiHooks.setLoading(true),
      ),
      apiParamKeys: (record: apiInterface.WorkChange) => ({
        id: [record.id],
      }),
      type: 'api',
      btnProps: {
        danger: true,
      },
    },
  ];

  const expandable: TableProps<apiInterface.WorkChange>['expandable'] = {
    expandedRowRender: (record) => (
      <>
        <Row gutter={16} style={{ alignItems: 'stretch' }}>
          <Col span={8}>
            <TimeCard data={record} />
          </Col>
        </Row>
      </>
    ),
    rowExpandable: (record) => true,
    expandedRowClassName: () => 'expand',
  };

  return (
    <>
      <CustomTable
        formData={formData}
        setFormData={setFormData}
        filters={filters}
        colums={colums}
        actions={actions}
        apiHooks={apiHooks}
        apiAddHooks={apiAddHooks}
        apiMuiltActionDialogHooks={apiMuiltActionDialogHooks}
        expandable={expandable}
      />
    </>
  );
};

export default WorkChange;
