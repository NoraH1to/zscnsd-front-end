import { formatDate } from '@/utils';
import { Card, CardProps, Space, Typography } from 'antd';
import { FC } from 'react';

const ChinaMobileNoDataReportInfoDtetail: FC<{
  chinaMobileNoDataReport: apiInterface.ReportChinaMobileNoData;
  cardProps?: CardProps;
}> = ({ chinaMobileNoDataReport, cardProps }) => {
  return (
    <Card
      hoverable
      title={
        !!chinaMobileNoDataReport
          ? formatDate(chinaMobileNoDataReport.createTime, true)
          : '加载中'
      }
      loading={!chinaMobileNoDataReport}
      {...cardProps}
    >
      {!!chinaMobileNoDataReport &&
        Object.keys(chinaMobileNoDataReport).length > 0 && (
          <Space direction="vertical">
            <Typography.Text
              copyable={{ text: chinaMobileNoDataReport.networkAccount }}
            >
              {`用户宽带账号：${chinaMobileNoDataReport.networkAccount}`}
            </Typography.Text>
            <Typography.Text
              copyable={{ text: chinaMobileNoDataReport.switchSerialNumber }}
            >{`交换机SN码：${chinaMobileNoDataReport.switchSerialNumber}`}</Typography.Text>
            <Typography.Text
              copyable={{ text: chinaMobileNoDataReport.onuData }}
            >
              {`ONU数据：${chinaMobileNoDataReport.onuData}`}
            </Typography.Text>
          </Space>
        )}
    </Card>
  );
};

export default ChinaMobileNoDataReportInfoDtetail;
