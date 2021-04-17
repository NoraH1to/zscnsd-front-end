import base, { ticketFaultType, ticket, ticketOperateLog, file } from './base';

export default {
  'GET /api/ticket/list': base('data|1-10', [ticket]),
  'GET /api/ticket/user-list': base('data|1-10', [ticket]),
  'GET /api/ticket-fault-menu/list': base('data', ticketFaultType),
  'POST /api/ticket/add': base('data', ticket),
  'POST /api/ticket/batch-add': base('data', {}),
  'POST /api/ticket/user-add': base('data', ticket),
  'POST /api/ticket/delete': base('data', {}),
  'POST /api/ticket/user-delete': base('data', {}),
  'POST /api/ticket/update': base('data', ticket),
  'POST /api/ticket/user-update': base('data', ticket),
  'POST /api/ticket/operate': base('data', ticket),
  'GET /api/ticket/log-list': base('data|1-10', [ticketOperateLog]),
  'POST /api/ticket/restore': base('data', {}),
  'GET /api/ticket/detail': base('data', ticket),
  'GET /api/ticket/export': base('data', file),
};
