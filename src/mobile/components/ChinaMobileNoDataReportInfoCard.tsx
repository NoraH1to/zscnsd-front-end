import { formatDate } from '@/utils';
import { Card, Space, Typography } from 'antd';
import apiInterface from 'api';
import { FC } from 'react';
import { InfoCardProp } from 'typings';

const ChinaMobileNoDataReportInfoCard: FC<InfoCardProp> = (props) => {
  const { onClick } = props;
  const { data }: { data: apiInterface.ReportChinaMobileNoData } = props;
  return (
    <Card onClick={onClick} hoverable title={formatDate(data.createTime, true)}>
      <Space direction="vertical">
        <Typography.Text copyable={{ text: data.networkAccount }}>
          {`用户宽带账号：${data.networkAccount}`}
        </Typography.Text>
        <Typography.Text
          copyable={{ text: data.switchSerialNumber }}
        >{`交换机SN码：${data.switchSerialNumber}`}</Typography.Text>
        <Typography.Text copyable={{ text: data.onuData }}>
          {`ONU数据：${data.onuData}`}
        </Typography.Text>
      </Space>
    </Card>
  );
};

export default ChinaMobileNoDataReportInfoCard;
