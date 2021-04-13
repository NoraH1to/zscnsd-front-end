import { GET, POST } from '@/api';
import apiInterface from 'api';

export const ticketList = (params?: apiInterface.TicketListQuery) => {
  return GET('/api/ticket/list', {
    params,
  });
};

export const ticketListUser = (params?: apiInterface.TicketListUserQuery) => {
  return GET('/api/ticket/user-list', {
    params,
  });
};

export const ticketAdd = (data?: apiInterface.TicketAddData) => {
  return POST('/api/ticket/add', {
    data,
  });
};

export const ticketAddUser = (data?: apiInterface.TicketAddUserData) => {
  return POST('/api/ticket/user-add', {
    data,
  });
};

export const ticketEdit = (data?: apiInterface.TicketEditData) => {
  return POST('/api/ticket/update', {
    data,
  });
};

export const ticketEditUser = (data?: apiInterface.TicketEditUserData) => {
  return POST('/api/ticket/user-update', {
    data,
  });
};

export const ticketDelete = (data?: apiInterface.TicketDeleteData) => {
  return POST('/api/ticket/delete', {
    data,
  });
};

export const ticketDeleteUser = (data?: apiInterface.TicketDeleteUserData) => {
  return POST('/api/ticket/user-delete', {
    data,
  });
};

export const ticketRestore = (data?: apiInterface.TicketRestoreData) => {
  return POST('/api/ticket/restore', {
    data,
  });
};

export const ticketOperate = (data?: apiInterface.TicketOperateData) => {
  return POST('/api/ticket/operate', {
    data,
  });
};

export const ticketLogList = (params?: apiInterface.TicketLogListQuery) => {
  return GET('/api/ticket/log-list', {
    params,
  });
};

export const ticketDetail = (params?: apiInterface.TicketDetailQuery) => {
  return GET('/api/ticket/detail', {
    params,
  });
};
