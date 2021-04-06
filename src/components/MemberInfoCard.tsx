import { Card, Space, Typography, CardProps } from 'antd';
import apiInterface from 'api';
import { FC } from 'react';
import WeekdayTags from '@/components/WeekdayTags';
import { union } from 'ramda';
import MemberRoleTag from './MemberRoleTag';

const MemberInfoCard: FC<{
  user: apiInterface.Member | undefined;
  cardProps: CardProps;
}> = ({ user, cardProps }) => {
  return (
    <Card title="成员信息" {...cardProps}>
      {!!user && (
        <Space direction="vertical">
          <Typography.Text>{`工号：${user.member.workId}`}</Typography.Text>
          <Typography.Text>
            权限：
            <MemberRoleTag user={user} />
          </Typography.Text>
          <Typography.Text>{`血条：${user.member.health}`}</Typography.Text>
          <Typography.Text>{`处罚星级：${user.member.punishment}`}</Typography.Text>
          <Typography.Text>{`值班片区：${user.member.workArrangement
            .map((arrangemet) => arrangemet.area.string)
            .join('、')}`}</Typography.Text>
          <Typography.Text>
            值班日：
            <WeekdayTags
              weekdays={union(
                user.member.workArrangement.map(
                  (arrangemet) => arrangemet.weekday,
                ),
                [],
              )}
            />
          </Typography.Text>
        </Space>
      )}
    </Card>
  );
};

export default MemberInfoCard;
