import { formatDate } from '@/utils';
import { Card, CardProps, Space, Typography } from 'antd';
import { FC } from 'react';

const WallLineReportInfoDetail: FC<{
  wallLineReport: apiInterface.ReportWallLine;
  cardProps?: CardProps;
}> = ({ wallLineReport, cardProps }) => {
  return (
    <Card
      hoverable
      title={
        !!wallLineReport
          ? formatDate(wallLineReport.createTime, true)
          : '加载中'
      }
      loading={!wallLineReport}
      {...cardProps}
    >
      {!!wallLineReport && Object.keys(wallLineReport).length > 0 && (
        <Space direction="vertical">
          <Typography.Text>
            {`宿舍楼-房间号：${wallLineReport.dormBlock.string}-${wallLineReport.dormRoom}`}
          </Typography.Text>
          <Typography.Text>{`用户姓名：${wallLineReport.name}`}</Typography.Text>
          <Typography.Text copyable={{ text: wallLineReport.telephone }}>
            {`用户手机号：${wallLineReport.telephone}`}
          </Typography.Text>
        </Space>
      )}
    </Card>
  );
};

export default WallLineReportInfoDetail;
