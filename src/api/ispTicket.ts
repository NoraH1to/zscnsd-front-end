import { GET, POST } from '@/api';
import apiInterface from 'api';

export const ispTicketList = (params?: apiInterface.TicketListQuery) => {
  return GET('/api/isp-ticket/list', {
    params,
  });
};

export const ispTicketAdd = (data?: apiInterface.TicketAddData) => {
  return POST('/api/isp-ticket/add', {
    data,
  });
};

export const ispTicketEdit = (data?: apiInterface.TicketEditData) => {
  return POST('/api/isp-ticket/update', {
    data,
  });
};

export const ispTicketDelete = (data?: apiInterface.TicketDeleteData) => {
  return POST('/api/isp-ticket/delete', {
    data,
  });
};

export const ispTicketRestore = (data?: apiInterface.TicketRestoreData) => {
  return POST('/api/isp-ticket/restore', {
    data,
  });
};

export const ispTicketOperate = (data?: apiInterface.TicketOperateData) => {
  return POST('/api/isp-ticket/operate', {
    data,
  });
};

export const ispTicketLogList = (params?: apiInterface.TicketLogListQuery) => {
  return GET('/api/isp-ticket/log-list', {
    params,
  });
};
