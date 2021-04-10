import { FC, useState } from 'react';
import {
  dormBlocks,
  TableFilterType,
  ticketDeleted,
  ispTicketSortableList,
  ticketStatus,
} from '@/common';
import { useApi, useInit, useMuitActionDialog } from '@/hooks/index';
import { ispTicketList, ispTicketRestore } from '@/api/ispTicket';
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
import { RollbackOutlined } from '@ant-design/icons';
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
    default: 'true',
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
    width: 110,
  },
  {
    title: '工单状态',
    render: (value, record, index) => <TicketStatusComponent ticket={record} />,
    width: 100,
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

const onRow: TableProps<apiInterface.IspTicket>['onRow'] = (record) => {
  return {
    onClick: (event) => {
      // TODO: 点击行路由跳转
    }, // 点击行
  };
};

const requestsDeleted: FC = () => {
  // 表单数据
  const [formData, setFormData] = useState<apiInterface.IspTicketListQuery>({
    page: 1,
    count: 10,
    deleted: true,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.IspTicketListQuery>(
    ispTicketList,
    formData,
  );

  const muitActions: componentData.MuitActionProp[] = [
    {
      key: 'restore',
      value: '恢复',
      propData: [],
      api: ispTicketRestore,
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
      hooks: useApi(ispTicketRestore, undefined, () =>
        apiHooks.setLoading(true),
      ),
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
      sortList={ispTicketSortableList}
      extraComponent={{ Right: ExportBtn }}
    />
  );
};

export default requestsDeleted;
