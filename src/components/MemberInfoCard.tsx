import { Card, Space, Typography, CardProps } from 'antd';
import apiInterface from 'api';
import { FC } from 'react';
import WeekdayTags from '@/components/WeekdayTags';
import { union } from 'ramda';
import MemberRoleTag from './MemberRoleTag';
import WeekdayAreaTags from './WeekdayAreaTags';

const MemberInfoCard: FC<{
  user: apiInterface.User | undefined;
  cardProps: CardProps;
}> = ({ user, cardProps }) => {
  return (
    <Card title="成员信息" {...cardProps}>
      {!!user && (
        <Space direction="vertical">
          <Typography.Text>{`工号：${user.member?.workId}`}</Typography.Text>
          <Typography.Text>
            权限：
            <MemberRoleTag user={user} />
          </Typography.Text>
          <Typography.Text>{`血条：${user.member?.health}`}</Typography.Text>
          <Typography.Text>{`处罚星级：${user.member?.punishment}`}</Typography.Text>
          {user.member?.workArrangement && (
            <Typography.Text>
              值班日：
              <WeekdayAreaTags
                weekdayAreas={
                  (user.member?.workArrangement &&
                    user.member.workArrangement.map((arrangemet) => ({
                      weekday: arrangemet.weekday,
                      area: arrangemet.area,
                    }))) ||
                  []
                }
              />
            </Typography.Text>
          )}
        </Space>
      )}
    </Card>
  );
};

export default MemberInfoCard;
