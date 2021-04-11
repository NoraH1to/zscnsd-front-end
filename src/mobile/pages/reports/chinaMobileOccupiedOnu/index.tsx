import { history } from '@/.umi/core/history';
import { userSearch } from '@/api/user';
import {
  reportChinaMobileOccupiedOnuSortableList,
  TableFilterType,
} from '@/common';
import { useDialogForm, useInit } from '@/hooks';
import CustomList from '@/mobile/components/CustomList';
import ChinaMobileOccupiedOnuReportInfoCard from '@/mobile/components/ChinaMobileOccupiedOnuReportInfoCard';
import apiInterface from 'api';
import { stringify } from 'query-string';
import { FC, useState } from 'react';
import {
  reportChinaMobileOccupiedOnuAdd,
  reportChinaMobileOccupiedOnuList,
} from '@/api/report';

const DETAIL_PATH = '/m/china-mobile-occupied-onu-reports-detail';

const addPropData: componentData.PropData[] = [
  {
    key: 'oldSwitchSerialNumber',
    type: TableFilterType.str,
    name: '原交换机SN码',
    rules: [{ required: true }],
  },
  {
    key: 'oldOnuData',
    type: TableFilterType.str,
    name: '原ONU数据',
    rules: [{ required: true }],
  },
  {
    key: 'newSwitchSerialNumber',
    type: TableFilterType.str,
    name: '现交换机SN码',
    rules: [{ required: true }],
  },
  {
    key: 'newOnuData',
    type: TableFilterType.str,
    name: '现ONU数据',
    rules: [{ required: true }],
  },
];

const chinaMobileOccupiedOnu: FC<{ userId?: number }> = ({ userId }) => {
  // 表单数据
  const [
    formData,
    setFormData,
  ] = useState<apiInterface.ReportChinaMobileOccupiedOnuListQuery>({
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
  const apiHooks = useInit<apiInterface.ReportChinaMobileOccupiedOnuListQuery>(
    reportChinaMobileOccupiedOnuList,
    formData,
  );

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.ReportChinaMobileOccupiedOnuAddData>(
    reportChinaMobileOccupiedOnuAdd,
    addPropData,
    '提交移动ONU被占上报',
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
      sortList={reportChinaMobileOccupiedOnuSortableList}
      DataComp={ChinaMobileOccupiedOnuReportInfoCard}
      dataOnClick={(data: apiInterface.ReportSwitchFault) =>
        history.push({
          pathname: DETAIL_PATH,
          search: stringify({ reportId: data.id }),
        })
      }
    />
  );
};

export default chinaMobileOccupiedOnu;
