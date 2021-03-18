import { Random } from 'mockjs';
import base, { user } from './base';

export default {
  'GET /api/member/list': base('data|1-10', [user]),
  'POST /api/member/add': base('data', user),
  'POST /api/member/delete': base('data', {}),
  'POST /api/member/update': base('data', user),
};
