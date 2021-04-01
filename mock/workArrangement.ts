import base, { arrangement } from './base';

export default {
  'GET /api/work-arrangement/list': base('data|15-30', [arrangement]),
  'GET /api/work-arrangement/timetable-list': base('data|1-10', [arrangement]),
  'POST /api/work-arrangement/update': base('data', {}),
};
