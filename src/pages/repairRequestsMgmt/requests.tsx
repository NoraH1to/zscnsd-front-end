import { FC, useState } from 'react';
import './requests.scss';
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
  ticketFaultMenu,
  ticketList,
  ticketOperate,
} from '@/api/ticket';
import {
  Tooltip,
  TableColumnProps,
  Badge,
  TableProps,
  Row,
  Col,
  Card,
  Space,
  Typography,
  Button,
} from 'antd';
import apiInterface from 'api';
import { find, propEq } from 'ramda';
import CustomTable, { getRouteCell } from '@/components/CustomTable';
import componentData from 'typings';
import { useHistory } from '@umijs/runtime';
import { userSearch } from '@/api/user';
import { UploadOutlined } from '@ant-design/icons';

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

const onRow: TableProps<apiInterface.Ticket>['onRow'] = (record) => {
  return {
    onClick: (event) => {
      // TODO: 点击行路由跳转
    }, // 点击行
  };
};

const requests: FC = () => {
  // 表单数据
  const [formData, setFormData] = useState<apiInterface.TicketListQuery>({
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

  // 修改接口 hooks
  const apiEditHooks = useDialogForm<apiInterface.TicketEditData>(
    ticketEdit,
    EditPropData,
    '修改报修',
    () => apiHooks.setLoading(true),
  );

  // 删除接口 hooks
  const apiDeleteHooks = useApi<apiInterface.TicketDeleteData>(
    ticketDelete,
    undefined,
    () => apiHooks.setLoading(true),
  );

  const muitActions: componentData.MuitActionProp[] = [
    {
      key: 'delete',
      value: '删除',
      propData: [],
      api: ticketDelete,
    },
    // {
    //   key: 'test',
    //   value: '测试',
    //   propData: [{ name: '测试', key: 'test', type: TableFilterType.str }],
    //   api: ticketDelete,
    // },
  ];

  const apiMuiltActionDialogHooks = useMuitActionDialog(muitActions, () =>
    apiHooks.setLoading(true),
  );

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
      width: 80,
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
      width: 80,
    },
    {
      title: '报修错误类型',
      dataIndex: ['faultType', 'content'],
      width: 80,
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
      render: getRouteCell<apiInterface.Ticket>(
        (record) =>
          `${record.lastOperateLog.operator.name}-${
            record.lastOperateLog.operator.member?.workId || '已退出'
          }`,
        (record) => '/d/repair-requests-mgmt/records', // TODO: 路由跳转
        useHistory(),
      ),
      width: 100,
    },
    {
      title: '最后处理时间',
      dataIndex: ['lastOperateLog', 'updateTime'],
      width: 100,
    },
  ];

  const otherActions: componentData.CustomTableOtherAction[] = [
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
    // {
    //   key: 'test',
    //   text: '测试',
    //   hooks: useApi(ticketDelete, undefined, () => apiHooks.setLoading(true)),
    //   apiParamKeys: (record) => ({
    //     id: [record.id],
    //   }),
    //   type: 'api',
    // },
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
            <Card title="杂项">
              <Space direction="vertical">
                <Typography.Text>
                  {`创建时间：${record.createTime}`}
                </Typography.Text>
                <Typography.Text>
                  {`更新时间：${record.updateTime}`}
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
      filters={filters}
      colums={colums}
      apiHooks={apiHooks}
      apiAddHooks={apiAddHooks}
      apiDeleteHooks={apiDeleteHooks}
      apiEditHooks={apiEditHooks}
      apiMuiltActionDialogHooks={apiMuiltActionDialogHooks}
      editData={(record: apiInterface.Ticket): apiInterface.TicketEditData => ({
        id: record.id,
        userId: record.userId,
        status: record.status.id,
        faultTypeId: record.faultTypeId,
        comment: record.comment,
      })}
      deleteData={(
        record: apiInterface.Ticket,
      ): apiInterface.TicketDeleteData => ({
        id: [record.id],
      })}
      otherActions={otherActions}
      expandable={expandable}
      onRow={onRow}
      sortList={ticketSortableList}
      extraComponent={{ Left: BatchAddBtn, Right: ExportBtn }}
    />
  );
};

export default requests;
