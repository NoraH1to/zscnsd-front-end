import { ispTicketLogList } from '@/api/ispTicket';
import { userSearch } from '@/api/user';
import {
  TableFilterType,
  ticketDeleted,
  ticketLogSortableList,
  ticketStatus,
} from '@/common';
import { useInit, useRealLocation } from '@/hooks';
import CustomList from '@/mobile/components/CustomList';
import PageContainer from '@/mobile/components/PageContainer';
import RequestRecordInfoCard from '@/mobile/components/RequestRecordInfoCard';
import { FC, useState } from 'react';

const records: FC = () => {
  const location = useRealLocation();
  const ticketId = parseInt(location.query.ticketId?.toString() || '-1');
  // 工单数据
  const [formData, setFormData] = useState<apiInterface.IspTicketLogListQuery>({
    page: 1,
    count: 10,
    ticketId,
    deleted: false,
  });

  const filters: componentData.PropData[] = [
    {
      key: 'ticketId',
      type: TableFilterType.number,
      name: '工单ID',
      default: ticketId,
    },
    {
      key: 'status',
      type: TableFilterType.select,
      name: '工单状态',
      selectData: ticketStatus,
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
    {
      key: 'start',
      name: '处理时间起点',
      type: TableFilterType.timeWithoutTime,
    },
    {
      key: 'end',
      name: '处理时间终点',
      type: TableFilterType.timeWithoutTime,
    },
    {
      key: 'deleted',
      type: TableFilterType.select,
      name: '工单已删除',
      selectData: ticketDeleted,
    },
  ];

  // api hooks
  const apiHooks = useInit<apiInterface.IspTicketListQuery>(
    ispTicketLogList,
    formData,
  );

  return (
    <PageContainer title="工单处理记录">
      <CustomList
        formData={formData}
        setFormData={setFormData}
        filters={filters}
        apiHooks={apiHooks}
        sortList={ticketLogSortableList}
        DataComp={RequestRecordInfoCard}
      />
    </PageContainer>
  );
};

export default records;
