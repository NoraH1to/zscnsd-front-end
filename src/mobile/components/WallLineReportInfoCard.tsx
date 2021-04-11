import { formatDate } from '@/utils';
import { Card, Space, Typography } from 'antd';
import apiInterface from 'api';
import { FC } from 'react';
import { InfoCardProp } from 'typings';

const WallLineReportInfoCard: FC<InfoCardProp> = (props) => {
  const { onClick } = props;
  const { data }: { data: apiInterface.ReportWallLine } = props;
  return (
    <Card onClick={onClick} hoverable title={formatDate(data.createTime, true)}>
      <Space direction="vertical">
        <Typography.Text>
          {`宿舍楼-房间号：${data.dormBlock.string}-${data.dormRoom}`}
        </Typography.Text>
        <Typography.Text>{`用户姓名：${data.name}`}</Typography.Text>
        <Typography.Text copyable={{ text: data.telephone }}>
          {`用户手机号：${data.telephone}`}
        </Typography.Text>
      </Space>
    </Card>
  );
};

export default WallLineReportInfoCard;
