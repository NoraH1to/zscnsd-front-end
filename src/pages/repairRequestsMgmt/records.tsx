import { FC, useState } from 'react';
import {
  dormBlocks,
  TableFilterType,
  ticketDeleted,
  ticketStatus,
  ticketLogSortableList,
} from '@/common';
import { useInit } from '@/hooks/index';
import { ticketFaultMenu, ticketLogList } from '@/api/ticket';
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
} from 'antd';
import apiInterface from 'api';
import { find, propEq } from 'ramda';
import CustomTable, { getRouteCell } from '@/components/CustomTable';
import componentData from 'typings';
import { userSearch } from '@/api/user';

const filters: componentData.PropData[] = [
  {
    key: 'ticketId',
    type: TableFilterType.number,
    name: '报修ID',
  },
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
  {
    key: 'timeRange',
    type: TableFilterType.timeRange,
    name: '处理时间范围',
    timeRange: {
      rangeStartProp: 'start',
      rangeEndProp: 'end',
    },
  },
  {
    key: 'deleted',
    type: TableFilterType.select,
    name: '报修已删除',
    selectData: ticketDeleted,
  },
];

const colums: TableColumnProps<apiInterface.TicketLog>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 30,
    fixed: 'left',
  },
  {
    title: '报修错误类型',
    dataIndex: ['ticket', 'faultType', 'content'],
    width: 50,
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
    title: '报修状态',
    render: (value, record, index) => {
      const status =
        find<apiInterface.TicketStatus>(propEq('id', record.status.id))(
          ticketStatus,
        )?.status || 'default';
      const text = record.status.string;
      return <Badge status={status} text={text} />;
    },
    width: 50,
  },
  {
    title: '处理人姓名-工号',
    render: getRouteCell<apiInterface.TicketLog>(
      (record) =>
        `${record.operator.name}-${record.operator.member?.workId || '已退出'}`,
      (record) => '/d/repair-requests-mgmt/records', // TODO 路由跳转
    ),
    width: 60,
  },
  {
    title: '处理时间',
    dataIndex: ['createTime'],
    width: 60,
  },
];

const onRow: TableProps<apiInterface.TicketLog>['onRow'] = (record) => {
  return {
    onClick: (event) => {
      // TODO: 点击行路由跳转
    }, // 点击行
  };
};

const expandable: TableProps<apiInterface.TicketLog>['expandable'] = {
  expandedRowRender: (record) => (
    <>
      <Row gutter={16} style={{ alignItems: 'stretch' }}>
        <Col span={8}>
          <Card title="报修用户信息">
            <Space direction="vertical">
              <Typography.Text>{`姓名：${record.ticket.user.name}`}</Typography.Text>
              <Typography.Text>
                {'宿舍楼 - 房间号：'}
                <Typography.Text strong>
                  {`${record.ticket.user.dormBlock.string} - ${record.ticket.user.dormRoom}`}
                </Typography.Text>
              </Typography.Text>
              <Typography.Text>
                {'运营商：'}
                <Typography.Text strong>
                  {record.ticket.user.isp.string}
                </Typography.Text>
              </Typography.Text>
              <Typography.Text
                copyable={{ text: record.ticket.user.networkAccount }}
              >
                {`宽带账号：${record.ticket.user.networkAccount}`}
              </Typography.Text>
              <Typography.Text
                copyable={{ text: record.ticket.user.telephone }}
              >
                {`手机号：${record.ticket.user.telephone}`}
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
      </Row>
    </>
  ),
  rowExpandable: (record) => true,
  expandedRowClassName: () => 'expand',
};

const records: FC = () => {
  // 表单数据
  const [formData, setFormData] = useState<apiInterface.TicketLogListQuery>({
    page: 1,
    count: 10,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.TicketLogListQuery>(
    ticketLogList,
    formData,
  );

  return (
    <CustomTable
      formData={formData}
      setFormData={setFormData}
      filters={filters}
      colums={colums}
      apiHooks={apiHooks}
      onRow={onRow}
      sortList={ticketLogSortableList}
      expandable={expandable}
    />
  );
};

export default records;
