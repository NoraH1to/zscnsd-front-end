import { GET, POST } from '@/api';
import apiInterface from 'api';

export const memberTimetableList = (
  params?: apiInterface.MemberTimetableListQuery,
) => {
  return GET('/api/member-timetable/list', {
    params,
  });
};

export const memberTimetableAddAdmin = (
  data?: apiInterface.MemberTimetableAddAdminData,
) => {
  return POST('/api/member-timetable/admin-add', {
    data,
  });
};

export const memberTimetableEdit = (
  data?: apiInterface.MemberTimetableEditData,
) => {
  return POST('/api/member-timetable/update', {
    data,
  });
};

export const memberTimetableDelete = (
  data?: apiInterface.MemberTimetableDeleteData,
) => {
  return POST('/api/member-timetable/delete', {
    data,
  });
};
