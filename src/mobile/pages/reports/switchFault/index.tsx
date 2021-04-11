import { history } from '@/.umi/core/history';
import { userSearch } from '@/api/user';
import { reportSwitchFaultSortableList, TableFilterType } from '@/common';
import { useInit } from '@/hooks';
import CustomList from '@/mobile/components/CustomList';
import SwitchFaultReportInfoCard from '@/mobile/components/SwitchFaultReportInfoCard';
import apiInterface from 'api';
import { stringify } from 'query-string';
import { FC, useState } from 'react';
import { reportSwitchFaultList } from '@/api/report';

const DETAIL_PATH = '/m/switch-fault-reports-detail';

const switchFault: FC<{ userId?: number }> = ({ userId }) => {
  // 表单数据
  const [
    formData,
    setFormData,
  ] = useState<apiInterface.ReportSwitchFaultListQuery>({
    page: 1,
    count: 10,
    userId,
  });

  const filters: componentData.PropData[] = [
    {
      key: 'userId',
      type: TableFilterType.selectSearch,
      name: '上报用户',
      selectData: userSearch,
      holder: '姓名/学号/工号',
      searchOption: {
        keyProp: 'id',
        labelProp: 'name',
      },
      hidden: true,
      default: userId,
    },
    {
      key: 'start',
      name: '上报时间起点',
      type: TableFilterType.timeWithoutTime,
    },
    {
      key: 'end',
      name: '上报时间终点',
      type: TableFilterType.timeWithoutTime,
    },
  ];

  // api hooks
  const apiHooks = useInit<apiInterface.ReportSwitchFaultListQuery>(
    reportSwitchFaultList,
    formData,
  );

  return (
    <CustomList
      formData={formData}
      setFormData={setFormData}
      filters={filters}
      apiHooks={apiHooks}
      sortList={reportSwitchFaultSortableList}
      DataComp={SwitchFaultReportInfoCard}
      dataOnClick={(data: apiInterface.ReportSwitchFault) =>
        history.push({
          pathname: DETAIL_PATH,
          search: stringify({ reportId: data.id }),
        })
      }
    />
  );
};

export default switchFault;
