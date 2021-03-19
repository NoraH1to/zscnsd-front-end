import { Tabs } from 'antd';
import { FC } from 'react';
import Undeleted from './RequestsUnDeleted';
import Deleted from './requestsDeleted';

const requests: FC = () => (
  <Tabs>
    <Tabs.TabPane tab="未删除" key="undeleted">
      <Undeleted />
    </Tabs.TabPane>
    <Tabs.TabPane tab="已删除" key="deleted">
      <Deleted />
    </Tabs.TabPane>
  </Tabs>
);

export default requests;
