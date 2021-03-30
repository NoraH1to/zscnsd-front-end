import { GET, POST } from '@/api';
import apiInterface from 'api';

export const fileUploadTimetable = (data?: FormData) => {
  return POST('/api/file/upload-timetable', {
    headers: { 'Content-Type': 'multipart/form-data' },
    data,
  });
};

export const fileDownload = (params?: apiInterface.FileDownloadQuery) => {
  return GET('/api/file/download', {
    params,
  });
};
