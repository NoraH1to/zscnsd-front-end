import { workSemesterCollecting } from '@/common';
import apiInterface from 'api';
import { find, propEq } from 'ramda';
import { FC } from 'react';
import { Badge } from 'antd';

const WorkSemesterCollectingStatusComponent: FC<{
  workSemester: apiInterface.WorkSemester;
}> = ({ workSemester }) => {
  const target = find<apiInterface.WorkSemesterCollectingExtra>(
    propEq('id', workSemester.collectingTimetable),
  )(workSemesterCollecting);
  const status = target?.status || 'default';
  const text = target?.string || '_null';
  return <Badge status={status} text={text} />;
};

export default WorkSemesterCollectingStatusComponent;
