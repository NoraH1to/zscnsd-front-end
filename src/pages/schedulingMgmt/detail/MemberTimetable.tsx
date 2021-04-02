import { FC, useState } from 'react';
import {
  memberTimetableStatus,
  TableFilterType,
  weekDays,
  workChangeType,
} from '@/common';
import {
  useApi,
  useDialogForm,
  useInit,
  useMuitActionDialog,
} from '@/hooks/index';
import { TableColumnProps, TableProps, Col, Row, Image, Tooltip } from 'antd';
import apiInterface from 'api';
import componentData from 'typings';
import TimeCard from '@/components/timeCard';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import CustomTable, {
  dateCell,
  goMemberCenterCell,
} from '@/components/CustomTable';
import { find, propEq } from 'ramda';
import { userSearch } from '@/api/user';
import {
  memberTimetableAddAdmin,
  memberTimetableDelete,
  memberTimetableEdit,
  memberTimetableList,
} from '@/api/memberTimetable';

const addPropData: componentData.PropData[] = [
  {
    key: 'semesterId',
    type: TableFilterType.number,
    name: '值班学期ID',
    rules: [{ required: true }],
  },
  {
    key: 'userId',
    type: TableFilterType.selectSearch,
    name: '成员',
    selectData: userSearch,
    holder: '姓名/学号/工号',
    searchOption: {
      keyProp: 'id',
      labelProp: 'name',
    },
    rules: [{ required: true }],
  },
  {
    key: 'imagePath',
    type: TableFilterType.image,
    name: '截图',
    holder: '上传图片/图片直链',
    rules: [{ required: true }],
  },
  {
    key: 'availableWeekday',
    type: TableFilterType.muitSelect,
    selectData: weekDays,
    name: '可值班日',
    rules: [{ required: true }],
  },
  {
    key: 'comment',
    type: TableFilterType.str,
    name: '备注',
    rules: [{ required: true }],
  },
];

const EditPropData: componentData.PropData[] = [
  {
    key: 'id',
    type: TableFilterType.number,
    name: '成员课程表ID',
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
    key: 'userId',
    type: TableFilterType.selectSearch,
    name: '成员',
    selectData: userSearch,
    holder: '姓名/学号/工号',
    searchOption: {
      keyProp: 'id',
      labelProp: 'name',
    },
    rules: [{ required: true }],
  },
  {
    key: 'imagePath',
    type: TableFilterType.image,
    name: '截图',
    rules: [{ required: true }],
  },
  {
    key: 'availableWeekday',
    type: TableFilterType.muitSelect,
    selectData: weekDays,
    name: '可值班日',
    rules: [{ required: true }],
  },
  {
    key: 'comment',
    type: TableFilterType.str,
    name: '备注',
    rules: [{ required: true }],
  },
];

const colums: TableColumnProps<apiInterface.MemberTimetable>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    fixed: 'left',
  },
  {
    title: '成员姓名-工号',
    dataIndex: 'user',
    render: (value, record, index) => goMemberCenterCell(record.user),
    width: 140,
  },
  {
    title: '课程表截图',
    dataIndex: 'imagePath',
    render: (value, record, index) => (
      <Image width="200" src={record.imagePath} />
    ),
    width: 200,
  },
  {
    title: '可值班日',
    dataIndex: 'availableWeekday',
    render: (value, record, index) =>
      record.availableWeekday
        .map((item) => find(propEq('id', item), weekDays)?.string || 'null')
        .join('、'),
    width: 140,
  },
  {
    title: '备注',
    dataIndex: 'comment',
    ellipsis: {
      showTitle: false,
    },
    render: (value) => (
      <Tooltip placement="topLeft" title={value}>
        {value}
      </Tooltip>
    ),
    width: 200,
  },
];

const MemberTimeTable: FC<{ semesterId: number }> = ({ semesterId }) => {
  // 表单数据
  const [
    formData,
    setFormData,
  ] = useState<apiInterface.MemberTimetableListQuery>({
    page: 1,
    count: 10,
    semesterId,
    status: 1,
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
      key: 'status',
      type: TableFilterType.select,
      name: '状态',
      selectData: memberTimetableStatus,
      default: 1,
      rules: [{ required: true }],
    },
    {
      key: 'userId',
      type: TableFilterType.selectSearch,
      name: '成员',
      selectData: userSearch,
      holder: '姓名/学号/工号',
      searchOption: {
        keyProp: 'id',
        labelProp: 'name',
      },
    },
  ];

  // api hooks
  const apiHooks = useInit<apiInterface.MemberTimetableListQuery>(
    memberTimetableList,
    formData,
  );

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.MemberTimetableAddAdminData>(
    memberTimetableAddAdmin,
    addPropData,
    '新增成员课程表',
    () => apiHooks.setLoading(true),
  );

  const muitActions: componentData.MuitActionProp[] = [
    {
      key: 'delete',
      value: '删除',
      propData: [],
      api: memberTimetableDelete,
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
        api: memberTimetableEdit,
        propData: EditPropData,
        title: '编辑成员课程表',
        onSubmit: () => apiHooks.setLoading(true),
      },
      apiParamKeys: (record: apiInterface.MemberTimetable) => ({
        id: record.id,
        semesterId: record.semester.id,
        userId: record.user.id,
        imagePath: record.imagePath,
        availableWeekday: record.availableWeekday,
        comment: record.comment,
      }),
      type: 'dialog',
      hidden: (record: apiInterface.MemberTimetable) => !!record.createTime,
    },
    {
      key: 'edit',
      text: '编辑',
      icon: <EditOutlined />,
      hooks: {
        api: memberTimetableAddAdmin,
        propData: addPropData,
        title: '编辑成员课程表',
        onSubmit: () => apiHooks.setLoading(true),
      },
      apiParamKeys: (record: apiInterface.MemberTimetable) => ({
        semesterId: record.semester.id,
        userId: record.user.id,
      }),
      type: 'dialog',
      hidden: (record: apiInterface.MemberTimetable) => !record.createTime,
    },
    {
      key: 'delete',
      text: '删除',
      icon: <DeleteOutlined />,
      hooks: useApi(memberTimetableDelete, undefined, () =>
        apiHooks.setLoading(true),
      ),
      apiParamKeys: (record: apiInterface.MemberTimetable) => ({
        id: [record.id],
      }),
      type: 'api',
      btnProps: {
        danger: true,
      },
    },
  ];

  const expandable: TableProps<apiInterface.MemberTimetable>['expandable'] = {
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
        onRow={onRow}
        expandable={expandable}
      />
    </>
  );
};

export default MemberTimeTable;
