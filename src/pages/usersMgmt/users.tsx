import { FC, useState } from 'react';
import { dormBlocks, TableFilterType, isps } from '@/common';
import {
  useApi,
  useDialogForm,
  useInit,
  useMuitActionDialog,
} from '@/hooks/index';
import { TableColumnProps, TableProps } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import apiInterface from 'api';
import CustomTable from '@/components/CustomTable';
import componentData from 'typings';
import { userAddAdmin, userDelete, userEditAdmin, userList } from '@/api/user';
import { history } from 'umi';
import { stringify } from 'query-string';

const filters: componentData.PropData[] = [
  {
    key: 'name',
    type: TableFilterType.str,
    name: '姓名',
  },
  {
    key: 'studentId',
    type: TableFilterType.str,
    name: '学号',
  },
  {
    key: 'isp',
    type: TableFilterType.select,
    name: '运营商',
    selectData: isps,
  },
  {
    key: 'networkAccount',
    type: TableFilterType.str,
    name: '宽带账号',
  },
  {
    key: 'dormBlock',
    type: TableFilterType.select,
    name: '宿舍楼',
    selectData: dormBlocks,
  },
  {
    key: 'dormRoom',
    type: TableFilterType.number,
    name: '宿舍房间号',
  },
  {
    key: 'telephone',
    type: TableFilterType.str,
    name: '手机号',
  },
];

const addPropData: componentData.PropData[] = [
  {
    key: 'name',
    type: TableFilterType.str,
    name: '姓名',
    rules: [{ required: true }],
  },
  {
    key: 'studentId',
    type: TableFilterType.str,
    name: '学号',
    rules: [{ required: true }],
  },
  {
    key: 'isp',
    type: TableFilterType.select,
    name: '运营商',
    selectData: isps,
    rules: [{ required: true }],
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
    type: TableFilterType.str,
    name: '手机号',
    rules: [{ required: true }],
  },
];

const EditPropData: componentData.PropData[] = [
  {
    key: 'id',
    type: TableFilterType.number,
    name: 'ID',
    rules: [{ required: true }],
    hidden: true,
  },
  {
    key: 'name',
    type: TableFilterType.str,
    name: '姓名',
    rules: [{ required: true }],
  },
  {
    key: 'studentId',
    type: TableFilterType.str,
    name: '学号',
    rules: [{ required: true }],
  },
  {
    key: 'isp',
    type: TableFilterType.select,
    name: '运营商',
    selectData: isps,
    rules: [{ required: true }],
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
];

const onRow: TableProps<apiInterface.User>['onRow'] = (record) => {
  return {
    onClick: (event) => {
      history.push({
        pathname: '/d/user-center',
        search: stringify({ id: record.id }),
      });
    }, // 点击行
  };
};

const colums: TableColumnProps<apiInterface.User>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
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
    title: '运营商',
    dataIndex: ['isp', 'string'],
    width: 90,
  },
  {
    title: '宽带账号',
    dataIndex: 'networkAccount',
    width: 140,
  },
  {
    title: '宿舍楼',
    dataIndex: ['dormBlock', 'string'],
    width: 120,
  },
  {
    title: '宿舍房间号',
    dataIndex: ['dormRoom'],
    width: 110,
  },
  {
    title: '手机号',
    dataIndex: 'telephone',
    width: 120,
  },
];

const users: FC = () => {
  // 表单数据
  const [formData, setFormData] = useState<apiInterface.UserListQuery>({
    page: 1,
    count: 10,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.UserListQuery>(userList, formData);

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.UserAddAdminData>(
    userAddAdmin,
    addPropData,
    '新增用户',
    () => apiHooks.setLoading(true),
  );

  const muitActions: componentData.MuitActionProp[] = [
    {
      key: 'delete',
      value: '删除',
      propData: [],
      api: userDelete,
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
        api: userEditAdmin,
        propData: EditPropData,
        title: '编辑用户信息',
        onSubmit: () => apiHooks.setLoading(true),
      },
      apiParamKeys: (record) => ({
        id: record.id,
        name: record.name,
        studentId: record.studentId,
        isp: record.isp.id,
        networkAccount: record.networkAccount,
        dormBlock: record.dormBlock.id,
        dormRoom: record.dormRoom,
        telephone: record.telephone,
      }),
      type: 'dialog',
    },
    {
      key: 'delete',
      text: '删除',
      icon: <DeleteOutlined />,
      hooks: useApi(userDelete, undefined, () => apiHooks.setLoading(true)),
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
    />
  );
};

export default users;
