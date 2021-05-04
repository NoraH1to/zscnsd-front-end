import { FC, useEffect, useState } from 'react';
import { areas, TableFilterType, weekDays } from '@/common';
import { useApi, useCustomForm, useInit } from '@/hooks/index';
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
  Tooltip,
} from 'antd';
import apiInterface, { MemberTimetable } from 'api';
import componentData from 'typings';
import {
  workArrangementExport,
  workArrangementList,
  workArrangementUpdate,
} from '@/api/workArrangement';
import { find, forEachObjIndexed, mapObjIndexed } from 'ramda';
import './workArrangement.scss';
import BaseTable from '@/components/BaseTable';
import update from 'immutability-helper';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { memberTimetableList } from '@/api/memberTimetable';
import { confirmDialog } from '@/utils';
import { toast } from 'react-toastify';
import { fileDownload } from '@/api/file';

interface colObj {
  area?: apiInterface.Area;
  [index: number]: apiInterface.WorkArrangement | undefined;
}

// 拖拽类型
const dragItemTypes = {
  TIMETABLE: 'timetable',
};

const MemberCard: FC<{ timeTable: apiInterface.MemberTimetable }> = ({
  timeTable,
}) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: dragItemTypes.TIMETABLE,
      item: timeTable,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [timeTable, dragItemTypes.TIMETABLE],
  );
  const { user: member } = timeTable;
  return (
    <div ref={drag} role="Box" style={{ opacity }}>
      <Card>
        <Space>
          <Typography.Text>{member.name}</Typography.Text>
          <Typography.Text>{`工号${member.member?.workId}`}</Typography.Text>
        </Space>
      </Card>
    </div>
  );
};

