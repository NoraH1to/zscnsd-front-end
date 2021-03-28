import { GET, POST } from '@/api';
import apiInterface from 'api';

export const ticketFaultMenu = (params?: apiInterface.TicketListQuery) => {
  return GET('/api/ticket-fault-menu/list', { params });
};
