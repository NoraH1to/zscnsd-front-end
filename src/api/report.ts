import { EXPORT, GET, POST } from '@/api';
import apiInterface from 'api';

/**
 * @description 移动ONU被占
 */

export const reportChinaMobileOccupiedOnuList = (
  params?: apiInterface.ReportChinaMobileOccupiedOnuListQuery,
) => {
  return GET('/api/china-mobile-occupied-onu-report/list', {
    params,
  });
};

export const reportChinaMobileOccupiedOnuDetail = (
  params?: apiInterface.ReportChinaMobileOccupiedOnuDetailQuery,
) => {
  return GET('/api/china-mobile-occupied-onu-report/detail', {
    params,
  });
};

export const reportChinaMobileOccupiedOnuAdd = (
  data?: apiInterface.ReportChinaMobileOccupiedOnuAddData,
) => {
  return POST('/api/china-mobile-occupied-onu-report/add', {
    data,
  });
};

export const reportChinaMobileOccupiedOnuEdit = (
  data?: apiInterface.ReportChinaMobileOccupiedOnuEditData,
) => {
  return POST('/api/china-mobile-occupied-onu-report/update', {
    data,
  });
};

export const reportChinaMobileOccupiedOnuDelete = (
  data?: apiInterface.ReportChinaMobileOccupiedOnuDeleteData,
) => {
  return POST('/api/china-mobile-occupied-onu-report/delete', {
    data,
  });
};

export const reportChinaMobileOccupiedOnuExport = (
  params?: apiInterface.ReportChinaMobileOccupiedOnuListQuery,
) => {
  return EXPORT('/api/china-mobile-occupied-onu-report/export', {
    params,
  });
};

/**
 * @description 移动无数据
 */

export const reportChinaMobileNoDataList = (
  params?: apiInterface.ReportChinaMobileNoDataListQuery,
) => {
  return GET('/api/china-mobile-no-data-report/list', {
    params,
  });
};

export const reportChinaMobileNoDataDetail = (
  params?: apiInterface.ReportChinaMobileNoDataDetailQuery,
) => {
  return GET('/api/china-mobile-no-data-report/detail', {
    params,
  });
};

export const reportChinaMobileNoDataAdd = (
  data?: apiInterface.ReportChinaMobileNoDataAddData,
) => {
  return POST('/api/china-mobile-no-data-report/add', {
    data,
  });
};

export const reportChinaMobileNoDataEdit = (
  data?: apiInterface.ReportChinaMobileNoDataEditData,
) => {
  return POST('/api/china-mobile-no-data-report/update', {
    data,
  });
};

export const reportChinaMobileNoDataDelete = (
  data?: apiInterface.ReportChinaMobileNoDataDeleteData,
) => {
  return POST('/api/china-mobile-no-data-report/delete', {
    data,
  });
};

export const reportChinaMobileNoDataExport = (
  params?: apiInterface.ReportChinaMobileNoDataListQuery,
) => {
  return EXPORT('/api/china-mobile-no-data-report/export', {
    params,
  });
};

/**
 * @description 主线
 */

export const reportWallLineList = (
  params?: apiInterface.ReportWallLineListQuery,
) => {
  return GET('/api/wall-line-report/list', {
    params,
  });
};

export const reportWallLineDetail = (
  params?: apiInterface.ReportWallLineDetailQuery,
) => {
  return GET('/api/wall-line-report/detail', {
    params,
  });
};

export const reportWallLineAdd = (
  data?: apiInterface.ReportWallLineAddData,
) => {
  return POST('/api/wall-line-report/add', {
    data,
  });
};

export const reportWallLineEdit = (
  data?: apiInterface.ReportWallLineEditData,
) => {
  return POST('/api/wall-line-report/update', {
    data,
  });
};

export const reportWallLineDelete = (
  data?: apiInterface.ReportWallLineDeleteData,
) => {
  return POST('/api/wall-line-report/delete', {
    data,
  });
};

export const reportWallLineExport = (
  params?: apiInterface.ReportWallLineListQuery,
) => {
  return EXPORT('/api/wall-line-report/export', {
    params,
  });
};

/**
 * @description 交换机错误
 */

export const reportSwitchFaultList = (
  params?: apiInterface.ReportSwitchFaultListQuery,
) => {
  return GET('/api/switch-fault-report/list', {
    params,
  });
};

export const reportSwitchFaultDetail = (
  params?: apiInterface.ReportSwitchFaultDetailQuery,
) => {
  return GET('/api/switch-fault-report/detail', {
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

export const reportSwitchFaultExport = (
  params?: apiInterface.ReportSwitchFaultListQuery,
) => {
  return EXPORT('/api/switch-fault-report/export', {
    params,
  });
};
