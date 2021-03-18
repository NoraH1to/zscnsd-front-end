import { GET, POST } from '@/api';
import apiInterface from 'api';

export const userList = (params?: apiInterface.UserListQuery) => {
  return GET('/api/user/list', {
    params,
  });
};

export const userAddAdmin = (data?: apiInterface.UserAddAdminData) => {
  return POST('/api/user/admin-add', {
    data,
  });
};

export const userEditAdmin = (data?: apiInterface.UserEditAdminData) => {
  return POST('/api/user/admin-update', {
    data,
  });
};

export const userDelete = (data?: apiInterface.UserDeleteData) => {
  return POST('/api/user/delete', {
    data,
  });
};

export const userSearch = (params?: apiInterface.UserSearch) => {
  return GET('/api/user/search', {
    params,
  });
};
