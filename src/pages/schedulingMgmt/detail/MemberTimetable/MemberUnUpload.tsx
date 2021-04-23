import { FC, useState } from 'react';
import { memberTimetableStatus, TableFilterType, weekDays } from '@/common';
import {
  useApi,
  useDialogForm,
  useInit,
  useMuitActionDialog,
} from '@/hooks/index';
import { TableColumnProps, TableProps, Col, Row, Image, Tooltip } from 'antd';
import apiInterface from 'api';
import componentData from 'typings';
import TimeCard from '@/components/TimeCard';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import CustomTable, { goMemberCenterCell } from '@/components/CustomTable';
import { find, propEq } from 'ramda';
import { userSearch } from '@/api/user';
import {
  memberTimetableAddAdmin,
  memberTimetableDelete,
  memberTimetableList,
} from '@/api/memberTimetable';

const colums: TableColumnProps<apiInterface.MemberTimetable>[] = [
  {
    title: '成员姓名-工号',
    dataIndex: 'user',
    render: (value, record, index) => goMemberCenterCell(record.user),
    width: 140,
  },
];

const MemberUnUpload: FC<{ semesterId: number }> = ({ semesterId }) => {
  // 表单数据
  const [
    formData,
    setFormData,
  ] = useState<apiInterface.MemberTimetableListQuery>({
    page: 1,
    count: 10,
    semesterId,
    status: 0,
  });

  const filters: componentData.PropData[] = [
    {
      key: 'semesterId',
      type: TableFilterType.number,
      name: '学期ID',
      default: semesterId,
      rules: [{ required: true }],
      hidden: true,
    },
    {
      key: 'status',
      type: TableFilterType.select,
      name: '状态',
      selectData: memberTimetableStatus,
      default: 0,
      rules: [{ required: true }],
      hidden: true,
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
  const addPropData: componentData.PropData[] = [
    {
      key: 'semesterId',
      type: TableFilterType.number,
      name: '值班学期ID',
      rules: [{ required: true }],
      default: semesterId,
      hidden: true,
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

  const actions: componentData.CustomTableAction[] = [
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
        semesterId,
        userId: record.user.id,
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
  ];

  return (
    <>
      <CustomTable
        formData={formData}
        setFormData={setFormData}
        filters={filters}
        colums={colums}
        actions={actions}
        apiHooks={apiHooks}
      />
    </>
  );
};

export default MemberUnUpload;
