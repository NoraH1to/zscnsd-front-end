import { formatDate } from '@/utils';
import { Card, Space, Typography } from 'antd';
import apiInterface from 'api';
import { FC } from 'react';
import { InfoCardProp } from 'typings';

const SwitchFaultReportInfoCard: FC<InfoCardProp> = (props) => {
  const { onClick } = props;
  const { data }: { data: apiInterface.ReportSwitchFault } = props;
  return (
    <Card onClick={onClick} hoverable title={formatDate(data.createTime, true)}>
      <Space direction="vertical">
        <Typography.Text>
          {`宿舍楼-楼层：${data.dormBlock.string}-${data.dormFloor}层`}
        </Typography.Text>
        <Typography.Text copyable={{ text: data.switchSerialNumber }}>
          {`交换机SN码：${data.switchSerialNumber}`}
        </Typography.Text>
        <Typography.Text>
          {`交换机位置（从上往下）：${data.index}`}
        </Typography.Text>
      </Space>
    </Card>
  );
};

export default SwitchFaultReportInfoCard;
