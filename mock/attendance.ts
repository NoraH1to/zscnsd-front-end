import base, { attendance } from './base';

export default {
  'GET /api/attendance/list': base('data|1-10', [attendance]),
  // 'POST /api/isp-ticket/add': base('data', ispTicket),
};
