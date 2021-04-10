import { GET, POST } from '@/api';
import apiInterface from 'api';

export const attendanceChangeList = (
  params?: apiInterface.AttendanceChangeListQuery,
) => {
  return GET('/api/attendance-change/list', {
    params,
  });
};

export const attendanceChangeAddAdmin = (
  data?: apiInterface.AttendanceChangeAddAdminData,
) => {
  return POST('/api/attendance-change/admin-add', {
    data,
  });
};

export const attendanceChangeAddUser = (
  data?: apiInterface.AttendanceChangeAddUserData,
) => {
  return POST('/api/attendance-change/user-add', {
    data,
  });
};

export const attendanceChangeEditAdmin = (
  data?: apiInterface.AttendanceChangeEditAdminData,
) => {
  return POST('/api/attendance-change/admin-update', {
    data,
  });
};

export const attendanceChangeEditUser = (
  data?: apiInterface.AttendanceChangeEditUserData,
) => {
  return POST('/api/attendance-change/user-update', {
    data,
  });
};

export const attendanceChangeDelete = (
  data?: apiInterface.AttendanceChangeDeleteData,
) => {
  return POST('/api/attendance-change/delete', {
    data,
  });
};

export const attendanceChangeOperate = (
  data?: apiInterface.AttendanceChangeOperateData,
) => {
  return POST('/api/attendance-change/operate', {
    data,
  });
};

export const attendanceChangeDetail = (
  params?: apiInterface.AttendanceChangeDetailQuery,
) => {
  return GET('/api/attendance-change/detail', {
    params,
  });
};
