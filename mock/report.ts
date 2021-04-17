import base, {
  reportChinaMobileNoData,
  reportChinaMobileOccupiedOnu,
  reportSwitchFault,
  reportWallLine,
} from './base';
import { file } from './base';

export default {
  // 移动ONU被占
  'GET /api/china-mobile-occupied-onu-report/list': base('data|1-10', [
    reportChinaMobileOccupiedOnu,
  ]),
  'GET /api/china-mobile-occupied-onu-report/detail': base(
    'data',
    reportChinaMobileOccupiedOnu,
  ),
  'GET /api/china-mobile-occupied-onu-report/export': base('data', file),
  'POST /api/china-mobile-occupied-onu-report/add': base(
    'data',
    reportChinaMobileOccupiedOnu,
  ),
  'POST /api/china-mobile-occupied-onu-report/update': base(
    'data',
    reportChinaMobileOccupiedOnu,
  ),
  'POST /api/china-mobile-occupied-onu-report/delete': base('data', {}),
  // 移动无数据
  'GET /api/china-mobile-no-data-report/list': base('data|1-10', [
    reportChinaMobileNoData,
  ]),
  'GET /api/china-mobile-no-data-report/detail': base(
    'data',
    reportChinaMobileNoData,
  ),
  'GET /api/china-mobile-no-data-report/export': base('data', file),
  'POST /api/china-mobile-no-data-report/add': base(
    'data',
    reportChinaMobileNoData,
  ),
  'POST /api/china-mobile-no-data-report/update': base(
    'data',
    reportChinaMobileNoData,
  ),
  'POST /api/china-mobile-no-data-report/delete': base('data', {}),
  // 主线
  'GET /api/wall-line-report/list': base('data|1-10', [reportWallLine]),
  'GET /api/wall-line-report/detail': base('data', reportWallLine),
  'GET /api/wall-line-report/export': base('data', file),
  'POST /api/wall-line-report/add': base('data', reportWallLine),
  'POST /api/wall-line-report/update': base('data', reportWallLine),
  'POST /api/wall-line-report/delete': base('data', {}),
  // 交换机故障
  'GET /api/switch-fault-report/list': base('data|1-10', [reportSwitchFault]),
  'GET /api/switch-fault-report/detail': base('data', reportSwitchFault),
  'GET /api/switch-fault-report/export': base('data', file),
  'POST /api/switch-fault-report/add': base('data', reportSwitchFault),
  'POST /api/switch-fault-report/update': base('data', reportSwitchFault),
  'POST /api/switch-fault-report/delete': base('data', {}),
};
