import { FC, useState } from 'react';
import { dormBlocks, TableFilterType, isps } from '@/common';
import { useApi, useDialogForm, useMuitActionDialog } from '@/hooks/index';
import { TableColumnProps, TableProps, Button, Modal } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import apiInterface from 'api';
import CustomTable from '@/components/CustomTable';
import componentData from 'typings';
import { registerWhitelistGroupSearch } from '@/api/registerWhitelistGroup';
import {
  registerWhitelistAdd,
  registerWhitelistBatchEdit,
  registerWhitelistDelete,
  registerWhitelistEdit,
  registerWhitelistList,
} from '@/api/registerWhitelist';
import RegisterAbleUserGroupMgmtComp from './registerAbleUserGroupMgmt';

const filters: componentData.PropData[] = [
  {
    key: 'groupId',
    type: TableFilterType.selectSearch,
    name: '分组',
    selectData: registerWhitelistGroupSearch,
    holder: '分组名称',
    searchOption: {
      keyProp: 'id',
      labelProp: 'name',
    },
    rules: [{ required: true }],
  },
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
    key: 'groupId',
    type: TableFilterType.selectSearch,
    name: '分组',
    selectData: registerWhitelistGroupSearch,
    holder: '分组名称',
    searchOption: {
      keyProp: 'id',
      labelProp: 'name',
    },
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
    key: 'groupId',
    type: TableFilterType.selectSearch,
    name: '分组',
    selectData: registerWhitelistGroupSearch,
    holder: '分组名称',
    searchOption: {
      keyProp: 'id',
      labelProp: 'name',
    },
    rules: [{ required: true }],
  },
];

const onRow: TableProps<apiInterface.RegisterWhitelist>['onRow'] = (record) => {
  return {
    onClick: (event) => {
      // TODO: 点击行路由跳转
    }, // 点击行
  };
};

const colums: TableColumnProps<apiInterface.RegisterWhitelist>[] = [
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
    title: '所属分组',
    dataIndex: ['group', 'name'],
    width: 100,
  },
];

const registerAbleUsersMgmt: FC = () => {
  // 表单数据
  const [
    formData,
    setFormData,
  ] = useState<apiInterface.RegisterWhitelistListQuery>({
    page: 1,
    count: 10,
  });

  // 分组管理dialog
  const [groupMgmtVisible, setGroupMgmtVisible] = useState(false);

  // api hooks
  const apiHooks = useApi<apiInterface.RegisterWhitelistListQuery>(
    registerWhitelistList,
    formData,
  );

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.RegisterWhitelistAddData>(
    registerWhitelistAdd,
    addPropData,
    '新增白名单',
    () => apiHooks.setLoading(true),
  );

  const muitActions: componentData.MuitActionProp[] = [
    {
      key: 'delete',
      value: '删除',
      propData: [],
      api: registerWhitelistDelete,
    },
    {
      key: 'editGroup',
      value: '修改白名单分组',
      propData: [
        {
          key: 'groupId',
          type: TableFilterType.selectSearch,
          name: '分组',
          selectData: registerWhitelistGroupSearch,
          holder: '分组名称',
          searchOption: {
            keyProp: 'id',
            labelProp: 'name',
          },
          rules: [{ required: true }],
        },
      ],
      api: registerWhitelistBatchEdit,
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
        api: registerWhitelistEdit,
        propData: EditPropData,
        title: '编辑白名单信息',
        onSubmit: () => apiHooks.setLoading(true),
      },
      apiParamKeys: (record: apiInterface.RegisterWhitelist) => ({
        id: record.id,
        name: record.name,
        studentId: record.studentId,
        groupId: record.group.id,
      }),
      type: 'dialog',
    },
    {
      key: 'delete',
      text: '删除',
      icon: <DeleteOutlined />,
      hooks: useApi(registerWhitelistDelete, undefined, () =>
        apiHooks.setLoading(true),
      ),
      apiParamKeys: (record: apiInterface.RegisterWhitelist) => ({
        id: [record.id],
      }),
      type: 'api',
      btnProps: {
        danger: true,
      },
    },
  ];

  // TODO: 批量添加
  const BatchAddBtn = (
    <Button onClick={() => {}} type="dashed" icon={<UploadOutlined />}>
      批量添加
    </Button>
  );

  // TODO: 导出excel
  const ExportBtn = (
    <>
      <Button
        onClick={() => {
          setGroupMgmtVisible(true);
        }}
        ghost
        type="primary"
      >
        分组管理
      </Button>
      <Button onClick={() => {}} type="dashed">
        导出结果为Excel
      </Button>
    </>
  );

  return (
    <>
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
        extraComponent={{ Left: BatchAddBtn, Right: ExportBtn }}
      />
      <Modal
        visible={groupMgmtVisible}
        width="800px"
        footer={null}
        onCancel={() => setGroupMgmtVisible(false)}
        title="分组管理"
      >
        <RegisterAbleUserGroupMgmtComp />
      </Modal>
    </>
  );
};

export default registerAbleUsersMgmt;
