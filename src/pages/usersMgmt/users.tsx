import { FC, useState } from 'react';
import {
  dormBlocks,
  punishments,
  roles,
  TableFilterType,
  ticketDeleted,
  memberSortableList,
  ticketStatus,
  weekDays,
  isps,
} from '@/common';
import {
  useApi,
  useDialogForm,
  useInit,
  useMuitActionDialog,
} from '@/hooks/index';
import {
  ticketAdd,
  ticketDelete,
  ticketEdit,
  ticketFaultMenu,
  ticketList,
  ticketOperate,
} from '@/api/ticket';
import {
  Tooltip,
  TableColumnProps,
  Badge,
  TableProps,
  Row,
  Col,
  Card,
  Space,
  Typography,
} from 'antd';
import apiInterface from 'api';
import { find } from 'ramda';
import CustomTable from '@/components/CustomTable';
import componentData from 'typings';
import { memberAdd, memberDelete, memberEdit, memberList } from '@/api/member';
import {
  userAddAdmin,
  userDelete,
  userEditAdmin,
  userList,
  userSearch,
} from '@/api/user';

const filters: componentData.PropData[] = [
  {
    key: 'name',
    type: TableFilterType.str,
    name: '姓名',
  },
  {
    key: 'studentId',
    type: TableFilterType.str,
    name: '学号',
  },
  {
    key: 'isp',
    type: TableFilterType.select,
    name: '运营商',
    selectData: isps,
  },
  {
    key: 'networkAccount',
    type: TableFilterType.str,
    name: '宽带账号',
  },
  {
    key: 'dormBlock',
    type: TableFilterType.select,
    name: '宿舍楼',
    selectData: dormBlocks,
  },
  {
    key: 'dormRoom',
    type: TableFilterType.number,
    name: '宿舍房间号',
  },
  {
    key: 'telephone',
    type: TableFilterType.str,
    name: '手机号',
  },
];

const addPropData: componentData.PropData[] = [
  {
    key: 'name',
    type: TableFilterType.str,
    name: '姓名',
    rules: [{ required: true }],
  },
  {
    key: 'studentId',
    type: TableFilterType.str,
    name: '学号',
    rules: [{ required: true }],
  },
  {
    key: 'isp',
    type: TableFilterType.select,
    name: '运营商',
    selectData: isps,
    rules: [{ required: true }],
  },
  {
    key: 'networkAccount',
    type: TableFilterType.str,
    name: '宽带账号',
    rules: [{ required: true }],
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
    name: 'ID',
    rules: [{ required: true }],
    hidden: true,
  },
  {
    key: 'name',
    type: TableFilterType.str,
    name: '姓名',
    rules: [{ required: true }],
  },
  {
    key: 'studentId',
    type: TableFilterType.str,
    name: '学号',
    rules: [{ required: true }],
  },
  {
    key: 'isp',
    type: TableFilterType.select,
    name: '运营商',
    selectData: isps,
    rules: [{ required: true }],
  },
  {
    key: 'networkAccount',
    type: TableFilterType.str,
    name: '宽带账号',
    rules: [{ required: true }],
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
    rules: [{ required: true }],
  },
  {
    key: 'telephone',
    type: TableFilterType.number,
    name: '手机号',
    rules: [{ required: true }],
  },
];

const onRow: TableProps<apiInterface.User>['onRow'] = (record) => {
  return {
    onClick: (event) => {
      // TODO: 点击行路由跳转
    }, // 点击行
  };
};

const colums: TableColumnProps<apiInterface.User>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 30,
    fixed: 'left',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 40,
  },
  {
    title: '学号',
    dataIndex: 'studentId',
    width: 50,
  },
  {
    title: '运营商',
    dataIndex: ['isp', 'string'],
    width: 40,
  },
  {
    title: '宽带账号',
    dataIndex: 'networkAccount',
    width: 80,
  },
  {
    title: '宿舍楼',
    dataIndex: ['dormBlock', 'string'],
    width: 50,
  },
  {
    title: '宿舍房间号',
    dataIndex: ['dormRoom'],
    width: 30,
  },
  {
    title: '手机号',
    dataIndex: 'telephone',
    width: 50,
  },
];

const users: FC = () => {
  // 表单数据
  const [formData, setFormData] = useState<apiInterface.UserListQuery>({
    page: 1,
    count: 10,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.UserListQuery>(userList, formData);

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.UserAddAdminData>(
    userAddAdmin,
    addPropData,
    '新增用户',
    () => apiHooks.setLoading(true),
  );

  // 修改接口 hooks
  const apiEditHooks = useDialogForm<apiInterface.UserEditAdminData>(
    userEditAdmin,
    EditPropData,
    '修改用户信息',
    () => apiHooks.setLoading(true),
  );

  // 删除接口 hooks
  const apiDeleteHooks = useApi<apiInterface.UserDeleteData>(
    userDelete,
    undefined,
    () => apiHooks.setLoading(true),
  );

  const muitActions: componentData.MuitActionProp[] = [
    {
      key: 'delete',
      value: '删除',
      propData: [],
      api: userDelete,
    },
  ];

  const apiMuiltActionDialogHooks = useMuitActionDialog(muitActions, () =>
    apiHooks.setLoading(true),
  );

  return (
    <CustomTable
      formData={formData}
      setFormData={setFormData}
      filters={filters}
      colums={colums}
      apiHooks={apiHooks}
      apiAddHooks={apiAddHooks}
      apiDeleteHooks={apiDeleteHooks}
      apiEditHooks={apiEditHooks}
      apiMuiltActionDialogHooks={apiMuiltActionDialogHooks}
      editData={(
        record: apiInterface.User,
      ): apiInterface.UserEditAdminData => ({
        id: record.id,
        name: record.name,
        studentId: record.studentId,
        isp: record.isp.id,
        networkAccount: record.networkAccount,
        dormBlock: record.dormBlock.id,
        dormRoom: record.dormRoom,
        telephone: record.telephone,
      })}
      deleteData={(record: apiInterface.User): apiInterface.UserDeleteData => ({
        id: [record.id],
      })}
      onRow={onRow}
      // sortList={memberSortableList}
    />
  );
};

export default users;
