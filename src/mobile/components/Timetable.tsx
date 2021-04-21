import { FC, useState } from 'react';
import TimeTable from '@/pages/home/TimeTable';
import { WhiteSpace } from 'antd-mobile';
import { Button } from 'antd';
import moment from 'moment';
import { dateformatOut } from '@/utils';

const timetable: FC<{ mobile?: boolean }> = ({ mobile = true }) => {
  const [date, setDate] = useState<any>(moment().format(dateformatOut));
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button
          onClick={() =>
            setDate(moment(date).subtract(7, 'days').format(dateformatOut))
          }
        >
          上一周
        </Button>
        <span>
          {`${moment(date)
            .subtract(moment(date).isoWeekday() - 1, 'days')
            .format(dateformatOut)} 至 ${moment(date)
            .add(7 - moment(date).isoWeekday(), 'days')
            .format(dateformatOut)}`}
        </span>
        <Button
          onClick={() =>
            setDate(moment(date).add(7, 'days').format(dateformatOut))
          }
        >
          下一周
        </Button>
      </div>
      <WhiteSpace />
      <TimeTable mobile={mobile} date={date} />
      <WhiteSpace />
    </>
  );
};

export default timetable;
