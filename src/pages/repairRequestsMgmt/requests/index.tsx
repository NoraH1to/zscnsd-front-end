import { Tabs } from 'antd';
import { FC } from 'react';
import Undeleted from './RequestsUnDeleted';
import Deleted from './requestsDeleted';
import { useLocation } from '@umijs/runtime';

const requests: FC = () => {
  const localtion = useLocation();
  const {} = location
  return (
    <Tabs>
      <Tabs.TabPane tab="未删除" key="undeleted">
        <Undeleted />
      </Tabs.TabPane>
      <Tabs.TabPane tab="已删除" key="deleted">
        <Deleted />
      </Tabs.TabPane>
    </Tabs>
  );
};

// TODO： 根据路由传参

export default requests;
