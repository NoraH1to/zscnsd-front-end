import base, { arrangement, arrangementTimeTable } from './base';

export default {
  'GET /api/work-arrangement/list': base('data|15-30', [arrangement]),
  'GET /api/work-arrangement/timetable-list': base('data|10-20', [
    arrangementTimeTable,
  ]),
  'POST /api/work-arrangement/update': base('data', {}),
};
