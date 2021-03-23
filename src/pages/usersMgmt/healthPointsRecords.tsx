import { FC, useState } from 'react';
import { memberHealthSortableList, TableFilterType } from '@/common';
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
import { userSearch } from '@/api/user';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  memberHealthAdd,
  memberHealthDelete,
  memberHealthEdit,
  memberHealthList,
} from '@/api/memberHealth';

const filters: componentData.PropData[] = [
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
  {
    key: 'reason',
    type: TableFilterType.str,
    name: '原因',
  },
  {
    key: 'operatorId',
    type: TableFilterType.selectSearch,
    name: '操作人',
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
    name: '时间范围',
    timeRange: {
      rangeStartProp: 'start',
      rangeEndProp: 'end',
    },
  },
];

const addPropData: componentData.PropData[] = [
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
  {
    key: 'value',
    type: TableFilterType.number,
    name: '加血/扣血量',
    rules: [{ required: true }, { type: 'number' }],
  },
  {
    key: 'reason',
    type: TableFilterType.str,
    name: '原因',
    rules: [{ required: true }],
  },
];

const EditPropData: componentData.PropData[] = [
  {
    key: 'id',
    type: TableFilterType.number,
    name: '记录ID',
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
  {
    key: 'value',
    type: TableFilterType.number,
    name: '加血/扣血量',
    rules: [{ required: true }, { type: 'number' }],
  },
  {
    key: 'reason',
    type: TableFilterType.str,
    name: '原因',
    rules: [{ required: true }],
  },
];

const colums: TableColumnProps<apiInterface.MemberHealth>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 70,
    fixed: 'left',
  },
  {
    title: '成员姓名-工号',
    render: getRouteCell<apiInterface.MemberHealth>(
      (record) =>
        `${record.user.name}-${record.user.member.workId || '已退出'}`,
      (record) => '/d/repair-requests-mgmt/records', // TODO: 路由跳转
    ),
    width: 100,
  },
  {
    title: '加血/扣血量',
    dataIndex: 'value',
    render: (value, record, index) =>
      value >= 0 ? (
        <span style={{ color: '#00ce00' }}>{`+${value}`}</span>
      ) : (
        <span style={{ color: '#ff0000' }}>{value}</span>
      ),
    width: 80,
  },
  {
    title: '原因',
    dataIndex: 'reason',
    width: 80,
  },
  {
    title: '操作人姓名-工号',
    render: getRouteCell<apiInterface.MemberHealth>(
      (record) =>
        `${record.operator.name}-${record.operator.member.workId || '已退出'}`,
      (record) => '/d/repair-requests-mgmt/records', // TODO: 路由跳转
    ),
    width: 100,
  },
  {
    title: '时间',
    dataIndex: 'createTime',
    width: 100,
  },
];

const healthPointsRecords: FC = () => {
  // 表单数据
  const [formData, setFormData] = useState<apiInterface.MemberHealthListQuery>({
    page: 1,
    count: 10,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.MemberHealthListQuery>(
    memberHealthList,
    formData,
  );

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.MemberHealthAddData>(
    memberHealthAdd,
    addPropData,
    '新增成员血条记录',
    () => apiHooks.setLoading(true),
  );

  const muitActions: componentData.MuitActionProp[] = [
    {
      key: 'delete',
      value: '删除',
      propData: [],
      api: memberHealthDelete,
    },
  ];

  const apiMuiltActionDialogHooks = useMuitActionDialog(muitActions, () =>
    apiHooks.setLoading(true),
  );

  const onRow: TableProps<apiInterface.MemberHealth>['onRow'] = (record) => {
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
        api: memberHealthEdit,
        propData: EditPropData,
        title: '编辑成员血条记录',
        onSubmit: () => apiHooks.setLoading(true),
      },
      apiParamKeys: (record: apiInterface.MemberHealth) => ({
        id: record.id,
        userId: record.userId,
        value: record.value,
        reason: record.reason,
      }),
      type: 'dialog',
    },
    {
      key: 'delete',
      text: '删除',
      icon: <DeleteOutlined />,
      hooks: useApi(memberHealthDelete, undefined, () =>
        apiHooks.setLoading(true),
      ),
      apiParamKeys: (record: apiInterface.MemberHealth) => ({
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
      sortList={memberHealthSortableList}
      extraComponent={{ Right: ExportBtn }}
    />
  );
};

export default healthPointsRecords;
