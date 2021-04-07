import { workArrangementTimeTableList } from '@/api/workArrangement';
import { areas, weekDays } from '@/common';
import { useInit } from '@/hooks';
import { dateformatOut } from '@/utils';
import { Table, TableColumnProps } from 'antd';
import apiInterface from 'api';
import moment from 'moment';
import { FC, useState } from 'react';
import update from 'immutability-helper';
import { find, forEachObjIndexed } from 'ramda';

interface colObj {
  area?: apiInterface.Area;
  [index: number]: apiInterface.WorkArrangementTimeTable | undefined;
}

const TimeTable: FC = () => {
  const [
    formData,
    setFormData,
  ] = useState<apiInterface.WorkArrangementTimeTableListQuery>({
    date: moment().format(dateformatOut),
  });
  const { data, loading, setLoading, setParams } = useInit(
    workArrangementTimeTableList,
    formData,
  );

  const dealData = (dataList: apiInterface.WorkArrangementTimeTable[]) => {
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
      const target = find(
        (day) => !day[moment(data.date).weekday()],
        targetArr,
      );
      if (target) {
        target[moment(data.date).weekday()] = data;
      } else {
        // 没有空间就加入新一行填入
        targetArr.push(
          update(dayObject, {
            $merge: { [moment(data.date).weekday()]: data },
          }),
        );
      }
    });

    let result: colObj[] = [];
    forEachObjIndexed((item) => (result = result.concat(item)), tempObj); // 拍平

    return result;
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
    })),
  ];

  return (
    <Table
      dataSource={dealData(data.data)}
      columns={colums}
      bordered
      loading={loading}
      size="middle"
      scroll={{ x: 780 }}
      pagination={false}
    />
  );
};

export default TimeTable;
