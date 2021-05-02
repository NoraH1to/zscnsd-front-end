import base, { file } from './base';

export default {
  'POST /api/file/upload-timetable': base('data', file),
  'GET /api/file/template': base('data', file),
};
