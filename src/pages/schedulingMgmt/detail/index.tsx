import { FC } from 'react';
import { PageHeader, Tabs } from 'antd';
import { history, IRouteComponentProps } from 'umi';
import WorkArrangementComp from './WorkArrangement';
import WorkChange from './WorkChange';
import MemberTimetable from './MemberTimetable'

const detail: FC<IRouteComponentProps> = (props) => {
  const { params }: { params: { id?: number } } = props.match;
  return (
    <>
      <PageHeader
        style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}
        onBack={() => history.goBack()}
        title="值班学期详情"
      />
      <Tabs>
        <Tabs.TabPane tab="排班表" key="0">
          <WorkArrangementComp semesterId={params?.id} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="值班变动" key="1">
          <WorkChange semesterId={params?.id || 0} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="成员课程表收集" key="2">
          <MemberTimetable semesterId={params?.id || 0} />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default detail;
