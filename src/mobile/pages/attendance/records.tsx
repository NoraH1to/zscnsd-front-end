import { userSearch } from '@/api/user';
import { areas, attendanceSortableList, TableFilterType } from '@/common';
import { useInit, useRealLocation } from '@/hooks';
import CustomList from '@/mobile/components/CustomList';
import PageContainer from '@/mobile/components/PageContainer';
import apiInterface from 'api';
import { FC, useState } from 'react';
import AttendanceRecordInfoCard from '@/mobile/components/AttendanceRecordInfoCard';
import { attendanceList } from '@/api/attendance';

const filters: componentData.PropData[] = [
  {
    key: 'area',
    type: TableFilterType.select,
    name: '片区',
    selectData: areas,
  },
  {
    key: 'start',
    name: '开始时间',
    type: TableFilterType.timeWithoutTime,
  },
  {
    key: 'end',
    name: '结束时间',
    type: TableFilterType.timeWithoutTime,
  },
];

const records: FC = () => {
  // 表单数据
  const [formData, setFormData] = useState<apiInterface.AttendanceListQuery>({
    page: 1,
    count: 10,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.AttendanceListQuery>(
    attendanceList,
    formData,
  );

  return (
    <PageContainer title="考勤记录">
      <CustomList
        formData={formData}
        setFormData={setFormData}
        filters={filters}
        apiHooks={apiHooks}
        sortList={attendanceSortableList}
        DataComp={AttendanceRecordInfoCard}
      />
    </PageContainer>
  );
};

export default records;
