import { FC } from 'react';
import { Card, Typography, Space } from 'antd';
import { CUDTime } from 'api';
import { formatDate } from '@/utils';

const TimeCardCom: FC<{ data: CUDTime; title?: string | number | null }> = ({
  data,
  title,
}) => {
  return (
    <Card title={title || '杂项'}>
      <Space direction="vertical">
        {data.createTime && (
          <Typography.Text>
            {`创建时间：${formatDate(data.createTime)}`}
          </Typography.Text>
        )}
        {data.updateTime && (
          <Typography.Text>
            {`更新时间：${formatDate(data.updateTime)}`}
          </Typography.Text>
        )}
        {data.deleteTime && (
          <Typography.Text>
            {`删除时间：${formatDate(data.deleteTime)}`}
          </Typography.Text>
        )}
      </Space>
    </Card>
  );
};

export default TimeCardCom;
