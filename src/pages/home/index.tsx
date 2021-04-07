import { FC } from 'react';
import DataPanel from './DataPanel';
import TimeTable from './TimeTable';
import './index.scss';

const home: FC = () => {
  return (
    <div className="home">
      <DataPanel />
      <div className="time-table">
        <TimeTable />
      </div>
    </div>
  );
};

export default home;
