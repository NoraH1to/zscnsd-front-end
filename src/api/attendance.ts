import { EXPORT, GET, POST } from '@/api';
import apiInterface from 'api';

export const attendanceList = (params?: apiInterface.AttendanceListQuery) => {
  return GET('/api/attendance/list', {
    params,
  });
};

export const attendanceSignIn = (data?: apiInterface.AttendanceSignInData) => {
  return POST('/api/attendance/sign-in', {
    data,
    msg: '签到成功',
  });
};

export const attendanceSignOut = (
  data?: apiInterface.AttendanceSignOutData,
) => {
  return POST('/api/attendance/sign-out', {
    data,
    msg: '签退成功',
  });
};

export const attendanceExport = (params?: apiInterface.AttendanceListQuery) => {
  return EXPORT('/api/attendance/export', {
    params,
  });
};
