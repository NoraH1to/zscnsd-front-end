import { attendanceChangeStatus } from '@/common';
import apiInterface from 'api';
import { find, propEq } from 'ramda';
import { FC } from 'react';
import { Badge } from 'antd';

const AttendanceChangeStatusComponent: FC<{
  attendanceChange: apiInterface.AttendanceChange;
}> = ({ attendanceChange }) => {
  const status =
    find<apiInterface.TicketStatusExtra>(
      propEq('id', attendanceChange.status.id),
    )(attendanceChangeStatus)?.status || 'default';
  const text = attendanceChange.status.string;
  return <Badge status={status} text={text} />;
};

export default AttendanceChangeStatusComponent;
