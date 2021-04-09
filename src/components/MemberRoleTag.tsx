import { roles } from '@/common';
import { Tag } from 'antd';
import apiInterface from 'api';
import { find } from 'ramda';
import { FC } from 'react';

const MemberRoleTag: FC<{ user: apiInterface.User | undefined }> = ({
  user,
}) => {
  const role = find((item) => item.id == user?.member.role.id, roles);
  return <Tag color={role?.color}>{role?.string}</Tag>;
};

export default MemberRoleTag;
