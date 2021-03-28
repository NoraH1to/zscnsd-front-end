import base, { ticketFaultType } from './base';

export default {
  'GET /api/ticket-fault-menu/list': base('data', ticketFaultType),
  'POST /api/ticket-fault-menu/add': base('data|1', ticketFaultType),
  'POST /api/ticket-fault-menu/delete': base('data', {}),
  'POST /api/ticket-fault-menu/update': base('data|1', ticketFaultType),
  'POST /api/ticket-fault-menu/batch-update': base('data|1', ticketFaultType),
};
