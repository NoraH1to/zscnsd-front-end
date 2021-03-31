import { FC, useState } from 'react';
import { areas, TableFilterType, weekDays } from '@/common';
import { useCustomForm, useInit } from '@/hooks/index';
import {
  TableColumnProps,
  TableProps,
  Button,
  Table,
  Modal,
  Space,
  Card,
  Typography,
  Pagination,
} from 'antd';
import apiInterface from 'api';
import componentData from 'typings';
import { workArrangementList } from '@/api/workArrangement';
import { find, forEachObjIndexed } from 'ramda';
import './workArrangement.scss';
import BaseTable from '@/components/BaseTable';
import update from 'immutability-helper';
import { memberList } from '@/api/member';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface colObj {
  area?: apiInterface.Area;
  [index: number]: apiInterface.WorkArrangement | undefined;
}

// 拖拽类型
const dragItemTypes = {
  MEMBER: 'member',
};

const MemberCard: FC<{ member: apiInterface.Member }> = ({ member }) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: dragItemTypes.MEMBER,
      item: member,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [member, dragItemTypes.MEMBER],
  );
  return (
    <div ref={drag} role="Box" style={{ opacity }}>
      <Card>
        <Space>
          <Typography.Text>{member.name}</Typography.Text>
          <Typography.Text>{`工号${member.member.workId}`}</Typography.Text>
          <Typography.Text>
            {'每周值班 '}
            <Typography.Link>
              {member?.member?.workArrangement.length || 0}
            </Typography.Link>
            {' 次'}
          </Typography.Text>
        </Space>
      </Card>
    </div>
  );
};

// 用于拖拽的成员列表
const MemberList: FC = () => {
  const [formData, setFormData] = useState<apiInterface.MemberListQuery>({
    page: 1,
    count: 10,
  });
  const { loading, setLoading, data, setParams } = useInit(
    memberList,
    formData,
  );
  return (
    <div className="member-list">
      <Space direction="vertical" align="center">
        {data?.data?.content.map((member: apiInterface.Member) => (
          <MemberCard member={member} />
        ))}
      </Space>
      <Pagination
        {...{
          position: ['bottomCenter'],
          onShowSizeChange: (current, size) => {
            formData.count = size;
            setParams(formData);
            setLoading(true);
          },
          defaultCurrent: 1,
          showSizeChanger: false,
          total: data.data?.totalRecords,
          onChange: (page, pageSize) => {
            formData.page = page;
            setParams(formData);
            setLoading(true);
          },
        }}
      />
    </div>
  );
};

const onRow: TableProps<apiInterface.WorkArrangement>['onRow'] = (record) => {
  return {
    onClick: (event) => {
      // TODO: 点击行路由跳转
    }, // 点击行
  };
};

const colums: TableColumnProps<colObj>[] = [
  {
    title: '宿舍楼栋',
    dataIndex: ['area', 'string'],
    width: 80,
    fixed: 'left',
  },
  ...weekDays.map<TableColumnProps<colObj>>((day, col) => ({
    title: day.string,
    width: 100,
    render: (value, record, index) => {
      return record[day.id]?.user?.name;
    },
    onCell: (record, row) => ({ record, row, col }), // 声明文件的锅，不这样没法传参
  })),
];

