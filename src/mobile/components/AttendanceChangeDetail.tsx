import AttendanceChangeStatusComponent from '@/components/AttendanceChangeStatus';
import { Card, CardProps, Divider, Space, Typography } from 'antd';
import { FC } from 'react';

const AttendanceChangeDetail: FC<{
  attendanceChange: apiInterface.AttendanceChange;
  cardProps?: CardProps;
}> = ({ attendanceChange, cardProps }) => {
  return (
    <Card
      title={!!attendanceChange ? attendanceChange.type.string : '加载中'}
      loading={!attendanceChange}
      {...cardProps}
    >
      {!!attendanceChange && Object.keys(attendanceChange).length > 0 && (
        <Space style={{ width: '100%' }} direction="vertical">
          <AttendanceChangeStatusComponent
            attendanceChange={attendanceChange}
          />
          <Typography.Text>{`换班片区：${attendanceChange.area.string}`}</Typography.Text>
          <Typography.Text>{`日期：${attendanceChange.date}`}</Typography.Text>
          {!!attendanceChange.changeDate && (
            <Typography.Text>{`换班日期：${attendanceChange.changeDate}`}</Typography.Text>
          )}
          <Typography.Text>{`申请时间：${attendanceChange.createTime}`}</Typography.Text>
          <Typography.Paragraph
            ellipsis={{ rows: 5, expandable: true, symbol: 'more' }}
          >
            {`申请理由：${attendanceChange.reason}`}
          </Typography.Paragraph>

          {!!attendanceChange.operateTime && (
            <>
              <Divider />
              <Typography.Text>{`处理人姓名-工号：${attendanceChange.operator.name}-${attendanceChange.operator.member?.workId}`}</Typography.Text>
              <Typography.Text>{`处理时间：${attendanceChange.operateTime}`}</Typography.Text>
            </>
          )}
        </Space>
      )}
    </Card>
  );
};

export default AttendanceChangeDetail;
