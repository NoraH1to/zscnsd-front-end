import { history } from 'umi';
import { userSearch } from '@/api/user';
import {
  dormBlocks,
  reportSwitchFaultSortableList,
  TableFilterType,
} from '@/common';
import { useDialogForm, useInit } from '@/hooks';
import CustomList from '@/mobile/components/CustomList';
import SwitchFaultReportInfoCard from '@/mobile/components/SwitchFaultReportInfoCard';
import apiInterface from 'api';
import { stringify } from 'query-string';
import { FC, useState } from 'react';
import { reportSwitchFaultAdd, reportSwitchFaultList } from '@/api/report';

const DETAIL_PATH = '/m/switch-fault-reports-detail';

const addPropData: componentData.PropData[] = [
  {
    key: 'dormBlock',
    type: TableFilterType.select,
    name: '宿舍楼',
    selectData: dormBlocks,
    rules: [{ required: true }],
  },
  {
    key: 'dormFloor',
    type: TableFilterType.number,
    name: '宿舍楼层',
    rules: [{ required: true }],
  },
  {
    key: 'switchSerialNumber',
    type: TableFilterType.str,
    name: '交换机SN码',
    rules: [{ required: true }],
  },
  {
    key: 'index',
    type: TableFilterType.number,
    name: '交换机位置',
    holder: '从上往下数',
    rules: [{ required: true }],
  },
];

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

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.ReportSwitchFaultAddData>(
    reportSwitchFaultAdd,
    addPropData,
    '提交交换机故障上报',
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
