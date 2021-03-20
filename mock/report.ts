import base, {
  reportChinaMobileNoData,
  reportChinaMobileOccupiedOnu,
  reportSwitchFault,
  reportWallLine,
} from './base';

export default {
  'GET /api/china-mobile-occupied-onu-report/list': base('data|1-10', [
    reportChinaMobileOccupiedOnu,
  ]),
  'POST /api/china-mobile-occupied-onu-report/add': base(
    'data',
    reportChinaMobileOccupiedOnu,
  ),
  'POST /api/china-mobile-occupied-onu-report/update': base(
    'data',
    reportChinaMobileOccupiedOnu,
  ),
  'POST /api/china-mobile-occupied-onu-report/delete': base('data', {}),
  'GET /api/china-mobile-no-data-report/list': base('data|1-10', [
    reportChinaMobileNoData,
  ]),
  'POST /api/china-mobile-no-data-report/add': base(
    'data',
    reportChinaMobileNoData,
  ),
  'POST /api/china-mobile-no-data-report/update': base(
    'data',
    reportChinaMobileNoData,
  ),
  'POST /api/china-mobile-no-data-report/delete': base('data', {}),
  'GET /api/wall-line-report/list': base('data|1-10', [reportWallLine]),
  'POST /api/wall-line-report/add': base('data', reportWallLine),
  'POST /api/wall-line-report/update': base('data', reportWallLine),
  'POST /api/wall-line-report/delete': base('data', {}),
  'GET /api/switch-fault-report/list': base('data|1-10', [reportSwitchFault]),
  'POST /api/switch-fault-report/add': base('data', reportSwitchFault),
  'POST /api/switch-fault-report/update': base('data', reportSwitchFault),
  'POST /api/switch-fault-report/delete': base('data', {}),
};
