import { FC } from 'react';
import TimeTable from '@/mobile/components/Timetable';
import PageContainer from '@/mobile/components/PageContainer';

const timetable: FC = () => (
  <PageContainer title="值班表">
    <TimeTable />
  </PageContainer>
);

export default timetable;
