import { FC, useState } from 'react';
import { TableFilterType, areas, attendanceSortableList } from '@/common';
import { useInit } from '@/hooks/index';
import { attendanceList } from '@/api/attendance';
import { TableColumnProps, TableProps } from 'antd';
import apiInterface from 'api';
import CustomTable, { getRouteCell } from '@/components/CustomTable';
import componentData from 'typings';
import { history } from 'umi';
import { userSearch } from '@/api/user';

const filters: componentData.PropData[] = [
  {
    key: 'userId',
    type: TableFilterType.selectSearch,
    name: '成员用户',
    selectData: userSearch,
    holder: '姓名/学号/工号',
    searchOption: {
      keyProp: 'id',
      labelProp: 'name',
    },
  },
  {
    key: 'area',
    type: TableFilterType.select,
    name: '片区',
    selectData: areas,
  },
  {
    key: 'timeRange',
    type: TableFilterType.timeRange,
    name: '签到/签退时间范围',
    timeRange: {
      rangeStartProp: 'start',
      rangeEndProp: 'end',
    },
  },
];

const colums: TableColumnProps<apiInterface.Attendance>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 30,
    fixed: 'left',
  },
  {
    title: '成员姓名-工号',
    render: getRouteCell<apiInterface.Attendance>(
      (record) =>
        `${record.user.name}-${record.user.member?.workId || '已退出'}`,
      (record) => '/d/repair-requests-mgmt/records', // TODO 路由跳转
    ),
    width: 60,
  },
  {
    title: '签到时间',
    dataIndex: ['signInTime'],
    width: 60,
  },
  {
    title: '签退时间',
    dataIndex: ['signOutTime'],
    width: 60,
  },
  {
    title: '值班片区',
    dataIndex: ['area', 'string'],
    width: 80,
  },
];

const onRow: TableProps<apiInterface.Attendance>['onRow'] = (record) => {
  return {
    onClick: (event) => {
      history.push({
        pathname: '/d/repair-requests-mgmt/records',
        query: {
          operatorId: record.userId.toString(),
          start: record.signInTime,
          end: record.signOutTime,
        },
      });
    }, // 点击行
  };
};

const records: FC = () => {
  // 表单数据
  const [formData, setFormData] = useState<apiInterface.AttendanceListQuery>({
    page: 1,
    count: 10,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.AttendanceListQuery>(
    attendanceList,
    formData,
  );

  return (
    <CustomTable
      formData={formData}
      setFormData={setFormData}
      filters={filters}
      colums={colums}
      apiHooks={apiHooks}
      onRow={onRow}
      sortList={attendanceSortableList}
    />
  );
};

export default records;
