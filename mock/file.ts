import base from './base';

export default {
  'POST /api/file/upload-timetable': base('data', {
    filePath: '/api/file/download?path=test.png',
  }),
};
