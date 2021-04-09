import base, { attendance } from './base';

export default {
  'GET /api/attendance/list': base('data|1-10', [attendance]),
  'POST /api/attendance/sign-in': base('data', attendance),
  'POST /api/attendance/sign-out': base('data', attendance),
};
