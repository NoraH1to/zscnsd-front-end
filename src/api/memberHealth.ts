import { GET, POST } from '@/api';
import apiInterface from 'api';

export const memberHealthList = (
  params?: apiInterface.MemberHealthListQuery,
) => {
  return GET('/api/member-health/list', {
    params,
  });
};

export const memberHealthAdd = (data?: apiInterface.MemberHealthAddData) => {
  return POST('/api/member-health/add', {
    data,
  });
};

export const memberHealthEdit = (data?: apiInterface.MemberHealthEditData) => {
  return POST('/api/member-health/update', {
    data,
  });
};

export const memberHealthDelete = (
  data?: apiInterface.MemberHealthDeleteData,
) => {
  return POST('/api/member-health/delete', {
    data,
  });
};
