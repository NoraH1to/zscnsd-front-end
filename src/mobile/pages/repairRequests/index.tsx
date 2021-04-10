import { history } from '@/.umi/core/history';
import { ispTicketAdd, ispTicketList } from '@/api/ispTicket';
import { ticketList } from '@/api/ticket';
import { ticketFaultMenuList } from '@/api/ticketFaultMenu';
import { userSearch } from '@/api/user';
import {
  dormBlocks,
  ispTicketSortableList,
  TableFilterType,
  ticketDeleted,
  ticketStatus,
} from '@/common';
import { useInit } from '@/hooks';
import CustomList from '@/mobile/components/CustomList';
import PageContainer from '@/mobile/components/PageContainer';
import RequestsInfoCard from '@/mobile/components/RequestInfoCard';
import { formatDate } from '@/utils';
import { Card } from 'antd';
import apiInterface from 'api';
import { stringify } from 'query-string';
import { FC, useState } from 'react';

const DETAIL_PATH = '/m/repair-requests/detail';

const filters: componentData.PropData[] = [
  {
    key: 'userId',
    type: TableFilterType.selectSearch,
    name: '报修用户',
    selectData: userSearch,
    holder: '姓名/学号/工号',
    searchOption: {
      keyProp: 'id',
      labelProp: 'name',
    },
  },
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
    key: 'dormBlock',
    type: TableFilterType.select,
    name: '宿舍楼',
    selectData: dormBlocks,
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
  {
    key: 'deleted',
    type: TableFilterType.select,
    name: '删除',
    selectData: ticketDeleted,
    default: 'false',
    rules: [{ required: true }],
    hidden: true,
  },
  {
    key: 'operatorId',
    type: TableFilterType.selectSearch,
    name: '处理人',
    selectData: userSearch,
    holder: '姓名/学号/工号',
    searchOption: {
      keyProp: 'id',
      labelProp: 'name',
    },
  },
];

const repairReuqests: FC = () => {
  // 表单数据
  const [formData, setFormData] = useState<apiInterface.TicketListQuery>({
    page: 1,
    count: 10,
    deleted: false,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.TicketListQuery>(ticketList, formData);

  return (
    <PageContainer title="报修处理">
      <CustomList
        formData={formData}
        setFormData={setFormData}
        filters={filters}
        apiHooks={apiHooks}
        sortList={ispTicketSortableList}
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

export default repairReuqests;
