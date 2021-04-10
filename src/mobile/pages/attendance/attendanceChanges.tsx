import { history } from '@/.umi/core/history';
import {
  attendanceChangeAddUser,
  attendanceChangeList,
} from '@/api/attendanceChange';
import { userSearch } from '@/api/user';
import {
  areas,
  attendanceChangeSortableList,
  attendanceChangeStatus,
  attendanceChangeType,
  dormBlocks,
  TableFilterType,
  ticketSortableList,
} from '@/common';
import { useDialogForm, useInit, useRealLocation } from '@/hooks';
import AttendanceChangeInfoCard from '@/mobile/components/AttendanceChangeInfoCard';
import CustomList from '@/mobile/components/CustomList';
import PageContainer from '@/mobile/components/PageContainer';
import apiInterface from 'api';
import { stringify } from 'query-string';
import { FC, useState } from 'react';

const addPropData: componentData.PropData[] = [
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
    holder: '换班才需要填写',
  },
  {
    key: 'area',
    type: TableFilterType.select,
    name: '蹭班/值班片区',
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

const DETAIL_PATH = '/m/attendance-change/detail';

const attendanceChangeRequests: FC = () => {
  const location = useRealLocation();
  const userId = parseInt(location.query.userId?.toString() || '-1');

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
      hidden: true,
      default: userId,
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
      key: 'start',
      name: '申请时间起点',
      type: TableFilterType.timeWithoutTime,
    },
    {
      key: 'end',
      name: '申请时间终点',
      type: TableFilterType.timeWithoutTime,
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

  // 表单数据
  const [
    formData,
    setFormData,
  ] = useState<apiInterface.AttendanceChangeListQuery>({
    page: 1,
    count: 10,
    userId,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.AttendanceChangeListQuery>(
    attendanceChangeList,
    formData,
  );

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.AttendanceChangeAddUserData>(
    attendanceChangeAddUser,
    addPropData,
    '提交考勤变动申请',
    () => apiHooks.setLoading(true),
  );

  return (
    <PageContainer title="值班变动申请">
      <CustomList
        formData={formData}
        setFormData={setFormData}
        filters={filters}
        apiHooks={apiHooks}
        sortList={attendanceChangeSortableList}
        DataComp={AttendanceChangeInfoCard}
        apiAddHooks={apiAddHooks}
        addBtnText="提交申请"
        dataOnClick={(data: apiInterface.AttendanceChange) =>
          history.push({
            pathname: DETAIL_PATH,
            search: stringify({ attendanceChangeId: data.id }),
          })
        }
      />
    </PageContainer>
  );
};

export default attendanceChangeRequests;
