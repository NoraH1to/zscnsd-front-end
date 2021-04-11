import { history } from '@/.umi/core/history';
import { userSearch } from '@/api/user';
import {
  reportChinaMobileNoDataSortableList,
  reportSwitchFaultSortableList,
  TableFilterType,
} from '@/common';
import { useDialogForm, useInit } from '@/hooks';
import CustomList from '@/mobile/components/CustomList';
import ChinaMobileNoDataReportInfoCard from '@/mobile/components/ChinaMobileNoDataReportInfoCard';
import apiInterface from 'api';
import { stringify } from 'query-string';
import { FC, useState } from 'react';
import {
  reportChinaMobileNoDataAdd,
  reportChinaMobileNoDataList,
} from '@/api/report';

const DETAIL_PATH = '/m/china-mobile-no-data-reports-detail';

const addPropData: componentData.PropData[] = [
  {
    key: 'networkAccount',
    type: TableFilterType.str,
    name: '用户宽带账号',
    rules: [{ required: true }],
  },
  {
    key: 'switchSerialNumber',
    type: TableFilterType.str,
    name: '交换机SN码',
    rules: [{ required: true }],
  },
  {
    key: 'onuData',
    type: TableFilterType.str,
    name: 'ONU数据',
    rules: [{ required: true }],
  },
];

const chinaMobileNoData: FC<{ userId?: number }> = ({ userId }) => {
  // 表单数据
  const [
    formData,
    setFormData,
  ] = useState<apiInterface.ReportChinaMobileNoDataListQuery>({
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
  const apiHooks = useInit<apiInterface.ReportChinaMobileNoDataListQuery>(
    reportChinaMobileNoDataList,
    formData,
  );

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.ReportChinaMobileNoDataAddData>(
    reportChinaMobileNoDataAdd,
    addPropData,
    '提交移动无数据上报',
    () => {
      formData.page = 1;
      apiHooks.setParams(formData);
      apiHooks.setLoading(true);
    },
  );

  return (
    <CustomList
      formData={formData}
      setFormData={setFormData}
      filters={filters}
      apiHooks={apiHooks}
      apiAddHooks={apiAddHooks}
      addBtnText="提交"
      sortList={reportChinaMobileNoDataSortableList}
      DataComp={ChinaMobileNoDataReportInfoCard}
      dataOnClick={(data: apiInterface.ReportChinaMobileNoData) =>
        history.push({
          pathname: DETAIL_PATH,
          search: stringify({ reportId: data.id }),
        })
      }
    />
  );
};

export default chinaMobileNoData;
