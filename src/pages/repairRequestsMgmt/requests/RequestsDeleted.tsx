import { FC, useState } from 'react';
import {
  dormBlocks,
  TableFilterType,
  ticketDeleted,
  ticketSortableList,
  ticketStatus,
} from '@/common';
import { useApi, useInit, useMuitActionDialog } from '@/hooks/index';
import { ticketList, ticketRestore } from '@/api/ticket';
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
} from '@/components/CustomTable';
import componentData from 'typings';
import { userSearch } from '@/api/user';
import { RollbackOutlined } from '@ant-design/icons';
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
    default: 'true',
    rules: [{ required: true }],
    hidden: true,
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
    title: '删除时间',
    dataIndex: 'deleteTime',
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

const requestsDeleted: FC<{ defaultFormData?: any }> = ({
  defaultFormData,
}) => {
  // 表单数据
  const [formData, setFormData] = useState<apiInterface.TicketListQuery>({
    ...defaultFormData,
    page: 1,
    count: 10,
    deleted: true,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.TicketListQuery>(ticketList, formData);

  const muitActions: componentData.MuitActionProp[] = [
    {
      key: 'restore',
      value: '恢复',
      propData: [],
      api: ticketRestore,
    },
  ];

  const apiMuiltActionDialogHooks = useMuitActionDialog(muitActions, () =>
    apiHooks.setLoading(true),
  );

  const actions: componentData.CustomTableAction[] = [
    {
      key: 'restore',
      text: '恢复',
      icon: <RollbackOutlined />,
      hooks: useApi(ticketRestore, undefined, () => apiHooks.setLoading(true)),
      apiParamKeys: (record) => ({
        id: [record.id],
      }),
      type: 'api',
      btnProps: {
        style: {
          color: '#FF9900',
        },
      },
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
      apiMuiltActionDialogHooks={apiMuiltActionDialogHooks}
      actions={actions}
      expandable={expandable}
      onRow={onRow}
      sortList={ticketSortableList}
      extraComponent={{ Right: ExportBtn }}
    />
  );
};

export default requestsDeleted;
