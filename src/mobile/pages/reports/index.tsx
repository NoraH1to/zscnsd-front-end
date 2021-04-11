import PageContainer from '@/mobile/components/PageContainer';
import { Tabs } from 'antd';
import TabsProps from 'antd-mobile/lib/tabs/PropsType';
import { FC, useContext } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import './index.scss';
import WallLine from './wallLine';
import SwitchFault from './switchFault';
import ChinaMobileNoData from './chinaMobileNoData';
import ChinaMobileOccupiedOnu from './chinaMobileOccupiedOnu';
import { mobileAuthContext } from '@/mobile/wrappers/Auth/mobileAuthContext';

const { TabPane } = Tabs;

const renderTabBar: (
  props: any,
  DefaultTabBar: React.ComponentType,
) => React.ReactElement = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar
        {...props}
        className="m-sticky-tab-bar"
        style={{ ...style }}
      />
    )}
  </Sticky>
);

const reports: FC = () => {
  const userContext = useContext(mobileAuthContext);
  return (
    <PageContainer title="上报管理">
      <StickyContainer>
        <Tabs
          animated={{ inkBar: true, tabPane: true }}
          size="large"
          defaultActiveKey="1"
          renderTabBar={renderTabBar}
        >
          <TabPane tab="主线" key="1">
            <WallLine userId={userContext.user?.id} />
          </TabPane>
          <TabPane tab="交换机故障" key="2">
            <SwitchFault userId={userContext.user?.id} />
          </TabPane>
          <TabPane tab="移动无数据" key="3">
            <ChinaMobileNoData userId={userContext.user?.id} />
          </TabPane>
          <TabPane tab="移动 ONU 被占" key="4">
            <ChinaMobileOccupiedOnu userId={userContext.user?.id} />
          </TabPane>
        </Tabs>
      </StickyContainer>
    </PageContainer>
  );
};

export default reports;
