import { FC } from 'react';
import DataPanel from './DataPanel';
import TimeTable from '@/mobile/components/Timetable';
import './index.scss';

const home: FC = () => {
  return (
    <div className="home">
      <DataPanel />
      <div className="time-table">
        <TimeTable mobile={false} />
      </div>
    </div>
  );
};

export default home;