// 用于拖拽的成员列表
const MemberList: FC<{
  semesterId: MemberTimetable['semesterId'];
  loadingFlag?: boolean;
}> = ({ semesterId, loadingFlag }) => {
  const [
    formData,
    setFormData,
  ] = useState<apiInterface.MemberTimetableListQuery>({
    page: 1,
    count: 10,
    semesterId,
    status: 1,
  });
  const { loading, setLoading, data, setParams } = useInit(
    memberTimetableList,
    formData,
  );
  useEffect(() => {
    setParams(formData);
    setLoading(true);
  }, [loadingFlag]);
  return (
    <div className="member-list">
      <Space
        direction="vertical"
        align="center"
        style={{ alignItems: 'stretch' }}
      >
        {data?.data?.content.map((timeTable: apiInterface.MemberTimetable) => (
          <MemberCard key={timeTable.id} timeTable={timeTable} />
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

const WorkArrangementComp: FC<{ semesterId?: number }> = ({ semesterId }) => {
  semesterId = semesterId && parseInt(semesterId.toString());
  // 表单数据
  const [
    formData,
    setFormData,
  ] = useState<apiInterface.WorkArrangementListQuery>({
    semesterId,
  });

  // 缓存当前数据的请求表单
  const [
    currentFormData,
    setCurrentFormData,
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
      hidden: true,
    },
  ];

  // api hooks
  const {
    loading,
    setLoading,
    data,
    setParams,
    errorData,
  } = useInit<apiInterface.WorkArrangementListQuery>(
    workArrangementList,
    formData,
  );

  // 用于驱动右侧成员列表更新（很暴力，可以优化，但没必要）
  const [
    memberTimetableListLoadingFlag,
    setMemberTimetableListLoadingFlag,
  ] = useState(false);

  const handleSubmitBtnClick = async (
    e?: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    setCurrentFormData(formData);
    setParams(formData);
    setLoading(true);
  };

  // 排班 api
  const {
    loading: makeWorkLoading,
    setLoading: setMakeWorkLoading,
    data: makeWorkData,
    setParams: setMakeWorkParams,
  } = useApi(workArrangementUpdate, undefined, () => {
    handleSubmitBtnClick();
    setMemberTimetableListLoadingFlag(!memberTimetableListLoadingFlag);
  });

  // 筛选表单
  const {
    form,
    validatedContainer: { validated },
    validateFields,
  } = useCustomForm(filters, (newFormData) => {
    setFormData(update(formData, { $merge: newFormData }));
  });

  const SubmitBtn = (
    <Button
      loading={loading}
      type="primary"
      onClick={(e) => handleSubmitBtnClick(e)}
    >
      刷新
    </Button>
  );

  const {
    loading: exportLoading,
    setLoading: setExportLoading,
    setParams: setExportParams,
  } = useApi(workArrangementExport, formData, (res: any) => {
    fileDownload(res.data.filePath);
  });
  // const ExportBtn = (
  //   <Button
  //     style={{ marginRight: '12px' }}
  //     loading={exportLoading}
  //     onClick={() => {
  //       setExportParams(formData);
  //       setExportLoading(true);
  //     }}
  //     type="dashed"
  //   >
  //     导出结果为Excel
  //   </Button>
  // );
  const ExportBtn = null;

  // 排班
  const MkWorkArrangementBtn = (
    <Button onClick={() => setVisible(true)} type="primary" ghost>
      排班
    </Button>
  );

  const columns: TableColumnProps<colObj>[] = [
    {
      title: '宿舍楼栋',
      dataIndex: ['area', 'string'],
      width: 80,
      fixed: 'left',
      onCell: (record, row) => ({
        record,
      }), // 报错是声明文件的锅，不这样没法传参
    },
    ...weekDays.map<TableColumnProps<colObj>>((day, col) => ({
      title: day.string,
      width: 100,
      ellipsis: {
        showTitle: false,
      },
      render: (value, record, index) => (
        <Tooltip
          placement="topLeft"
          title={!!record[day.id]?.user ? '点击撤销排班' : undefined}
        >
          <span
            style={{
              cursor: !!record[day.id]?.user ? 'pointer' : 'default',
            }}
          >
            {record[day.id]?.user?.name}
          </span>
        </Tooltip>
      ),
      onCell: (record, row) => ({
        record,
        row,
        col,
        semesterId,
        _onDrop: (
          timeTable: apiInterface.MemberTimetable,
          row: number,
          col: number,
          area?: apiInterface.Area,
        ) => {
          setMakeWorkParams({
            userId: timeTable.user['id'],
            semesterId: currentFormData.semesterId || 0,
            weekday: col + 1,
            area: area?.id || 0,
            cancel: false,
          });
          setMakeWorkLoading(true);
        },
      }), // 报错是声明文件的锅，不这样没法传参
    })),
  ];

  const dealData = (
    dataList: apiInterface.WorkArrangement[],
    needAddLine = true,
  ) => {
    const dayObject: colObj = {};
    weekDays.forEach((day) => (dayObject[day.id] = undefined));
    let _areas = areas.concat([]);

    // tempObj 数据格式
    // {
    //   1: [], 片区1
    //   2: [], 片区2
    //   ...    其余片区
    // }
    if (!dataList) return [];
    const tempObj: { [index: string]: any[] } = {};
    _areas.forEach((area) => (tempObj[area.id] = []));

    dataList.forEach((data) => {
      // 找到对应片区数据 array
      if (!tempObj[data.area.id]) {
        tempObj[data.area.id] = [];
        _areas.push(data.area);
      }
      const targetArr = tempObj[data.area.id];
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
    forEachObjIndexed((item, index) => {
      const target = item;
      // 没人值班也要显示出来
      if (target.length == 0) {
        target.push(
          update(dayObject, {
            $set: {
              area: find((_area) => _area.id == index, _areas),
            },
          }),
        );
      }
      // 加多一行以可以排班
      needAddLine &&
        target.push(
          update(
            { area: { id: target[0].area.id, string: '' } },
            { $merge: dayObject },
          ),
        );
      result = result.concat(target);
    }, tempObj); // 拍平
    return result;
  };

  const DropableBodyCell: FC<{
    record: colObj;
    row: number;
    col: number;
    style: any;
    semesterId: number;
    _onDrop: (
      timeTable: apiInterface.MemberTimetable,
      row: number,
      col: number,
      area?: apiInterface.Area,
    ) => {};
    [index: string]: any;
  }> = ({ style, record, row, col, _onDrop, ...restProps }) => {
    const [{ isOver, canDrop }, drop] = useDrop(
      () => ({
        accept: dragItemTypes.TIMETABLE,
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
        drop: (timeTable: apiInterface.MemberTimetable) => {
          _onDrop(timeTable, row, col, record.area);
        },
        canDrop: (timeTable: apiInterface.MemberTimetable) => {
          return (
            !!record &&
            !record[col + 1] &&
            !!find((day) => day == col + 1, timeTable.availableWeekday)
          );
        },
      }),
      [row],
    );

    const isActive = isOver && canDrop;
    let backgroundColor = record?.area?.string && '#fafafa';
    if (isActive) {
      backgroundColor = 'rgb(153, 204, 102)';
    } else if (canDrop) {
      backgroundColor = 'rgba(10,120,140, 150)';
    } else if (isOver) {
      backgroundColor = 'rgb(255 0 0 / 55%)';
    }

    // 撤销排班
    const cancelArrangement = () => {
      if (!col) return;
      const target = record[col + 1];
      if (target?.user && semesterId) {
        confirmDialog({
          actionText: '撤销排班',
          onOk: () => {
            if (target?.user && semesterId) {
              setMakeWorkParams({
                userId: target.user.id,
                semesterId,
                weekday: target.weekday,
                area: target.area.id,
                cancel: true,
              });
              setMakeWorkLoading(true);
            }
          },
        });
      }
    };

    return (
      <td
        key={`${row}-${col}`}
        ref={drop}
        style={{ backgroundColor, ...style }}
        {...restProps}
        onClick={() => cancelArrangement()}
      />
    );
  };

  // 表格
  const WorkArrangementTable = (
    <Table
      dataSource={dealData(data.data)}
      columns={columns}
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
        TableActionLeft={MkWorkArrangementBtn}
        TableActionRight={[ExportBtn, SubmitBtn]}
        Table={WorkArrangementTable}
        hideLine={true}
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
          footer={null}
        >
          <div className="mk-work-flex-container">
            <div className="work-arrangement">
              <BaseTable
                Table={WorkArrangementTable}
                Filter={form}
                TableActionRight={[ExportBtn, SubmitBtn]}
                hideLine={true}
              />
            </div>
            <MemberList
              semesterId={semesterId || 0}
              loadingFlag={memberTimetableListLoadingFlag}
            />
          </div>
        </Modal>
      </DndProvider>
    </>
  );
};

export default WorkArrangementComp;
