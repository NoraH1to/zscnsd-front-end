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
    msg: '添加用户成功',
  });
};

export const userAdd = (data?: apiInterface.UserAddData) => {
  return POST('/api/user/add', {
    data,
    msg: '绑定微信成功',
  });
};

export const userEditAdmin = (data?: apiInterface.UserEditAdminData) => {
  return POST('/api/user/admin-update', {
    data,
    msg: '修改用户信息成功',
  });
};

export const userDelete = (data?: apiInterface.UserDeleteData) => {
  return POST('/api/user/delete', {
    data,
    msg: '删除成功',
  });
};

export const userSearch = (params?: apiInterface.UserSearchData) => {
  return GET('/api/user/search', {
    params,
  });
};

export const userLogin = (data?: apiInterface.UserLoginData) => {
  return POST('/api/user/login', {
    data,
  });
};

export const userLoginAdmin = (data?: apiInterface.UserLoginAdminData) => {
  return POST('/api/user/admin-login', {
    data,
    msg: '登入成功',
  });
};

export const userPasswordEdit = (data?: apiInterface.UserPasswordEditData) => {
  return POST('/api/user/update-password', {
    data,
    msg: '修改成功',
  });
};

export const userLogoutAdmin = () => {
  return POST('/api/user/admin-logout', { msg: '登出成功' });
};

export const userDetail = (params?: apiInterface.UserInfoQuery) => {
  return GET('/api/user/detail', {
    params,
  });
};

export const userEdit = (data?: apiInterface.UserEditUserData) => {
  return POST('/api/user/user-update', {
    data,
    msg: '修改成功',
  });
};
