import { GET, POST } from '@/api';
import apiInterface from 'api';

export const fileUploadTimetable = (data?: FormData) => {
  return POST('/api/file/upload-timetable', {
    headers: { 'Content-Type': 'multipart/form-data' },
    data,
  });
};

export const fileDownload = (path: string) => {
  window.open(`${BASE_URL}${path}`);
};

export const excelTemplate = (params?: apiInterface.FileExcelTemplateQuery) => {
  return GET('/api/file/template', {
    params,
  });
};

export const memberTemplate = () => {
  return excelTemplate({ type: 'member' });
};

export const ispTicketTemplate = () => {
  return excelTemplate({ type: 'ispTicket' });
};

export const registerWhitelistTemplate = () => {
  return excelTemplate({ type: 'registerWhitelist' });
};
