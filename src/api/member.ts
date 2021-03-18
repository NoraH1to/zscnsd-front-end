import { GET, POST } from '@/api';
import apiInterface from 'api';

export const memberList = (params?: apiInterface.MemberListQuery) => {
  return GET('/api/member/list', {
    params,
  });
};

export const memberAdd = (data?: apiInterface.MemberAddData) => {
  return POST('/api/member/add', {
    data,
  });
};

export const memberEdit = (data?: apiInterface.MemberEditData) => {
  return POST('/api/member/update', {
    data,
  });
};

export const memberDelete = (data?: apiInterface.MemberDeleteData) => {
  return POST('/api/member/delete', {
    data,
  });
};
