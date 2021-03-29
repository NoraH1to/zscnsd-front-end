import { GET, POST } from '@/api';
import apiInterface from 'api';

export const workArrangementList = (
  params?: apiInterface.WorkArrangementListQuery,
) => {
  return GET('/api/work-arrangement/list', {
    params,
  });
};