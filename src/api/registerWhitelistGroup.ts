import { GET, POST } from '@/api';
import apiInterface from 'api';

export const registerWhitelistGroupList = (
  params?: apiInterface.RegisterWhitelistGroupListQuery,
) => {
  return GET('/api/register-whitelist-group/list', {
    params,
  });
};

export const registerWhitelistGroupAdd = (
  data?: apiInterface.RegisterWhitelistGroupAddData,
) => {
  return POST('/api/register-whitelist-group/add', {
    data,
  });
};

export const registerWhitelistGroupEdit = (
  data?: apiInterface.RegisterWhitelistGroupEditData,
) => {
  return POST('/api/register-whitelist-group/update', {
    data,
  });
};

export const registerWhitelistGroupDelete = (
  data?: apiInterface.RegisterWhitelistGroupDeleteData,
) => {
  return POST('/api/register-whitelist-group/delete', {
    data,
  });
};

export const registerWhitelistGroupSearch = (
  params?: apiInterface.RegisterWhitelistGroupSearch,
) => {
  return GET('/api/register-whitelist-group/search', {
    params,
  });
};
