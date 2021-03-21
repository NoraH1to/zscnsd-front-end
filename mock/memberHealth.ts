import base, { memberHealth } from './base';

export default {
  'GET /api/member-health/list': base('data|1-10', [memberHealth]),
  'POST /api/member-health/add': base('data', memberHealth),
  'POST /api/member-health/delete': base('data', {}),
  'POST /api/member-health/update': base('data', memberHealth),
};
