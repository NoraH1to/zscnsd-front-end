import { FC, useState } from 'react';
import {
  dormBlocks,
  TableFilterType,
  ticketDeleted,
  ticketStatus,
} from '@/common';
import { useApi, useDialogForm, useInit } from '@/hooks/index';
import {
  ticketAdd,
  ticketDelete,
  ticketEdit,
  ticketFaultMenu,
  ticketList,
} from '@/api/ticket';
import { useCustomForm } from '@/hooks/useCustomForm';
import update from 'immutability-helper';
import { Button, Tooltip, Table, TableColumnProps, Badge } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import BaseTable from '@/components/BaseTable';
import apiInterface from 'api';
import { find, propEq } from 'ramda';

const filters: componentData.PropData[] = [
  {
    key: 'userId',
    type: TableFilterType.number,
    name: '报修用户ID',
  },
  {
    key: 'status',
    type: TableFilterType.select,
    name: '报修状态',
    selectData: ticketStatus,
  },
  {
    key: 'faultType',
    type: TableFilterType.select,
    name: '报修故障类型',
    selectData: ticketFaultMenu,
  },
  {
    key: 'dormBlock',
    type: TableFilterType.select,
    name: '宿舍楼',
    selectData: dormBlocks,
  },
  {
    key: 'submitTimeRange',
    type: TableFilterType.timeRange,
    name: '报修时间范围',
    timeRange: {
      rangeStartProp: 'start',
      rangeEndProp: 'end',
    },
  },
  {
    key: 'deleted',
    type: TableFilterType.select,
    name: '删除',
    selectData: ticketDeleted,
    default: 'false',
    rules: [{ required: true }],
  },
];

const addPropData: componentData.PropData[] = [
  {
    key: 'userId',
    type: TableFilterType.str,
    name: '报修人用户ID',
    rules: [{ required: true }],
  },
  {
    key: 'status',
    type: TableFilterType.select,
    name: '报修状态',
    selectData: ticketStatus,
    rules: [{ required: true }],
  },
  {
    key: 'faultType',
    type: TableFilterType.select,
    name: '报修故障类型',
    selectData: ticketFaultMenu,
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
    name: '报修ID',
    rules: [{ required: true }],
    hidden: true,
  },
  {
    key: 'userId',
    type: TableFilterType.str,
    name: '报修人用户ID',
    rules: [{ required: true }],
  },
  {
    key: 'status',
    type: TableFilterType.select,
    name: '报修状态',
    selectData: ticketStatus,
    rules: [{ required: true }],
  },
  {
    key: 'faultType',
    type: TableFilterType.select,
    name: '报修故障类型',
    selectData: ticketFaultMenu,
    rules: [{ required: true }],
  },
  {
    key: 'comment',
    type: TableFilterType.str,
    name: '备注',
    rules: [{ required: true }],
  },
];

const colums: TableColumnProps<apiInterface.Ticket>[] = [
  {
    title: '报修ID',
    dataIndex: 'id',
    width: 70,
    fixed: 'left',
  },
  {
    title: '宿舍楼',
    dataIndex: ['user', 'dormBlock', 'string'],
    width: 100,
  },
  {
    title: '报修状态',
    render: (value, record, index) => {
      const status =
        find<apiInterface.TicketStatus>(propEq('id', record.status.id))(
          ticketStatus,
        )?.status || 'default';
      const text = record.status.string;
      return <Badge status={status} text={text} />;
    },
    width: 100,
  },
  {
    title: '报修错误类型',
    dataIndex: ['faultType', 'content'],
    width: 200,
    ellipsis: {
      showTitle: false,
    },
    render: (value) => (
      <Tooltip placement="topLeft" title={value}>
        {value}
      </Tooltip>
    ),
  },
  {
    title: '最后处理人姓名-工号',
    render: (value, record, index) => {
      return `${record.lastOperateLog.operator.name}-${
        record.lastOperateLog.operator.member?.workId || '已退出'
      }`;
    },
    width: 100,
  },
  {
    title: '最后处理时间',
    dataIndex: ['lastOperateLog', 'updateTime'],
    width: 100,
  },
];

