import { FC, useState } from 'react';
import { TableFilterType, registerWhitelistGroupEnabled } from '@/common';
import { useApi, useDialogForm, useInit, useMuitActionDialog } from '@/hooks/index';
import { TableColumnProps, TableProps } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import apiInterface from 'api';
import CustomTable from '@/components/CustomTable';
import componentData from 'typings';
import {
  registerWhitelistGroupAdd,
  registerWhitelistGroupDelete,
  registerWhitelistGroupEdit,
  registerWhitelistGroupList,
} from '@/api/registerWhitelistGroup';
import RegisterWhitelistGroupEnabledStatus from '@/components/RegisterWhitelistGroupEnabledStatus';

const filters: componentData.PropData[] = [
  {
    key: 'name',
    type: TableFilterType.str,
    name: '分组名',
  },
  {
    key: 'enabled',
    type: TableFilterType.select,
    selectData: registerWhitelistGroupEnabled,
    name: '启用',
  },
];

const addPropData: componentData.PropData[] = [
  {
    key: 'name',
    type: TableFilterType.str,
    name: '分组名',
    rules: [{ required: true }],
  },
  {
    key: 'enabled',
    type: TableFilterType.select,
    selectData: registerWhitelistGroupEnabled,
    name: '启用',
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
    name: '分组名',
    rules: [{ required: true }],
  },
  {
    key: 'enabled',
    type: TableFilterType.select,
    selectData: registerWhitelistGroupEnabled,
    name: '启用',
    rules: [{ required: true }],
  },
];

const onRow: TableProps<apiInterface.RegisterWhitelistGroup>['onRow'] = (
  record,
) => {
  return {
    onClick: (event) => {
      // TODO: 点击行路由跳转
    }, // 点击行
  };
};

const colums: TableColumnProps<apiInterface.RegisterWhitelistGroup>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    fixed: 'left',
  },
  {
    title: '白名单分组名',
    dataIndex: 'name',
    width: 90,
  },
  {
    title: '是否启用',
    render: (value, record, index) => (
      <RegisterWhitelistGroupEnabledStatus registerWhitelistGroup={record} />
    ),
    width: 140,
  },
];

const registerAbleUsersMgmt: FC = () => {
  // 表单数据
  const [
    formData,
    setFormData,
  ] = useState<apiInterface.RegisterWhitelistGroupListQuery>({
    page: 1,
    count: 10,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.RegisterWhitelistGroupListQuery>(
    registerWhitelistGroupList,
    formData,
  );

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.RegisterWhitelistGroupAddData>(
    registerWhitelistGroupAdd,
    addPropData,
    '新增白名单分组',
    () => apiHooks.setLoading(true),
  );

  const muitActions: componentData.MuitActionProp[] = [
    {
      key: 'delete',
      value: '删除',
      propData: [],
      api: registerWhitelistGroupDelete,
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
        api: registerWhitelistGroupEdit,
        propData: EditPropData,
        title: '编辑白名单分组',
        onSubmit: () => apiHooks.setLoading(true),
      },
      apiParamKeys: (record: apiInterface.RegisterWhitelistGroup) => ({
        id: record.id,
        name: record.name,
        enabled: record.enabled,
      }),
      type: 'dialog',
    },
    {
      key: 'delete',
      text: '删除',
      icon: <DeleteOutlined />,
      hooks: useApi(registerWhitelistGroupDelete, undefined, () =>
        apiHooks.setLoading(true),
      ),
      apiParamKeys: (record: apiInterface.RegisterWhitelistGroup) => ({
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

export default registerAbleUsersMgmt;
