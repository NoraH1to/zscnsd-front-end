import base, { memberTimetable } from './base';

export default {
  'GET /api/member-timetable/list': base('data|1-10', [memberTimetable]),
  'POST /api/member-timetable/admin-add': base('data', memberTimetable),
  'POST /api/member-timetable/delete': base('data', {}),
  'POST /api/member-timetable/update': base('data', memberTimetable),
};
