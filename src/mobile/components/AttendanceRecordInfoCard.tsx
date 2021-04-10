import { formatDate } from '@/utils';
import { Card, Space, Typography } from 'antd';
import apiInterface from 'api';
import { FC } from 'react';
import { InfoCardProp } from 'typings';

const AttendanceRecordInfoCard: FC<InfoCardProp> = (props) => {
  const { onClick } = props;
  const { data }: { data: apiInterface.Attendance } = props;
  return (
    <Card onClick={onClick} title={data.area.string}>
      <Space direction="vertical">
        <Typography.Text>{`签到时间：${data.signInTime}`}</Typography.Text>
        <Typography.Text>{`签退时间：${data.signOutTime}`}</Typography.Text>
      </Space>
    </Card>
  );
};

export default AttendanceRecordInfoCard;
