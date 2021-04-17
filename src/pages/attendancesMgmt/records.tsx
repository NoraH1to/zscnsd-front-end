import { FC, useState } from 'react';
import { TableFilterType, areas, attendanceSortableList } from '@/common';
import { useApi, useInit, useRealLocation } from '@/hooks/index';
import { attendanceExport, attendanceList } from '@/api/attendance';
import { Button, TableColumnProps, TableProps } from 'antd';
import apiInterface from 'api';
import CustomTable, {
  dateTimeCell,
  goMemberCenterCell,
  setDefaultDataInFilters,
} from '@/components/CustomTable';
import componentData from 'typings';
import { history } from 'umi';
import { userSearch } from '@/api/user';
import { fileDownload } from '@/api/file';

const filters: componentData.PropData[] = [
  {
    key: 'userId',
    type: TableFilterType.selectSearch,
    name: '成员用户',
    selectData: userSearch,
    holder: '姓名/学号/工号',
    searchOption: {
      keyProp: 'id',
      labelProp: 'name',
    },
  },
  {
    key: 'area',
    type: TableFilterType.select,
    name: '片区',
    selectData: areas,
  },
  {
    key: 'timeRange',
    type: TableFilterType.timeRange,
    name: '签到/签退时间范围',
    timeRange: {
      rangeStartProp: 'start',
      rangeEndProp: 'end',
    },
  },
];

const colums: TableColumnProps<apiInterface.Attendance>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    fixed: 'left',
  },
  {
    title: '成员姓名-工号',
    render: (value, record, index) => goMemberCenterCell(record.user),
    width: 140,
  },
  {
    title: '签到时间',
    dataIndex: ['signInTime'],
    render: (value, record, index) => dateTimeCell([value]),
    width: 160,
  },
  {
    title: '签退时间',
    dataIndex: ['signOutTime'],
    width: 160,
  },
  {
    title: '值班片区',
    dataIndex: ['area', 'string'],
    width: 100,
  },
];

const onRow: TableProps<apiInterface.Attendance>['onRow'] = (record) => {
  return {
    onClick: (event) => {
      history.push({
        pathname: '/d/repair-requests-mgmt/records',
        query: {
          operatorId: record.userId.toString(),
          start: record.signInTime,
          end: record.signOutTime,
        },
      });
    }, // 点击行
  };
};

const Records: FC<{ defaultFormData: apiInterface.AttendanceListQuery }> = ({
  defaultFormData,
}) => {
  // 表单数据
  const [formData, setFormData] = useState<apiInterface.AttendanceListQuery>({
    ...defaultFormData,
    page: 1,
    count: 10,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.AttendanceListQuery>(
    attendanceList,
    formData,
  );

  const {
    loading: exportLoading,
    setLoading: setExportLoading,
    setParams: setExportParams,
  } = useApi(attendanceExport, formData, (res: any) => {
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
      filters={setDefaultDataInFilters(filters, defaultFormData)}
      colums={colums}
      apiHooks={apiHooks}
      onRow={onRow}
      sortList={attendanceSortableList}
      extraComponent={{ Right: ExportBtn }}
    />
  );
};

const _records: FC<{
  defaultFormData: apiInterface.AttendanceListQuery;
}> = ({ defaultFormData }) => {
  const localtion = useRealLocation();
  const defaultProps = localtion.query;
  return <Records defaultFormData={defaultFormData || defaultProps} />;
};

export default _records;
