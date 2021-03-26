import { GET, POST } from '@/api';
import apiInterface from 'api';

export const workSemesterList = (
  params?: apiInterface.WorkSemesterListQuery,
) => {
  return GET('/api/work-semester/list', {
    params,
  });
};

export const workSemesterAdd = (data?: apiInterface.WorkSemesterAddData) => {
  return POST('/api/work-semester/add', {
    data,
  });
};

export const workSemesterEdit = (data?: apiInterface.WorkSemesterEditData) => {
  return POST('/api/work-semester/update', {
    data,
  });
};

export const workSemesterDelete = (
  data?: apiInterface.WorkSemesterDeleteData,
) => {
  return POST('/api/work-semester/delete', {
    data,
  });
};

export const workSemesterCollect = (
  data?: apiInterface.WorkSemesterCollectData,
) => {
  return POST('/api/work-semester/collect', {
    data,
  });
};
