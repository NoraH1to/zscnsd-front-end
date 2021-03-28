import { Random } from 'mockjs';
import base, { registerWhitelistGroupList } from './base';

export default {
  'GET /api/register-whitelist-group/search': base(
    'data',
    registerWhitelistGroupList,
  ),
  'GET /api/register-whitelist-group/list': base(
    'data',
    registerWhitelistGroupList,
  ),
  'POST /api/register-whitelist-group/add': base(
    'data|1',
    registerWhitelistGroupList,
  ),
  'POST /api/register-whitelist-group/update': base(
    'data|1',
    registerWhitelistGroupList,
  ),
  'POST /api/register-whitelist-group/delete': base('data', {}),
};
