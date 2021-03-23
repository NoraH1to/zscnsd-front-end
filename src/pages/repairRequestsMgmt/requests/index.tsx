import { Tabs } from 'antd';
import { FC, useState } from 'react';
import Undeleted from './RequestsUnDeleted';
import Deleted from './requestsDeleted';
import { useRealLocation } from '@/hooks';

const requests: FC = () => {
  const localtion = useRealLocation();
  const { tab, ...defaultProps } = localtion.query;
  const [activeKey, setActiveKey] = useState(
    typeof tab == 'string' ? tab : 'undeleted',
  );
  return (
    <Tabs onChange={setActiveKey} activeKey={activeKey}>
      <Tabs.TabPane tab="未删除" key="undeleted">
        <Undeleted
          defaultFormData={tab == 'undeleted' ? defaultProps : undefined}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="已删除" key="deleted">
        <Deleted
          defaultFormData={tab == 'deleted' ? defaultProps : undefined}
        />
      </Tabs.TabPane>
    </Tabs>
  );
};

// TODO： 根据路由传参

export default requests;
