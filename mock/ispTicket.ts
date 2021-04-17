import base, { file, ispTicket, ispTicketOperateLog } from './base';

export default {
  'GET /api/isp-ticket/list': base('data|1-10', [ispTicket]),
  'POST /api/isp-ticket/add': base('data', ispTicket),
  'POST /api/isp-ticket/batch-add': base('data', {}),
  'POST /api/isp-ticket/delete': base('data', {}),
  'POST /api/isp-ticket/update': base('data', ispTicket),
  'POST /api/isp-ticket/operate': base('data', ispTicket),
  'GET /api/isp-ticket/log-list': base('data|1-10', [ispTicketOperateLog]),
  'POST /api/isp-ticket/restore': base('data', {}),
  'GET /api/isp-ticket/detail': base('data', ispTicket),
  'GET /api/isp-ticket/export': base('data', file),
};
