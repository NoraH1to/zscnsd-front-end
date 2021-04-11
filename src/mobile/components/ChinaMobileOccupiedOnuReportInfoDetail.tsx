import { formatDate } from '@/utils';
import { Card, CardProps, Space, Typography } from 'antd';
import { FC } from 'react';

const ChinaMobileOccupiedOnuReportInfoDetail: FC<{
  chinaMobileOccupiedOnuReport: apiInterface.ReportChinaMobileOccupiedOnu;
  cardProps?: CardProps;
}> = ({ chinaMobileOccupiedOnuReport, cardProps }) => {
  return (
    <Card
      hoverable
      title={
        !!chinaMobileOccupiedOnuReport
          ? formatDate(chinaMobileOccupiedOnuReport.createTime, true)
          : '加载中'
      }
      loading={!chinaMobileOccupiedOnuReport}
      {...cardProps}
    >
      {!!chinaMobileOccupiedOnuReport &&
        Object.keys(chinaMobileOccupiedOnuReport).length > 0 && (
          <Space direction="vertical">
            <Typography.Text
              copyable={{
                text: chinaMobileOccupiedOnuReport.oldSwitchSerialNumber,
              }}
            >
              {`原交换机码：${chinaMobileOccupiedOnuReport.oldSwitchSerialNumber}`}
            </Typography.Text>
            <Typography.Text
              copyable={{ text: chinaMobileOccupiedOnuReport.oldOnuData }}
            >
              {`原交ONU数据：${chinaMobileOccupiedOnuReport.oldOnuData}`}
            </Typography.Text>
            <Typography.Text
              copyable={{
                text: chinaMobileOccupiedOnuReport.newSwitchSerialNumber,
              }}
            >
              {`现交换机码：${chinaMobileOccupiedOnuReport.newSwitchSerialNumber}`}
            </Typography.Text>
            <Typography.Text
              copyable={{ text: chinaMobileOccupiedOnuReport.newOnuData }}
            >
              {`现交ONU数据：${chinaMobileOccupiedOnuReport.newOnuData}`}
            </Typography.Text>
          </Space>
        )}
    </Card>
  );
};

export default ChinaMobileOccupiedOnuReportInfoDetail;
