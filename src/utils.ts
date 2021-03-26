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
    let result: any = '_null';
    if (typeof dateStr == 'string') {
      result = vaildDate(dateStr);
      if (result) return result.format(format);
    }
    if (dateStr._isAMomentObject) return dateStr.format(format);
  }
  return '_null';
};

export const vaildDate = (dateStr: string): Moment | null => {
  const momentObj = moment(dateStr, datetimeformatInput, true);
  if (momentObj.isValid()) return momentObj;
  return null;
};
