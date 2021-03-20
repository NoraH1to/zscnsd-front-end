import { GET, POST } from '@/api';
import apiInterface from 'api';

export const reportSwitchFaultList = (
  params?: apiInterface.ReportSwitchFaultListQuery,
) => {
  return GET('/api/switch-fault-report/list', {
    params,
  });
};

export const reportSwitchFaultAdd = (
  data?: apiInterface.ReportSwitchFaultAddData,
) => {
  return POST('/api/switch-fault-report/add', {
    data,
  });
};

export const reportSwitchFaultEdit = (
  data?: apiInterface.ReportSwitchFaultEditData,
) => {
  return POST('/api/switch-fault-report/update', {
    data,
  });
};

export const reportSwitchFaultDelete = (
  data?: apiInterface.ReportSwitchFaultDeleteData,
) => {
  return POST('/api/switch-fault-report/delete', {
    data,
  });
};
