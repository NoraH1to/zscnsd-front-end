import { FC, useState } from 'react';
import {
  dormBlocks,
  TableFilterType,
  ticketDeleted,
  ticketSortableList,
  ticketStatus,
} from '@/common';
import { useApi, useInit, useMuitActionDialog } from '@/hooks/index';
import { ticketExport, ticketList, ticketRestore } from '@/api/ticket';
import { Tooltip, TableColumnProps, TableProps, Row, Col, Button } from 'antd';
import apiInterface from 'api';
import CustomTable, {
  dateTimeCell,
  goMemberCenterCell,
} from '@/components/CustomTable';
import componentData from 'typings';
import { userSearch } from '@/api/user';
import { RollbackOutlined } from '@ant-design/icons';
import TicketStatusComponent from '@/components/TicketStatusComp';
import { ticketFaultMenuList } from '@/api/ticketFaultMenu';
import TimeCard from '@/components/TimeCard';
import TicketCommentCard from '@/components/TicketCommentCard';
import UserInfoCard from '@/components/UserInfoCard';
import { fileDownload } from '@/api/file';
import { history } from 'umi';

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
      record.lastOperateLog
        ? goMemberCenterCell(record.lastOperateLog.operator)
        : '无',
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
      history.push({
        pathname: '/d/repair-requests-mgmt/records',
        query: {
          ticketId: record.id.toString(),
        },
      });
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
            <UserInfoCard user={record.user} />
          </Col>
          <Col span={8}>
            <TicketCommentCard ticket={record} />
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

  const {
    loading: exportLoading,
    setLoading: setExportLoading,
    setParams: setExportParams,
  } = useApi(ticketExport, formData, (res: any) => {
    fileDownload(res.data.filePath);
  });
  const ExportBtn = (
    <Button
      loading={exportLoading}
      onClick={() => {
        setExportParams(formData);
        setExportLoading(true);
      }}
      type="dashed"
    >
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
