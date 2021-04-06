import { weekDays } from '@/common';
import { Tag } from 'antd';
import { find } from 'ramda';
import { FC } from 'react';

const WeekdayTags: FC<{ weekdays: number[] }> = ({ weekdays }) => (
  <>
    {weekdays.map((day) => (
      <Tag color="cyan" key={`weekday-tag-${day}`}>
        {find((weekday) => weekday.id == day, weekDays)?.string}
      </Tag>
    ))}
  </>
);

export default WeekdayTags;
