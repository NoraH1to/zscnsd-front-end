import { FC, useState } from 'react';
import {
  dormBlocks,
  TableFilterType,
  ticketDeleted,
  ispTicketSortableList,
  ticketStatus,
} from '@/common';
import {
  useApi,
  useDialogForm,
  useInit,
  useMuitActionDialog,
  useUploadExcelDialog,
} from '@/hooks/index';
import {
  ispTicketAdd,
  ispTicketBatchAdd,
  ispTicketDelete,
  ispTicketEdit,
  ispTicketList,
  ispTicketOperate,
} from '@/api/ispTicket';
import {
  TableColumnProps,
  TableProps,
  Row,
  Col,
  Card,
  Space,
  Typography,
  Button,
} from 'antd';
import apiInterface from 'api';
import CustomTable, {
  dateTimeCell,
  goMemberCenterCell,
} from '@/components/CustomTable';
import componentData from 'typings';
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import TicketStatusComponent from '@/components/TicketStatusComp';
import { formatDate } from '@/utils';
import { userSearch } from '@/api/user';

const filters: componentData.PropData[] = [
  {
    key: 'status',
    type: TableFilterType.select,
    name: '工单状态',
    selectData: ticketStatus,
  },
  {
    key: 'name',
    type: TableFilterType.str,
    name: '姓名',
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
    name: '工单提交时间范围',
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
    hidden: true,
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

const addPropData: componentData.PropData[] = [
  {
    key: 'status',
    type: TableFilterType.select,
    name: '报修状态',
    selectData: ticketStatus,
    rules: [{ required: true }],
  },
  {
    key: 'name',
    type: TableFilterType.str,
    name: '姓名',
    rules: [{ required: true }],
  },
  {
    key: 'telephone',
    type: TableFilterType.str,
    name: '手机号',
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
    name: '房间号',
    rules: [{ required: true }, { type: 'number' }],
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
    name: '工单ID',
    rules: [{ required: true }],
    hidden: true,
  },
  {
    key: 'status',
    type: TableFilterType.select,
    name: '报修状态',
    selectData: ticketStatus,
    rules: [{ required: true }],
  },
  {
    key: 'name',
    type: TableFilterType.str,
    name: '姓名',
    rules: [{ required: true }],
  },
  {
    key: 'telephone',
    type: TableFilterType.str,
    name: '手机号',
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
    name: '房间号',
    rules: [{ required: true }, { type: 'number' }],
  },
  {
    key: 'comment',
    type: TableFilterType.str,
    name: '备注',
    rules: [{ required: true }],
  },
];

const OperatePropData: componentData.PropData[] = [
  {
    key: 'id',
    type: TableFilterType.number,
    name: '报修ID',
    rules: [{ required: true }],
    hidden: true,
  },
  {
    key: 'status',
    type: TableFilterType.select,
    name: '报修状态',
    selectData: ticketStatus,
    rules: [{ required: true }],
  },
  {
    key: 'comment',
    type: TableFilterType.str,
    name: '备注',
    rules: [{ required: true }],
  },
];

const colums: TableColumnProps<apiInterface.IspTicket>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    fixed: 'left',
  },
  {
    title: '上报人姓名',
    dataIndex: 'name',
    width: 110,
  },
  {
    title: '宿舍楼',
    dataIndex: ['dormBlock', 'string'],
    width: 100,
  },
  {
    title: '工单状态',
    render: (value, record, index) => <TicketStatusComponent ticket={record} />,
    width: 100,
  },
  {
    title: '最后处理人姓名-工号',
    render: (value, record, index) =>
      record.lastOperateLog
        ? goMemberCenterCell(record.lastOperateLog.operator)
        : '无',
    width: 170,
  },
  {
    title: '最后处理时间',
    dataIndex: ['lastOperateLog', 'updateTime'],
    render: (value, record, index) => dateTimeCell([value]),
    width: 160,
  },
];

const onRow: TableProps<apiInterface.IspTicket>['onRow'] = (record) => {
  return {
    onClick: (event) => {
      // TODO: 点击行路由跳转
    }, // 点击行
  };
};

