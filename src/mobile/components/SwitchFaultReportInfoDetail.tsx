import TicketStatusComponent from '@/components/TicketStatusComp';
import { formatDate } from '@/utils';
import { Card, CardProps, Space, Typography } from 'antd';
import { FC } from 'react';

const SwitchFaultReportInfoDetail: FC<{
  switchFaultReport: apiInterface.ReportSwitchFault;
  cardProps?: CardProps;
}> = ({ switchFaultReport, cardProps }) => {
  return (
    <Card
      hoverable
      title={
        !!switchFaultReport
          ? formatDate(switchFaultReport.createTime, true)
          : '加载中'
      }
      loading={!switchFaultReport}
      {...cardProps}
    >
      {!!switchFaultReport && Object.keys(switchFaultReport).length > 0 && (
        <Space direction="vertical">
          <Typography.Text>
            {`宿舍楼-楼层：${switchFaultReport.dormBlock.string}-${switchFaultReport.dormFloor}层`}
          </Typography.Text>
          <Typography.Text
            copyable={{ text: switchFaultReport.switchSerialNumber }}
          >
            {`交换机SN码：${switchFaultReport.switchSerialNumber}`}
          </Typography.Text>
          <Typography.Text>
            {`交换机位置（从上往下）：${switchFaultReport.index}`}
          </Typography.Text>
        </Space>
      )}
    </Card>
  );
};

export default SwitchFaultReportInfoDetail;
