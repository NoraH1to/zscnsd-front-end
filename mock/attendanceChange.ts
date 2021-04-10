import base, { attendanceChangeRequest } from './base';

export default {
  'GET /api/attendance-change/list': base('data|1-10', [
    attendanceChangeRequest,
  ]),
  'POST /api/attendance-change/admin-add': base(
    'data',
    attendanceChangeRequest,
  ),
  'POST /api/attendance-change/user-add': base('data', attendanceChangeRequest),
  'POST /api/attendance-change/delete': base('data', {}),
  'POST /api/attendance-change/admin-update': base(
    'data',
    attendanceChangeRequest,
  ),
  'POST /api/attendance-change/user-update': base(
    'data',
    attendanceChangeRequest,
  ),
  'POST /api/attendance-change/operate': base('data', attendanceChangeRequest),
  'GET /api/attendance-change/detail': base('data', attendanceChangeRequest),
};
