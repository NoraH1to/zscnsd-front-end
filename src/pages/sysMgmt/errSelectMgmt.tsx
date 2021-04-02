import { FC, useState } from 'react';
import { TableFilterType, ticketFaultTypeVisible } from '@/common';
import {
  useApi,
  useDialogForm,
  useInit,
  useMuitActionDialog,
} from '@/hooks/index';
import { TableColumnProps, TableProps, Button } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import apiInterface from 'api';
import CustomTable from '@/components/CustomTable';
import componentData from 'typings';
import {
  ticketFaultMenuAdd,
  ticketFaultMenuBatchEdit,
  ticketFaultMenuDelete,
  ticketFaultMenuEdit,
  ticketFaultMenuList,
} from '@/api/ticketFaultMenu';
import TicketFaultTypeVisibleStatusComp from '@/components/TicketFaultTypeVisibleStatus';

const filters: componentData.PropData[] = [
  {
    key: 'content',
    type: TableFilterType.str,
    name: '错误内容',
  },
  {
    key: 'visible',
    type: TableFilterType.select,
    selectData: ticketFaultTypeVisible,
    name: '是否可见',
  },
];

const addPropData: componentData.PropData[] = [
  {
    key: 'content',
    type: TableFilterType.str,
    name: '内容',
    rules: [{ required: true }],
  },
  {
    key: 'order',
    type: TableFilterType.number,
    name: '顺序',
    rules: [{ required: true }],
  },
  {
    key: 'visible',
    type: TableFilterType.select,
    selectData: ticketFaultTypeVisible,
    name: '是否可见',
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
    key: 'content',
    type: TableFilterType.str,
    name: '内容',
    rules: [{ required: true }],
  },
  {
    key: 'order',
    type: TableFilterType.number,
    name: '顺序',
    rules: [{ required: true }],
  },
  {
    key: 'visible',
    type: TableFilterType.select,
    selectData: ticketFaultTypeVisible,
    name: '是否可见',
    rules: [{ required: true }],
  },
];

const colums: TableColumnProps<apiInterface.TicketFaultMenu>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    fixed: 'left',
  },
  {
    title: '内容',
    dataIndex: 'content',
    width: 140,
  },
  {
    title: '是否可见',
    render: (value, record, index) => (
      <TicketFaultTypeVisibleStatusComp ticketFaultType={record} />
    ),
    width: 100,
  },
];

const errSelectMgmt: FC = () => {
  // 表单数据
  const [
    formData,
    setFormData,
  ] = useState<apiInterface.TicketFaultTypeListQuery>({});

  // api hooks
  const apiHooks = useInit<apiInterface.TicketFaultTypeListQuery>(
    ticketFaultMenuList,
    formData,
  );

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.TicketFaultTypeAddData>(
    ticketFaultMenuAdd,
    addPropData,
    '新增错误类型',
    () => apiHooks.setLoading(true),
  );

  const muitActions: componentData.MuitActionProp[] = [
    {
      key: 'delete',
      value: '删除',
      propData: [],
      api: ticketFaultMenuDelete,
    },
    {
      key: 'visible',
      value: '修改可见',
      propData: [
        {
          key: 'visible',
          type: TableFilterType.select,
          name: '可见',
          selectData: ticketFaultTypeVisible,
          rules: [{ required: true }],
        },
      ],
      api: ticketFaultMenuBatchEdit,
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
        api: ticketFaultMenuEdit,
        propData: EditPropData,
        title: '编辑错误类型',
        onSubmit: () => apiHooks.setLoading(true),
      },
      apiParamKeys: (record: apiInterface.TicketFaultMenu) => ({
        id: record.id,
        content: record.content,
        order: record.order,
        visible: record.visible,
      }),
      type: 'dialog',
    },
    {
      key: 'delete',
      text: '删除',
      icon: <DeleteOutlined />,
      hooks: useApi(ticketFaultMenuDelete, undefined, () =>
        apiHooks.setLoading(true),
      ),
      apiParamKeys: (record: apiInterface.TicketFaultMenu) => ({
        id: [record.id],
      }),
      type: 'api',
      btnProps: {
        danger: true,
      },
    },
  ];

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
        tableProps={{ pagination: false }}
      />
    </>
  );
};

export default errSelectMgmt;