const requests: FC = () => {
  // 表单数据
  const [formData, setFormData] = useState<apiInterface.TicketListQuery>({
    page: 1,
    count: 10,
    order: '1',
    deleted: false,
  });

  // 被选中的行
  const [selectedList, setSelectedList] = useState<any>([]);
  const rowSelection = {
    selectedList,
    onChange: (selectedRowKeys: any[]) => {
      setSelectedList(selectedRowKeys);
    },
  };

  // api hooks
  const {
    loading,
    setLoading,
    setParams,
    data,
    errorData,
  }: {
    data: apiInterface.ResponsePage;
    [index: string]: any;
  } = useInit<apiInterface.TicketListQuery>(ticketList, formData);

  // 添加接口 hooks
  const {
    visible: addVisible,
    setVisible: setAddVisible,
    DialogForm: AddDialogForm,
  } = useDialogForm<apiInterface.TicketAddData>(
    ticketAdd,
    addPropData,
    '新增报修',
    () => setLoading(true),
  );

  const {
    visible: editVisible,
    setVisible: setEditVisible,
    DialogForm: EditDialogForm,
    setForm: setEditForm,
  } = useDialogForm<apiInterface.TicketEditData>(
    ticketEdit,
    EditPropData,
    '修改报修',
    () => setLoading(true),
  );

  const {
    loading: deleteLoading,
    setLoading: setDeleteLoading,
    setParams: setDeleteParams,
    data: deleteData,
    errorData: deleteErrorData,
  } = useApi<apiInterface.TicketDeleteData>(ticketDelete, undefined, () =>
    setLoading(true),
  );

  // 搜索表单 hooks
  const { form, validatedContainer, validateFields } = useCustomForm(
    filters,
    (newformData) => setFormData(update(formData, { $merge: newformData })),
  );

  const onSubmit = async () => {
    await validateFields();
    if (!validatedContainer.validated) return;
    setParams(formData);
    setLoading(true);
  };

  const otherCol: TableColumnProps<apiInterface.Ticket>[] = [
    {
      title: '操作',
      width: 140,
      render: (value, record, index) => {
        const editBtn = EditDialogForm ? (
          <Tooltip title="修改">
            <Button
              icon={<EditOutlined />}
              type="text"
              shape="circle"
              onClick={() => {
                setEditForm<apiInterface.TicketEditData>({
                  id: record.id,
                  userId: record.userId,
                  status: record.status.id,
                  faultTypeId: record.faultTypeId,
                  comment: record.comment,
                });
                setEditVisible(true);
              }}
            />
          </Tooltip>
        ) : null;
        const deleteBtn = (
          <Tooltip title="删除">
            <Button
              danger
              icon={<DeleteOutlined />}
              type="text"
              shape="circle"
              onClick={() => {
                setDeleteParams({
                  id: [record.id],
                });
                setDeleteLoading(true);
              }}
            />
          </Tooltip>
        );
        return (
          <>
            {editBtn}
            {deleteBtn}
          </>
        );
      },
    },
  ];
  return (
    <>
      <BaseTable
        Filter={form}
        FilterBtn={
          <Button loading={loading} type="primary" onClick={onSubmit}>
            搜索
          </Button>
        }
        TableActionLeft={
          <Button onClick={() => setAddVisible(true)}>新建</Button>
        }
        TableActionRight={
          <Button disabled={selectedList.length === 0} type="primary">
            操作选中项
          </Button>
        }
        Table={
          <Table
            scroll={{ x: 1350 }}
            loading={loading}
            dataSource={data.data?.content}
            columns={colums.concat(otherCol)}
            rowSelection={rowSelection}
            rowKey={'id'}
            sticky
            pagination={{
              position: ['bottomCenter'],
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '30'],
              onShowSizeChange: (current, size) => {
                formData.count = size;
                setParams(formData);
                setLoading(true);
              },
              total: data.data?.totalRecords,
              onChange: (page, pageSize) => {
                formData.page = page;
                setParams(formData);
                setLoading(true);
              },
            }}
          ></Table>
        }
      />
      {AddDialogForm}
      {EditDialogForm}
    </>
  );
};

export default requests;
