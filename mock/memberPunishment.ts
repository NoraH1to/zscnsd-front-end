import base, { memberPunishment } from './base';

export default {
  'GET /api/member-punishment/list': base('data|1-10', [memberPunishment]),
  'POST /api/member-punishment/add': base('data', memberPunishment),
  'POST /api/member-punishment/delete': base('data', {}),
  'POST /api/member-punishment/update': base('data', memberPunishment),
};
