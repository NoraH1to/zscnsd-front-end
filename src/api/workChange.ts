import { GET, POST } from '@/api';
import apiInterface from 'api';

export const workChangeList = (params?: apiInterface.WorkChangeListQuery) => {
  return GET('/api/work-change/list', {
    params,
  });
};

export const workChangeAdd = (data?: apiInterface.WorkChangeAddData) => {
  return POST('/api/work-change/add', {
    data,
  });
};

export const workChangeEdit = (data?: apiInterface.WorkChangeEditData) => {
  return POST('/api/work-change/update', {
    data,
  });
};

export const workChangeDelete = (data?: apiInterface.WorkChangeDeleteData) => {
  return POST('/api/work-change/delete', {
    data,
  });
};
