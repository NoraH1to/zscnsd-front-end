import { Tabs } from 'antd';
import { FC } from 'react';
import MemberTimetable from './MemberTimetable';
import MemberUnUpload from './MemberUnUpload';

const index: FC<{ semesterId: number }> = ({ semesterId }) => {
  return (
    <Tabs>
      <Tabs.TabPane tab="已提交" key="hasUpload">
        <MemberTimetable semesterId={semesterId} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="未提交" key="hasNotUpload">
        <MemberUnUpload semesterId={semesterId} />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default index;
