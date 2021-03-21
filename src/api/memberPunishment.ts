import { GET, POST } from '@/api';
import apiInterface from 'api';

export const memberPunishmentList = (
  params?: apiInterface.MemberPunishmentListQuery,
) => {
  return GET('/api/member-punishment/list', {
    params,
  });
};

export const memberPunishmentAdd = (
  data?: apiInterface.MemberPunishmentAddData,
) => {
  return POST('/api/member-punishment/add', {
    data,
  });
};

export const memberPunishmentEdit = (
  data?: apiInterface.MemberPunishmentEditData,
) => {
  return POST('/api/member-punishment/update', {
    data,
  });
};

export const memberPunishmentDelete = (
  data?: apiInterface.MemberPunishmentDeleteData,
) => {
  return POST('/api/member-punishment/delete', {
    data,
  });
};
