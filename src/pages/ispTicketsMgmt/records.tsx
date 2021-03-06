import { FC, useState } from 'react';
import {
  TableFilterType,
  ticketDeleted,
  ticketStatus,
  ispTicketLogSortableList,
} from '@/common';
import { useInit, useRealLocation } from '@/hooks/index';
import { ispTicketLogList } from '@/api/ispTicket';
import {
  TableColumnProps,
  TableProps,
  Row,
  Col,
  Card,
  Space,
  Typography,
} from 'antd';
import apiInterface from 'api';
import CustomTable, {
  dateTimeCell,
  goMemberCenterCell,
  setDefaultDataInFilters,
} from '@/components/CustomTable';
import componentData from 'typings';
import { userSearch } from '@/api/user';
import TicketStatusComponent from '@/components/TicketStatusComp';
import { formatDate } from '@/utils';

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
    width: 80,
    fixed: 'left',
  },
  {
    title: '上报人姓名',
    dataIndex: ['ispTicket', 'name'],
    width: 110,
  },
  {
    title: '宿舍楼',
    dataIndex: ['ispTicket', 'dormBlock', 'string'],
    width: 110,
  },
  {
    title: '工单状态',
    render: (value, record, index) => <TicketStatusComponent ticket={record} />,
    width: 100,
  },
  {
    title: '处理人姓名-工号',
    render: (value, record, index) => goMemberCenterCell(record.operator),
    width: 140,
  },
  {
    title: '处理时间',
    dataIndex: ['createTime'],
    render: (value, record, index) => dateTimeCell([value]),
    width: 160,
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
                {`创建时间：${formatDate(record.createTime)}`}
              </Typography.Text>
              <Typography.Text>
                {`更新时间：${formatDate(record.updateTime)}`}
              </Typography.Text>
              <Typography.Text>
                {`删除时间：${formatDate(record.deleteTime)}`}
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

const Records: FC<{ defaultFormData?: apiInterface.IspTicketLogListQuery }> = ({
  defaultFormData,
}) => {
  // 表单数据
  const [formData, setFormData] = useState<apiInterface.IspTicketLogListQuery>({
    ...defaultFormData,
    page: 1,
    count: 10,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.IspTicketLogListQuery>(
    ispTicketLogList,
    formData,
  );

  return (
    <CustomTable
      formData={formData}
      setFormData={setFormData}
      filters={setDefaultDataInFilters(filters, defaultFormData)}
      colums={colums}
      apiHooks={apiHooks}
      onRow={onRow}
      sortList={ispTicketLogSortableList}
      expandable={expandable}
    />
  );
};

const _records: FC<{
  defaultFormData: apiInterface.IspTicketLogListQuery;
}> = ({ defaultFormData }) => {
  const localtion = useRealLocation();
  const defaultProps = localtion.query;
  return <Records defaultFormData={defaultFormData || defaultProps} />;
};

export default _records;
