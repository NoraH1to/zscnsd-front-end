import { history } from '@/.umi/core/history';
import { userSearch } from '@/api/user';
import {
  dormBlocks,
  reportWallLineSortableList,
  TableFilterType,
} from '@/common';
import { useDialogForm, useInit } from '@/hooks';
import CustomList from '@/mobile/components/CustomList';
import WallLineReportInfoCard from '@/mobile/components/WallLineReportInfoCard';
import apiInterface from 'api';
import { stringify } from 'query-string';
import { FC, useState } from 'react';
import { reportWallLineAdd, reportWallLineList } from '@/api/report';

const DETAIL_PATH = '/m/wall-line-reports-detail';

const addPropData: componentData.PropData[] = [
  {
    key: 'dormBlock',
    type: TableFilterType.select,
    name: '宿舍楼',
    selectData: dormBlocks,
    rules: [{ required: true }],
  },
  {
    key: 'dormRoom',
    type: TableFilterType.number,
    name: '宿舍房间号',
    rules: [{ required: true }],
  },
  {
    key: 'name',
    type: TableFilterType.str,
    name: '用户姓名',
    rules: [{ required: true }],
  },
  {
    key: 'telephone',
    type: TableFilterType.str,
    name: '用户手机号',
    rules: [{ required: true }],
  },
];

const wallLine: FC<{ userId?: number }> = ({ userId }) => {
  // 表单数据
  const [
    formData,
    setFormData,
  ] = useState<apiInterface.ReportWallLineListQuery>({
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
  const apiHooks = useInit<apiInterface.ReportWallLineListQuery>(
    reportWallLineList,
    formData,
  );

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.ReportWallLineAddData>(
    reportWallLineAdd,
    addPropData,
    '提交主线上报',
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
      sortList={reportWallLineSortableList}
      DataComp={WallLineReportInfoCard}
      dataOnClick={(data: apiInterface.ReportWallLine) =>
        history.push({
          pathname: DETAIL_PATH,
          search: stringify({ reportId: data.id }),
        })
      }
    />
  );
};

export default wallLine;
