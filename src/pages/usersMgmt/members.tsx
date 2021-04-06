import { FC, useState } from 'react';
import {
  dormBlocks,
  punishments,
  roles,
  TableFilterType,
  memberSortableList,
  weekDays,
  areas,
} from '@/common';
import {
  useApi,
  useDialogForm,
  useInit,
  useMuitActionDialog,
} from '@/hooks/index';
import { TableColumnProps, TableProps } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import apiInterface from 'api';
import { find } from 'ramda';
import CustomTable from '@/components/CustomTable';
import componentData from 'typings';
import { memberAdd, memberDelete, memberEdit, memberList } from '@/api/member';
import { userSearch } from '@/api/user';
import { history } from 'umi';
import { stringify } from 'query-string';

const filters: componentData.PropData[] = [
  {
    key: 'userId',
    type: TableFilterType.selectSearch,
    name: '成员用户ID',
    selectData: userSearch,
    holder: '姓名/学号/工号',
    searchOption: {
      keyProp: 'id',
      labelProp: 'name',
    },
  },
  {
    key: 'workId',
    type: TableFilterType.number,
    name: '工号',
  },
  {
    key: 'role',
    type: TableFilterType.select,
    name: '权限角色',
    selectData: roles,
  },
  {
    key: 'punishment',
    type: TableFilterType.select,
    name: '处罚星级',
    selectData: punishments,
  },
  {
    key: 'area',
    type: TableFilterType.select,
    name: '负责区域',
    selectData: areas,
  },
  {
    key: 'workday',
    type: TableFilterType.select,
    name: '值班日',
    selectData: weekDays,
  },
];

const addPropData: componentData.PropData[] = [
  {
    key: 'userId',
    type: TableFilterType.str,
    name: '用户ID',
    rules: [{ required: true }],
  },
  {
    key: 'workId',
    type: TableFilterType.str,
    name: '工号',
    rules: [{ required: true }],
  },
  {
    key: 'role',
    type: TableFilterType.select,
    name: '权限角色',
    selectData: roles,
    rules: [{ required: true }],
  },
];

const EditPropData: componentData.PropData[] = [
  {
    key: 'id',
    type: TableFilterType.number,
    name: '成员用户ID',
    rules: [{ required: true }],
    hidden: true,
  },
  {
    key: 'networkAccount',
    type: TableFilterType.str,
    name: '宽带账号',
    rules: [{ required: true }],
  },
  {
    key: 'dormBlock',
    type: TableFilterType.select,
    name: '宿舍楼',
    selectData: dormBlocks,
    rules: [{ required: true }],
  },
  {
    key: 'dormRoom',
    type: TableFilterType.number,
    name: '宿舍房间号',
    rules: [{ required: true }],
  },
  {
    key: 'telephone',
    type: TableFilterType.number,
    name: '手机号',
    rules: [{ required: true }],
  },
  {
    key: 'workId',
    type: TableFilterType.number,
    name: '工号',
    rules: [{ required: true }],
  },
  {
    key: 'role',
    type: TableFilterType.select,
    name: '权限角色',
    selectData: roles,
    rules: [{ required: true }],
  },
  {
    key: 'password',
    type: TableFilterType.str,
    name: '密码 (留空则不更改)',
  },
];

const onRow: TableProps<apiInterface.Member>['onRow'] = (record) => {
  return {
    onClick: (event) => {
      history.push({
        pathname: '/d/user-center',
        search: stringify({ id: record.id }),
      });
    }, // 点击行
  };
};

const colums: TableColumnProps<apiInterface.Member>[] = [
  {
    title: '工号',
    dataIndex: ['member', 'workId'],
    width: 80,
    fixed: 'left',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 90,
  },
  {
    title: '学号',
    dataIndex: 'studentId',
    width: 140,
  },
  {
    title: '角色',
    dataIndex: ['member', 'role', 'string'],
    width: 110,
  },
  {
    title: '值班片区',
    render: (value, record, index) => {
      return record.member?.workArrangement
        .map((item) => item.area.string)
        .join('、');
    },
    width: 120,
  },
  {
    title: '值班日',
    render: (value, record, index) => {
      return record.member?.workArrangement
        .map(
          (workArrangement) =>
            find((weekday) => weekday.id == workArrangement.weekday, weekDays)
              ?.string,
        )
        .join('、');
    },
    width: 100,
  },
  {
    title: '血条',
    render: (value, record, index) => {
      return record.member?.health;
    },
    width: 80,
  },
  {
    title: '处罚星级',
    render: (value, record, index) => {
      return find((item) => record.member?.punishment == item.id, punishments)
        ?.string;
    },
    width: 100,
  },
];

const members: FC = () => {
  // 表单数据
  const [formData, setFormData] = useState<apiInterface.MemberListQuery>({
    page: 1,
    count: 10,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.MemberListQuery>(memberList, formData);

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.MemberAddData>(
    memberAdd,
    addPropData,
    '新增成员',
    () => apiHooks.setLoading(true),
  );

  const muitActions: componentData.MuitActionProp[] = [
    {
      key: 'delete',
      value: '删除',
      propData: [],
      api: memberDelete,
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
        api: memberEdit,
        propData: EditPropData,
        title: '编辑成员信息',
        onSubmit: () => apiHooks.setLoading(true),
      },
      apiParamKeys: (record) => ({
        id: record.id,
        networkAccount: record.networkAccount,
        dormBlock: record.dormBlock.id,
        dormRoom: record.dormRoom,
        telephone: record.telephone,
        workId: record.member.workId,
        role: record.member.role.id,
        password: '',
      }),
      type: 'dialog',
    },
    {
      key: 'delete',
      text: '删除',
      icon: <DeleteOutlined />,
      hooks: useApi(memberDelete, undefined, () => apiHooks.setLoading(true)),
      apiParamKeys: (record) => ({
        id: [record.id],
      }),
      type: 'api',
      btnProps: {
        danger: true,
      },
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
      sortList={memberSortableList}
    />
  );
};

export default members;
