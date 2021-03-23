import { GET, POST } from '@/api';
import apiInterface from 'api';

export const attendanceList = (params?: apiInterface.AttendanceListQuery) => {
  return GET('/api/attendance/list', {
    params,
  });
};

// export const ispTicketAdd = (data?: apiInterface.TicketAddData) => {
//   return POST('/api/attendance/add', {
//     data,
//   });
// };
