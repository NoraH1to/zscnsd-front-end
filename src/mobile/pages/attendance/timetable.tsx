import { FC, useState } from 'react';
import TimeTable from '@/pages/home/TimeTable';
import PageContainer from '@/mobile/components/PageContainer';
import { WhiteSpace } from 'antd-mobile';
import { Button } from 'antd';
import moment from 'moment';
import update from 'immutability-helper';
import { dateformatOut } from '@/utils';

const timetable: FC = () => {
  const [date, setDate] = useState<any>(moment().format(dateformatOut));
  return (
    <PageContainer title="值班表">
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
      <TimeTable mobile={true} date={date} />
      <WhiteSpace />
    </PageContainer>
  );
};

export default timetable;