const WorkArrangementComp: FC<{ semesterId?: number }> = ({ semesterId }) => {
  // 表单数据
  const [
    formData,
    setFormData,
  ] = useState<apiInterface.WorkArrangementListQuery>({
    semesterId,
  });

  // 排班visible
  const [visible, setVisible] = useState(false);

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
  const {
    loading,
    setLoading,
    data,
    errorData,
  } = useInit<apiInterface.WorkArrangementListQuery>(
    workArrangementList,
    formData,
  );

  // 筛选表单
  const {
    form,
    validatedContainer: { validated },
    validateFields,
  } = useCustomForm(filters, (newFormData) => {
    setFormData(update(formData, { $merge: newFormData }));
  });
  const handleSubmitBtnClick: React.MouseEventHandler<HTMLElement> = async (
    e,
  ) => setLoading(true);

  const SubmitBtn = (
    <Button loading={loading} type="primary" onClick={handleSubmitBtnClick}>
      搜索
    </Button>
  );

  // TODO: 导出excel
  const ExportBtn = (
    <Button onClick={() => {}} type="dashed">
      导出结果为Excel
    </Button>
  );

  // 排班
  const MkWorkArrangementBtn = (
    <Button onClick={() => setVisible(true)} type="primary" ghost>
      排班
    </Button>
  );

  const dealData = (dataList: apiInterface.WorkArrangement[]) => {
    const dayObject: colObj = {};
    weekDays.forEach((day) => (dayObject[day.id] = undefined));

    // tempObj 数据格式
    // {
    //   1: [], 片区1
    //   2: [], 片区2
    //   ...    其余片区
    // }
    if (!dataList) return [];
    const tempObj: { [index: string]: any[] } = {};
    areas.forEach((area) => (tempObj[area.id] = []));
    tempObj.other = [];

    dataList.forEach((data) => {
      // 找到对应片区数据 array
      const targetArr = tempObj[data.area.id] || tempObj.other;
      // 如果没有行，则添加行，并且显示 area
      if (targetArr.length == 0) {
        targetArr.push(update(dayObject, { $merge: { area: data.area } }));
      }
      // 找到空着的格子
      const target = find((day) => !day[data.weekday], targetArr);
      if (target) {
        target[data.weekday] = data;
      } else {
        // 没有空间就加入新一行填入
        targetArr.push(update(dayObject, { $merge: { [data.weekday]: data } }));
      }
    });

    let result: colObj[] = [];
    forEachObjIndexed((item) => (result = result.concat(item)), tempObj); // 拍平
    return result;
  };

  const DropableBodyCell: FC<{
    record: colObj;
    row: number;
    col: number;
    style: any;
    [index: string]: any;
  }> = ({ style, record, row, col, ...restProps }) => {
    const [{ isOver, canDrop }, drop] = useDrop(
      () => ({
        accept: dragItemTypes.MEMBER,
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
        drop: (item: apiInterface.Member) => {
          // TODO: 发送请求
        },
        canDrop: (item: apiInterface.Member) => {
          return !!record && !record[col + 1];
        },
      }),
      [row],
    );

    const isActive = isOver && canDrop;
    let backgroundColor = null;
    if (isActive) {
      backgroundColor = 'rgb(153, 204, 102)';
    } else if (canDrop) {
      backgroundColor = 'rgba(10,120,140, 150)';
    } else if (isOver) {
      backgroundColor = 'rgb(255 0 0 / 55%)';
    }

    return (
      <td ref={drop} style={{ backgroundColor, ...style }} {...restProps} />
    );
  };

  // 表格
  const WorkArrangementTable = (
    <Table
      dataSource={dealData(data.data)}
      columns={colums}
      bordered
      loading={loading}
      size="middle"
      scroll={{ x: 780 }}
      rowKey="id"
      pagination={false}
      components={{
        body: {
          cell: DropableBodyCell,
        },
      }}
    />
  );

  const table = (
    <div className="work-arrangement">
      <BaseTable
        Filter={form}
        FilterBtn={SubmitBtn}
        TableActionLeft={MkWorkArrangementBtn}
        TableActionRight={ExportBtn}
        Table={WorkArrangementTable}
      />
    </div>
  );

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {table}
        <Modal
          title="排班"
          visible={visible}
          onCancel={() => setVisible(false)}
          width="1920"
          destroyOnClose
        >
          <div className="mk-work-flex-container">
            <div className="work-arrangement">
              <BaseTable
                Filter={form}
                FilterBtn={SubmitBtn}
                Table={WorkArrangementTable}
              />
            </div>
            <MemberList />
          </div>
        </Modal>
      </DndProvider>
    </>
  );
};

export default WorkArrangementComp;
