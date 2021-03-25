import moment, { Moment } from 'moment';

export const dateformatInput = 'YYYY-MM-DD HH:mm:ss';
export const dateformatOut = 'YYYY-MM-DD HH:mm';

export const formatDate = (dateStr: string | Moment | object | any): string => {
  if (dateStr) {
    let result: any = '_null';
    if (typeof dateStr == 'string') {
      result = vaildDate(dateStr);
      if (result) return result.format(dateformatOut);
    }
    if (dateStr._isAMomentObject) return dateStr.format(dateformatOut);
  }
  return '_null';
};

export const vaildDate = (dateStr: string): Moment | null => {
  const momentObj = moment(dateStr, dateformatInput, true);
  if (momentObj.isValid()) return momentObj;
  return null;
};
