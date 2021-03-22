import base, { ticketFaultType, ticket, ticketOperateLog } from './base';

export default {
  'GET /api/ticket/list': base('data|1-10', [ticket]),
  'GET /api/ticket-fault-menu/list': base('data', ticketFaultType),
  'POST /api/ticket/add': base('data', ticket),
  'POST /api/ticket/delete': base('data', {}),
  'POST /api/ticket/update': base('data', ticket),
  'POST /api/ticket/operate': base('data', ticket),
  'GET /api/ticket/log-list': base('data|1-10', [ticketOperateLog]),
  'POST /api/ticket/restore': base('data', {}),
};
