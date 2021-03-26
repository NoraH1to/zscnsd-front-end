import { FC, useState } from 'react';
import {
  dormBlocks,
  reportWallLineSortableList,
  TableFilterType,
} from '@/common';
import {
  useApi,
  useDialogForm,
  useInit,
  useMuitActionDialog,
} from '@/hooks/index';
import { TableColumnProps, TableProps, Button } from 'antd';
import apiInterface from 'api';
import CustomTable, { dateTimeCell, goMemberCenterCell } from '@/components/CustomTable';
import componentData from 'typings';
import { userSearch } from '@/api/user';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  reportWallLineAdd,
  reportWallLineDelete,
  reportWallLineEdit,
  reportWallLineList,
} from '@/api/report';

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
  },
  {
    key: 'submitTimeRange',
    type: TableFilterType.timeRange,
    name: '上报时间范围',
    timeRange: {
      rangeStartProp: 'start',
      rangeEndProp: 'end',
    },
  },
];

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
    rules: [{ required: true }, { min: 1, type: 'number' }],
  },
  {
    key: 'name',
    type: TableFilterType.str,
    name: '姓名',
    rules: [{ required: true }],
  },
  {
    key: 'telephone',
    type: TableFilterType.str,
    name: '手机号',
    rules: [{ required: true }],
  },
];

const EditPropData: componentData.PropData[] = [
  {
    key: 'id',
    type: TableFilterType.number,
    name: '上报ID',
    rules: [{ required: true }],
    hidden: true,
  },
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
    rules: [{ required: true }, { min: 1, type: 'number' }],
  },
  {
    key: 'name',
    type: TableFilterType.str,
    name: '姓名',
    rules: [{ required: true }],
  },
  {
    key: 'telephone',
    type: TableFilterType.str,
    name: '手机号',
    rules: [{ required: true }],
  },
];

const colums: TableColumnProps<apiInterface.ReportWallLine>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    fixed: 'left',
  },
  {
    title: '上报人姓名-工号',
    render: (value, record, index) => goMemberCenterCell(record.user),
    width: 140,
  },
  {
    title: '宿舍楼栋',
    dataIndex: ['dormBlock', 'string'],
    width: 110,
  },
  {
    title: '宿舍房间号',
    dataIndex: 'dormRoom',
    width: 110,
  },
  {
    title: '用户姓名',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '用户手机号',
    dataIndex: 'telephone',
    width: 120,
  },
  {
    title: '上报时间',
    dataIndex: 'createTime',
    render: (value, record, index) => dateTimeCell([value]),
    width: 160,
  },
];

const wallLine: FC = () => {
  // 表单数据
  const [
    formData,
    setFormData,
  ] = useState<apiInterface.ReportWallLineListQuery>({
    page: 1,
    count: 10,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.ReportWallLineListQuery>(
    reportWallLineList,
    formData,
  );

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.ReportWallLineAddData>(
    reportWallLineAdd,
    addPropData,
    '新增主线上报',
    () => apiHooks.setLoading(true),
  );

  const muitActions: componentData.MuitActionProp[] = [
    {
      key: 'delete',
      value: '删除',
      propData: [],
      api: reportWallLineDelete,
    },
  ];

  const apiMuiltActionDialogHooks = useMuitActionDialog(muitActions, () =>
    apiHooks.setLoading(true),
  );

  const onRow: TableProps<apiInterface.ReportWallLine>['onRow'] = (record) => {
    return {
      onClick: (event) => {
        // TODO: 点击行路由跳转
      }, // 点击行
    };
  };

  const actions: componentData.CustomTableAction[] = [
    {
      key: 'edit',
      text: '编辑',
      icon: <EditOutlined />,
      hooks: {
        api: reportWallLineEdit,
        propData: EditPropData,
        title: '编辑主线上报',
        onSubmit: () => apiHooks.setLoading(true),
      },
      apiParamKeys: (record: apiInterface.ReportWallLine) => ({
        id: record.id,
        dormBlock: record.dormBlock.id,
        dormRoom: record.dormRoom,
        name: record.name,
        telephone: record.telephone,
      }),
      type: 'dialog',
    },
    {
      key: 'delete',
      text: '删除',
      icon: <DeleteOutlined />,
      hooks: useApi(reportWallLineDelete, undefined, () =>
        apiHooks.setLoading(true),
      ),
      apiParamKeys: (record: apiInterface.ReportWallLine) => ({
        id: [record.id],
      }),
      type: 'api',
      btnProps: {
        danger: true,
      },
    },
  ];

  // TODO: 导出excel
  const ExportBtn = (
    <Button onClick={() => {}} type="dashed">
      导出结果为Excel
    </Button>
  );

  return (
    <CustomTable
      formData={formData}
      setFormData={setFormData}
      filters={filters}
      colums={colums}
      apiHooks={apiHooks}
      apiAddHooks={apiAddHooks}
      apiMuiltActionDialogHooks={apiMuiltActionDialogHooks}
      actions={actions}
      sortList={reportWallLineSortableList}
      extraComponent={{ Right: ExportBtn }}
    />
  );
};

export default wallLine;
