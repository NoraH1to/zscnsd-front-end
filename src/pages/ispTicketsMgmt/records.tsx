import { FC, useState } from 'react';
import {
  dormBlocks,
  TableFilterType,
  ticketDeleted,
  ticketStatus,
  ispTicketLogSortableList,
} from '@/common';
import { useInit } from '@/hooks/index';
import { ispTicketLogList } from '@/api/ispTicket';
import {
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
    name: 'ID',
  },
  {
    key: 'status',
    type: TableFilterType.select,
    name: '工单状态',
    selectData: ticketStatus,
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
    name: '工单已删除',
    selectData: ticketDeleted,
  },
];

const colums: TableColumnProps<apiInterface.IspTicketLog>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 30,
    fixed: 'left',
  },
  {
    title: '上报人姓名',
    dataIndex: ['ispTicket', 'name'],
    width: 70,
  },
  {
    title: '宿舍楼',
    dataIndex: ['ispTicket', 'dormBlock', 'string'],
    width: 80,
  },
  {
    title: '工单状态',
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
    render: getRouteCell<apiInterface.IspTicketLog>(
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

const onRow: TableProps<apiInterface.IspTicketLog>['onRow'] = (record) => {
  return {
    onClick: (event) => {
      // TODO: 点击行路由跳转
    }, // 点击行
  };
};

const expandable: TableProps<apiInterface.IspTicketLog>['expandable'] = {
  expandedRowRender: (record) => (
    <>
      <Row gutter={16} style={{ alignItems: 'stretch' }}>
        <Col span={8}>
          <Card title="用户信息">
            <Space direction="vertical">
              <Typography.Text>{`姓名：${record.ispTicket.name}`}</Typography.Text>
              <Typography.Text>
                {'宿舍楼 - 房间号：'}
                <Typography.Text strong>
                  {`${record.ispTicket.dormBlock.string} - ${record.ispTicket.dormRoom}`}
                </Typography.Text>
              </Typography.Text>
              <Typography.Text copyable={{ text: record.ispTicket.telephone }}>
                {`手机号：${record.ispTicket.telephone}`}
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
                {`创建时间：${record.createTime}`}
              </Typography.Text>
              <Typography.Text>
                {`更新时间：${record.updateTime}`}
              </Typography.Text>
              <Typography.Text>
                {`删除时间：${record.deleteTime}`}
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

const records: FC = () => {
  // 表单数据
  const [formData, setFormData] = useState<apiInterface.TicketLogListQuery>({
    page: 1,
    count: 10,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.TicketLogListQuery>(
    ispTicketLogList,
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
      sortList={ispTicketLogSortableList}
      expandable={expandable}
    />
  );
};

export default records;
