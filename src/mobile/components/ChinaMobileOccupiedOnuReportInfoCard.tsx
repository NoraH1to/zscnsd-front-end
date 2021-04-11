import { formatDate } from '@/utils';
import { Card, Space, Typography } from 'antd';
import apiInterface from 'api';
import { FC } from 'react';
import { InfoCardProp } from 'typings';

const ChinaMobileOccupiedOnuReportInfoCard: FC<InfoCardProp> = (props) => {
  const { onClick } = props;
  const { data }: { data: apiInterface.ReportChinaMobileOccupiedOnu } = props;
  return (
    <Card onClick={onClick} hoverable title={formatDate(data.createTime, true)}>
      <Space direction="vertical">
        <Typography.Text copyable={{ text: data.oldSwitchSerialNumber }}>
          {`原交换机码：${data.oldSwitchSerialNumber}`}
        </Typography.Text>
        <Typography.Text copyable={{ text: data.oldOnuData }}>
          {`原交ONU数据：${data.oldOnuData}`}
        </Typography.Text>
        <Typography.Text copyable={{ text: data.newSwitchSerialNumber }}>
          {`现交换机码：${data.newSwitchSerialNumber}`}
        </Typography.Text>
        <Typography.Text copyable={{ text: data.newOnuData }}>
          {`现交ONU数据：${data.newOnuData}`}
        </Typography.Text>
      </Space>
    </Card>
  );
};

export default ChinaMobileOccupiedOnuReportInfoCard;
