import { GET, POST } from '@/api';
import apiInterface from 'api';

export const attendanceList = (params?: apiInterface.AttendanceListQuery) => {
  return GET('/api/attendance/list', {
    params,
  });
};

export const attendanceSignIn = (data?: apiInterface.AttendanceSignInData) => {
  return POST('/api/attendance/sign-in', {
    data,
  });
};

export const attendanceSignOut = (
  data?: apiInterface.AttendanceSignOutData,
) => {
  return POST('/api/attendance/sign-out', {
    data,
  });
};
