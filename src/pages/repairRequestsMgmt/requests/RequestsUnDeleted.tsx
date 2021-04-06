import { FC, useState } from 'react';
import {
  dormBlocks,
  TableFilterType,
  ticketDeleted,
  ticketSortableList,
  ticketStatus,
} from '@/common';
import {
  useApi,
  useDialogForm,
  useInit,
  useMuitActionDialog,
} from '@/hooks/index';
import {
  ticketAdd,
  ticketDelete,
  ticketEdit,
  ticketList,
  ticketOperate,
} from '@/api/ticket';
import {
  Tooltip,
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
  setDefaultDataInFilters,
} from '@/components/CustomTable';
import componentData from 'typings';
import { userSearch } from '@/api/user';
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import TicketStatusComponent from '@/components/ticketStatus';
import { ticketFaultMenuList } from '@/api/ticketFaultMenu';
import TimeCard from '@/components/timeCard';

const filters: componentData.PropData[] = [
  {
    key: 'userId',
    type: TableFilterType.selectSearch,
    name: '报修用户',
    selectData: userSearch,
    holder: '姓名/学号/工号',
    searchOption: {
      keyProp: 'id',
      labelProp: 'name',
    },
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
    selectData: ticketFaultMenuList,
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
    selectData: ticketFaultMenuList,
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
    key: 'faultTypeId',
    type: TableFilterType.select,
    name: '报修故障类型',
    selectData: ticketFaultMenuList,
    rules: [{ required: true }],
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

const colums: TableColumnProps<apiInterface.Ticket>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    fixed: 'left',
  },
  {
    title: '宿舍楼',
    dataIndex: ['user', 'dormBlock', 'string'],
    width: 110,
  },
  {
    title: '报修状态',
    render: (value, record, index) => <TicketStatusComponent ticket={record} />,
    width: 100,
  },
  {
    title: '报修错误类型',
    dataIndex: ['faultType', 'content'],
    width: 120,
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
    render: (value, record, index) =>
      goMemberCenterCell(record.lastOperateLog.operator),
    width: 170,
  },
  {
    title: '最后处理时间',
    dataIndex: ['lastOperateLog', 'updateTime'],
    render: (value, record, index) => dateTimeCell([value]),
    width: 160,
  },
];

const onRow: TableProps<apiInterface.Ticket>['onRow'] = (record) => {
  return {
    onClick: (event) => {
      // TODO: 点击行路由跳转
    }, // 点击行
  };
};

const requestsUndeleted: FC<{
  defaultFormData?: any;
}> = ({ defaultFormData }) => {
  console.log(defaultFormData);
  // 表单数据
  const [formData, setFormData] = useState<apiInterface.TicketListQuery>({
    ...defaultFormData,
    page: 1,
    count: 10,
    deleted: false,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.TicketListQuery>(ticketList, formData);

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.TicketAddData>(
    ticketAdd,
    addPropData,
    '新增报修',
    () => apiHooks.setLoading(true),
  );

  const muitActions: componentData.MuitActionProp[] = [
    {
      key: 'delete',
      value: '删除',
      propData: [],
      api: ticketDelete,
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
        api: ticketEdit,
        propData: EditPropData,
        title: '编辑报修',
        onSubmit: () => apiHooks.setLoading(true),
      },
      apiParamKeys: (record) => ({
        id: record.id,
        userId: record.userId,
        status: record.status.id,
        faultTypeId: record.faultType.id,
        comment: record.comment,
      }),
      type: 'dialog',
    },
    {
      key: 'delete',
      text: '删除',
      icon: <DeleteOutlined />,
      hooks: useApi(ticketDelete, undefined, () => apiHooks.setLoading(true)),
      apiParamKeys: (record) => ({
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
        api: ticketOperate,
        propData: OperatePropData,
        title: '处理报修',
        onSubmit: () => apiHooks.setLoading(true),
      },
      apiParamKeys: (record) => ({
        id: record.id,
        status: record.status.id,
        comment: record.comment,
      }),
      type: 'dialog',
    },
  ];

  const expandable: TableProps<apiInterface.Ticket>['expandable'] = {
    expandedRowRender: (record) => (
      <>
        <Row gutter={16} style={{ alignItems: 'stretch' }}>
          <Col span={8}>
            <Card title="报修用户信息">
              <Space direction="vertical">
                <Typography.Text>{`姓名：${record.user.name}`}</Typography.Text>
                <Typography.Text>
                  {'宿舍楼 - 房间号：'}
                  <Typography.Text strong>
                    {`${record.user.dormBlock.string} - ${record.user.dormRoom}`}
                  </Typography.Text>
                </Typography.Text>
                <Typography.Text>
                  {'运营商：'}
                  <Typography.Text strong>
                    {record.user.isp.string}
                  </Typography.Text>
                </Typography.Text>
                <Typography.Text
                  copyable={{ text: record.user.networkAccount }}
                >
                  {`宽带账号：${record.user.networkAccount}`}
                </Typography.Text>
                <Typography.Text copyable={{ text: record.user.telephone }}>
                  {`手机号：${record.user.telephone}`}
                </Typography.Text>
              </Space>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="报修备注">
              <Typography.Paragraph
                ellipsis={{ rows: 5, expandable: true, symbol: 'more' }}
              >
                {record.comment}
              </Typography.Paragraph>
            </Card>
          </Col>
          <Col span={8}>
            <TimeCard data={record} />
          </Col>
        </Row>
      </>
    ),
    rowExpandable: (record) => true,
    expandedRowClassName: () => 'expand',
  };

  // TODO: 批量添加报修
  const BatchAddBtn = (
    <Button onClick={() => {}} type="dashed" icon={<UploadOutlined />}>
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
    <CustomTable
      formData={formData}
      setFormData={setFormData}
      filters={setDefaultDataInFilters(filters, defaultFormData)}
      colums={colums}
      apiHooks={apiHooks}
      apiAddHooks={apiAddHooks}
      apiMuiltActionDialogHooks={apiMuiltActionDialogHooks}
      actions={actions}
      expandable={expandable}
      onRow={onRow}
      sortList={ticketSortableList}
      extraComponent={{ Left: BatchAddBtn, Right: ExportBtn }}
    />
  );
};

export default requestsUndeleted;
