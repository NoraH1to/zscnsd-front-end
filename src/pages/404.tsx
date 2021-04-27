import { Empty, Typography } from 'antd';
import { FC } from 'react';
import { history } from 'umi';

const _404: FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        minHeight: '200px',
      }}
    >
      <Empty
        style={{
          width: '100%',
          top: '50%',
          position: 'absolute',
          transform: 'translateY(-50%)',
          margin: '0 0',
        }}
        description={
          <Typography.Title level={2}>页面不存在</Typography.Title>
        }
      >
        <Typography.Link onClick={() => history.goBack()}>
          返回上一页
        </Typography.Link>
      </Empty>
    </div>
  );
};

export default _404;
