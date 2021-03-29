import base, { workChange } from './base';

export default {
  'GET /api/work-change/list': base('data|1-10', [workChange]),
  'POST /api/work-change/add': base('data', workChange),
  'POST /api/work-change/delete': base('data', {}),
  'POST /api/work-change/update': base('data', workChange),
};
