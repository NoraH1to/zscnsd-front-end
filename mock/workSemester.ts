import base, { semester } from './base';

export default {
  'GET /api/work-semester/list': base('data|1-10', [semester]),
  'POST /api/work-semester/add': base('data', semester),
  'POST /api/work-semester/delete': base('data', {}),
  'POST /api/work-semester/update': base('data', semester),
  'POST /api/work-semester/collect': base('data', semester),
};