const requestsUndeleted: FC = () => {
  // 表单数据
  const [formData, setFormData] = useState<apiInterface.IspTicketListQuery>({
    page: 1,
    count: 10,
    deleted: false,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.IspTicketListQuery>(
    ispTicketList,
    formData,
  );

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.IspTicketAddData>(
    ispTicketAdd,
    addPropData,
    '新增报修',
    () => apiHooks.setLoading(true),
  );

  const muitActions: componentData.MuitActionProp[] = [
    {
      key: 'delete',
      value: '删除',
      propData: [],
      api: ispTicketDelete,
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
        api: ispTicketEdit,
        propData: EditPropData,
        title: '编辑工单',
        onSubmit: () => apiHooks.setLoading(true),
      },
      apiParamKeys: (record: apiInterface.IspTicket) => ({
        id: record.id,
        status: record.status.id,
        name: record.name,
        telephone: record.telephone,
        dormBlock: record.dormBlock.id,
        dormRoom: record.dormRoom,
        comment: record.comment,
      }),
      type: 'dialog',
    },
    {
      key: 'delete',
      text: '删除',
      icon: <DeleteOutlined />,
      hooks: useApi(ispTicketDelete, undefined, () =>
        apiHooks.setLoading(true),
      ),
      apiParamKeys: (record: apiInterface.IspTicket) => ({
        id: [record.id],
      }),
      type: 'api',
      btnProps: {
        danger: true,
      },
    },
    {
      key: 'operate',
      text: '处理',
      hooks: {
        api: ispTicketOperate,
        propData: OperatePropData,
        title: '处理工单',
        onSubmit: () => apiHooks.setLoading(true),
      },
      apiParamKeys: (record: apiInterface.IspTicket) => ({
        id: record.id,
        status: record.status.id,
        comment: record.comment,
      }),
      type: 'dialog',
    },
  ];

  const expandable: TableProps<apiInterface.IspTicket>['expandable'] = {
    expandedRowRender: (record) => (
      <>
        <Row gutter={16} style={{ alignItems: 'stretch' }}>
          <Col span={8}>
            <Card title="用户信息">
              <Space direction="vertical">
                <Typography.Text>{`姓名：${record.name}`}</Typography.Text>
                <Typography.Text>
                  {'宿舍楼 - 房间号：'}
                  <Typography.Text strong>
                    {`${record.dormBlock.string} - ${record.dormRoom}`}
                  </Typography.Text>
                </Typography.Text>
                <Typography.Text copyable={{ text: record.telephone }}>
                  {`手机号：${record.telephone}`}
                </Typography.Text>
              </Space>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="工单备注">
              <Typography.Paragraph
                ellipsis={{ rows: 5, expandable: true, symbol: 'more' }}
              >
                {record.comment}
              </Typography.Paragraph>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="杂项">
              <Space direction="vertical">
                <Typography.Text>
                  {`创建时间：${formatDate(record.createTime)}`}
                </Typography.Text>
                <Typography.Text>
                  {`更新时间：${formatDate(record.updateTime)}`}
                </Typography.Text>
              </Space>
            </Card>
          </Col>
        </Row>
      </>
    ),
    rowExpandable: (record) => true,
    expandedRowClassName: () => 'expand',
  };

  const { setVisible, Dialog } = useUploadExcelDialog(
    ispTicketBatchAdd,
    '批量添加工单',
  );
  const BatchAddBtn = (
    <Button
      onClick={() => setVisible(true)}
      type="dashed"
      icon={<UploadOutlined />}
    >
      批量添加
    </Button>
  );

  // TODO: 导出excel
  const ExportBtn = (
    <Button onClick={() => {}} type="dashed">
      导出结果为Excel
    </Button>
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
        expandable={expandable}
        onRow={onRow}
        sortList={ispTicketSortableList}
        extraComponent={{ Left: BatchAddBtn, Right: ExportBtn }}
      />
      {Dialog}
    </>
  );
};

export default requestsUndeleted;
