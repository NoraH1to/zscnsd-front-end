import AttendanceChangeStatusComponent from '@/components/AttendanceChangeStatus';
import { Card, Divider, Space, Typography } from 'antd';
import apiInterface from 'api';
import { FC } from 'react';
import { InfoCardProp } from 'typings';

const AttendanceChangeInfoCard: FC<InfoCardProp> = (props) => {
  const { onClick } = props;
  const { data }: { data: apiInterface.AttendanceChange } = props;
  return (
    <Card hoverable onClick={onClick} title={data.type.string}>
      <Space style={{ width: '100%' }} direction="vertical">
        <AttendanceChangeStatusComponent attendanceChange={data} />
        <Typography.Text>{`换班片区：${data.area.string}`}</Typography.Text>
        <Typography.Text>{`日期：${data.date}`}</Typography.Text>
        {!!data.changeDate && (
          <Typography.Text>{`换班日期：${data.changeDate}`}</Typography.Text>
        )}
        <Typography.Text>{`申请时间：${data.createTime}`}</Typography.Text>
        <Typography.Paragraph
          ellipsis={{ rows: 5, expandable: true, symbol: 'more' }}
        >
          {`申请理由：${data.reason}`}
        </Typography.Paragraph>

        {!!data.operateTime && (
          <>
            <Divider />
            <Typography.Text>{`处理人姓名-工号：${data.operator.name}-${data.operator.member?.workId}`}</Typography.Text>
            <Typography.Text>{`处理时间：${data.operateTime}`}</Typography.Text>
          </>
        )}
      </Space>
    </Card>
  );
};

export default AttendanceChangeInfoCard;
