import { FC, useState } from 'react';
import { TableFilterType, weekDays } from '@/common';
import { useInit } from '@/hooks/index';
import { TableColumnProps, TableProps, Button, Col, Row } from 'antd';
import apiInterface from 'api';
import CustomTable, { goMemberCenterCell } from '@/components/CustomTable';
import componentData from 'typings';
import { workArrangementList } from '@/api/workArrangement';
import { find } from 'ramda';
import TimeCard from '@/components/timeCard';

const onRow: TableProps<apiInterface.WorkArrangement>['onRow'] = (record) => {
  return {
    onClick: (event) => {
      // TODO: 点击行路由跳转
    }, // 点击行
  };
};

const colums: TableColumnProps<apiInterface.WorkArrangement>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    fixed: 'left',
  },
  {
    title: '值班人姓名-工号',
    dataIndex: 'content',
    render: (value, record, index) => goMemberCenterCell(record.user),
    width: 140,
  },
  {
    title: '值班日',
    dataIndex: 'weekday',
    render: (value, record, index) =>
      find((weekday) => weekday.id == record.weekday, weekDays)?.string,
    width: 90,
  },
  {
    title: '值班片区',
    dataIndex: ['area', 'string'],
    width: 120,
  },
  {
    title: '值班学期ID',
    dataIndex: 'semesterId',
    width: 80,
  },
];

const WorkArrangementComp: FC<{ semesterId?: number }> = ({ semesterId }) => {
  // 表单数据
  const [
    formData,
    setFormData,
  ] = useState<apiInterface.WorkArrangementListQuery>({
    semesterId,
  });

  const filters: componentData.PropData[] = [
    {
      key: 'semesterId',
      type: TableFilterType.number,
      name: '学期ID',
      holder: '默认当前学期',
      default: semesterId,
    },
  ];

  // api hooks
  const apiHooks = useInit<apiInterface.WorkArrangementListQuery>(
    workArrangementList,
    formData,
  );

  // TODO: 导出excel
  const ExportBtn = (
    <Button onClick={() => {}} type="dashed">
      导出结果为Excel
    </Button>
  );

  // 排班
  const MkWorkArrangementBtn = (
    <Button onClick={() => {}} type="primary" ghost>
      排班
    </Button>
  );

  const expandable: TableProps<apiInterface.WorkArrangement>['expandable'] = {
    expandedRowRender: (record) => (
      <>
        <Row gutter={16} style={{ alignItems: 'stretch' }}>
          <Col span={8}>
            <TimeCard data={record} />
          </Col>
        </Row>
      </>
    ),
    rowExpandable: (record) => true,
    expandedRowClassName: () => 'expand',
  };

  return (
    <>
      <CustomTable
        formData={formData}
        setFormData={setFormData}
        filters={filters}
        colums={colums}
        apiHooks={apiHooks}
        onRow={onRow}
        expandable={expandable}
        tableProps={{ pagination: false }}
        extraComponent={{ Right: ExportBtn, Left: MkWorkArrangementBtn }}
      />
    </>
  );
};

export default WorkArrangementComp;
