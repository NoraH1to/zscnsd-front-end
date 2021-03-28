import { GET, POST } from '@/api';
import apiInterface from 'api';

export const ticketFaultMenuList = (
  params?: apiInterface.TicketFaultTypeListQuery,
) => {
  return GET('/api/ticket-fault-menu/list', { params });
};

export const ticketFaultMenuAdd = (data?: apiInterface.TicketFaultTypeAddData) => {
  return POST('/api/ticket-fault-menu/add', {
    data,
  });
};

export const ticketFaultMenuEdit = (data?: apiInterface.TicketFaultMenu) => {
  return POST('/api/ticket-fault-menu/update', {
    data,
  });
};

export const ticketFaultMenuBatchEdit = (
  data?: apiInterface.TicketEditData,
) => {
  return POST('/api/ticket-fault-menu/batch-update', {
    data,
  });
};

export const ticketFaultMenuDelete = (data?: apiInterface.TicketDeleteData) => {
  return POST('/api/ticket-fault-menu/delete', {
    data,
  });
};
