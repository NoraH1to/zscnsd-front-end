import { Tabs } from 'antd';
import { FC, useState } from 'react';
import Undeleted from './RequestsUnDeleted';
import Deleted from './RequestsDeleted';
import { useRealLocation } from '@/hooks';
import apiInterface from 'api';

const requests: FC<{ defaultFormData: apiInterface.TicketListQuery }> = ({
  defaultFormData,
}) => {
  const localtion = useRealLocation();
  const { tab, ...defaultProps } = localtion.query;
  const [activeKey, setActiveKey] = useState(
    typeof tab == 'string' ? tab : 'undeleted',
  );
  const _defaultFormData = defaultFormData || defaultProps;
  return (
    <Tabs onChange={setActiveKey} activeKey={activeKey}>
      <Tabs.TabPane tab="未删除" key="undeleted">
        <Undeleted defaultFormData={_defaultFormData} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="已删除" key="deleted">
        <Deleted defaultFormData={_defaultFormData} />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default requests;
