import { GET, POST } from '@/api';
import qs from 'qs';
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

export const excelTemplate = (params?: apiInterface.FileExcelTemplateQuery) =>
  fileDownload(`/api/file/template?${qs.stringify(params)}`);

export const memberTemplate = () => excelTemplate({ type: 'member' });

export const ispTicketTemplate = () => excelTemplate({ type: 'ispTicket' });

export const registerWhitelistTemplate = () =>
  excelTemplate({ type: 'registerWhitelist' });
