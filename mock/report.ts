import base, { reportSwitchFault } from './base';

export default {
  'GET /api/switch-fault-report/list': base('data|1-10', [reportSwitchFault]),
  'POST /api/switch-fault-report/add': base('data', reportSwitchFault),
  'POST /api/switch-fault-report/update': base('data', reportSwitchFault),
  'POST /api/switch-fault-report/delete': base('data', reportSwitchFault),
};
