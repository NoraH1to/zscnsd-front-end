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

export const userSearch = (params?: apiInterface.UserSearchData) => {
  return GET('/api/user/search', {
    params,
  });
};

export const userLoginAdmin = (data?: apiInterface.UserLoginAdminData) => {
  return POST('/api/user/admin-login', {
    data,
  });
};

export const userPasswordEdit = (data?: apiInterface.UserPasswordEditData) => {
  return POST('/api/user/update-password', {
    data,
  });
};

export const userLogoutAdmin = () => {
  return POST('/api/user/admin-logout');
};

export const userDetail = (params?: apiInterface.UserInfoQuery) => {
  return GET('/api/user/detail', {
    params,
  });
};

export const userEdit = (data?: apiInterface.UserEditUserData) => {
  return POST('/api/user/user-update', {
    data,
  });
};
