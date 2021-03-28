import { Random } from 'mockjs';
import base, { registerWhitelist } from './base';

export default {
  'GET /api/register-whitelist/list': base('data|1-10', [registerWhitelist]),
  'POST /api/register-whitelist/add': base('data', registerWhitelist),
  'POST /api/register-whitelist/update': base('data', registerWhitelist),
  'POST /api/register-whitelist/delete': base('data', {}),
  'POST /api/register-whitelist/batch-update': base('data', {}),
};
