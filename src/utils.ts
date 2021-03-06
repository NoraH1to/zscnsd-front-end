import { Modal } from 'antd';
import moment, { Moment } from 'moment';

export const datetimeformatInput = 'YYYY-MM-DD HH:mm:ss';
export const dateformatInput = 'YYYY-MM-DD';
export const datetimeformatOut = 'YYYY-MM-DD HH:mm';
export const dateformatOut = 'YYYY-MM-DD';

export const formatDate = (
  dateStr: string | Moment | object | any,
  dateOnly?: boolean,
): string => {
  const format = dateOnly ? dateformatOut : datetimeformatOut;
  if (dateStr) {
    let result: any = '无';
    if (typeof dateStr == 'string') {
      result = vaildDate(dateStr);
      if (result) return result.format(format);
    }
    if (dateStr._isAMomentObject) return dateStr.format(format);
  }
  return '无';
};

export const vaildDate = (dateStr: string): Moment | null => {
  const momentObj = moment(dateStr, datetimeformatInput, true);
  if (momentObj.isValid()) return momentObj;
  return null;
};

export const confirmDialog = (options: {
  actionText: string;
  loading?: boolean;
  onOk: () => any;
}) => {
  const { actionText, loading, onOk } = options;
  Modal.confirm({
    title: `确定要${actionText}？`,
    okText: '确定',
    cancelText: '取消',
    okButtonProps: { loading },
    cancelButtonProps: { loading },
    centered: true,
    onOk() {
      onOk();
    },
  });
};

export const getToken = () => window.localStorage.getItem('Token');

export const setToken = (token: string) =>
  window.localStorage.setItem('Token', token);

export const removeToken = () => window.localStorage.removeItem('Token');

export const hasToken = () => !!window.localStorage.getItem('Token');
