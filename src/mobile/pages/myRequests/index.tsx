import { history } from 'umi';
import { ticketAddUser, ticketListUser } from '@/api/ticket';
import { ticketFaultMenuList } from '@/api/ticketFaultMenu';
import { TableFilterType, ticketSortableList, ticketStatus } from '@/common';
import { useDialogForm, useInit } from '@/hooks';
import CustomList from '@/mobile/components/CustomList';
import PageContainer from '@/mobile/components/PageContainer';
import RequestsInfoCard from '@/mobile/components/RequestInfoCard';
import apiInterface from 'api';
import { stringify } from 'query-string';
import { FC, useState } from 'react';

const DETAIL_PATH = '/m/my-requests/detail';

const filters: componentData.PropData[] = [
  {
    key: 'status',
    type: TableFilterType.select,
    name: '报修状态',
    selectData: ticketStatus,
  },
  {
    key: 'faultType',
    type: TableFilterType.select,
    name: '报修故障类型',
    selectData: ticketFaultMenuList,
  },
  {
    key: 'start',
    name: '报修提交时间起点',
    type: TableFilterType.timeWithoutTime,
  },
  {
    key: 'end',
    name: '报修提交时间终点',
    type: TableFilterType.timeWithoutTime,
  },
];

const addPropData: componentData.PropData[] = [
  {
    key: 'faultType',
    type: TableFilterType.select,
    name: '报修故障类型',
    selectData: ticketFaultMenuList,
    rules: [{ required: true }],
  },
  {
    key: 'comment',
    type: TableFilterType.str,
    name: '备注',
    rules: [{ required: true }],
  },
];

const myRequests: FC = () => {
  // 表单数据
  const [formData, setFormData] = useState<apiInterface.TicketListUserQuery>({
    page: 1,
    count: 10,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.TicketListUserQuery>(
    ticketListUser,
    formData,
  );

  // 添加接口 hooks
  const apiAddHooks = useDialogForm<apiInterface.TicketAddUserData>(
    ticketAddUser,
    addPropData,
    '提交移动无数据上报',
    () => {
      formData.page = 1;
      apiHooks.setParams(formData);
      apiHooks.setLoading(true);
    },
  );

  return (
    <PageContainer title="我的报修">
      <CustomList
        formData={formData}
        setFormData={setFormData}
        filters={filters}
        apiHooks={apiHooks}
        apiAddHooks={apiAddHooks}
        addBtnText="提交"
        sortList={ticketSortableList}
        DataComp={RequestsInfoCard}
        dataOnClick={(data: apiInterface.Ticket) =>
          history.push({
            pathname: DETAIL_PATH,
            search: stringify({ ticketId: data.id }),
          })
        }
      />
    </PageContainer>
  );
};

export default myRequests;
