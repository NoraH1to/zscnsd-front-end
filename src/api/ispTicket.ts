import { EXPORT, GET, POST, UPLOAD } from '@/api';
import apiInterface from 'api';

export const ispTicketList = (params?: apiInterface.IspTicketListQuery) => {
  return GET('/api/isp-ticket/list', {
    params,
  });
};

export const ispTicketAdd = (data?: apiInterface.IspTicketAddData) => {
  return POST('/api/isp-ticket/add', {
    data,
  });
};

export const ispTicketBatchAdd = (data?: FormData) => {
  return UPLOAD('/api/isp-ticket/batch-add', {
    data,
    msg: '上传成功',
  });
};

export const ispTicketEdit = (data?: apiInterface.IspTicketEditData) => {
  return POST('/api/isp-ticket/update', {
    data,
  });
};

export const ispTicketDelete = (data?: apiInterface.IspTicketDeleteData) => {
  return POST('/api/isp-ticket/delete', {
    data,
  });
};

export const ispTicketRestore = (data?: apiInterface.IspTicketRestoreData) => {
  return POST('/api/isp-ticket/restore', {
    data,
  });
};

export const ispTicketOperate = (data?: apiInterface.IspTicketOperateData) => {
  return POST('/api/isp-ticket/operate', {
    data,
  });
};

export const ispTicketLogList = (
  params?: apiInterface.IspTicketLogListQuery,
) => {
  return GET('/api/isp-ticket/log-list', {
    params,
  });
};

export const ispTickeDetail = (params?: apiInterface.IspTicketDetailQuery) => {
  return GET('/api/isp-ticket/detail', {
    params,
  });
};

export const ispTicketExport = (params?: apiInterface.IspTicketListQuery) => {
  return EXPORT('/api/isp-ticket/export', {
    params,
  });
};
