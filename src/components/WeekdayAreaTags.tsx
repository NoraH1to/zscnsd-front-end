import { weekDays } from '@/common';
import { Tag } from 'antd';
import apiInterface from 'api';
import { find } from 'ramda';
import { FC } from 'react';

const WeekdayAreaTags: FC<{
  weekdayAreas: { weekday: number; area: apiInterface.Area }[];
}> = ({ weekdayAreas }) => (
  <>
    {weekdayAreas.map((data) => (
      <Tag
        color="cyan"
        key={`weekday-tag-${data.weekday}`}
        onClick={(e) => e.stopPropagation()}
      >
        {[find((weekday) => weekday.id == data.weekday, weekDays)?.string]
          .concat(data.area.string)
          .join(' | ')}
      </Tag>
    ))}
  </>
);

export default WeekdayAreaTags;
