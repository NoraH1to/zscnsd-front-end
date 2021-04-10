import { history } from 'umi';
import { ispTicketList } from '@/api/ispTicket';
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
import apiInterface from 'api';
import { stringify } from 'query-string';
import { FC, useState } from 'react';
import IspRequestInfoCard from '@/mobile/components/IspRequestInfoCard';

const filters: componentData.PropData[] = [
  {
    key: 'status',
    type: TableFilterType.select,
    name: '工单状态',
    selectData: ticketStatus,
  },
  {
    key: 'name',
    type: TableFilterType.str,
    name: '姓名',
  },
  {
    key: 'dormBlock',
    type: TableFilterType.select,
    name: '宿舍楼',
    selectData: dormBlocks,
  },
  {
    key: 'start',
    name: '工单提交时间起点',
    type: TableFilterType.timeWithoutTime,
  },
  {
    key: 'end',
    name: '工单提交时间终点',
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

const DETAIL_PATH = '/m/isp-requests/detail';

const ispReuqests: FC = () => {
  // 表单数据
  const [formData, setFormData] = useState<apiInterface.IspTicketListQuery>({
    page: 1,
    count: 10,
    deleted: false,
  });

  // api hooks
  const apiHooks = useInit<apiInterface.IspTicketListQuery>(
    ispTicketList,
    formData,
  );

  return (
    <PageContainer title="工单管理">
      <CustomList
        formData={formData}
        setFormData={setFormData}
        filters={filters}
        apiHooks={apiHooks}
        sortList={ispTicketSortableList}
        DataComp={IspRequestInfoCard}
        dataOnClick={(data: apiInterface.IspTicket) =>
          history.push({
            pathname: DETAIL_PATH,
            search: stringify({ ispTicketId: data.id }),
          })
        }
      />
    </PageContainer>
  );
};

export default ispReuqests;
