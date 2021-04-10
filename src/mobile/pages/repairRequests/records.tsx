import { ticketLogList } from '@/api/ticket';
import { ticketFaultMenuList } from '@/api/ticketFaultMenu';
import { userSearch } from '@/api/user';
import {
  dormBlocks,
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
  // 表单数据
  const [formData, setFormData] = useState<apiInterface.TicketLogListQuery>({
    page: 1,
    count: 10,
    ticketId,
    deleted: false,
  });

  const filters: componentData.PropData[] = [
    {
      key: 'ticketId',
      type: TableFilterType.number,
      name: '报修ID',
      default: ticketId,
    },
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
      name: '报修已删除',
      selectData: ticketDeleted,
      default: false,
    },
  ];

  // api hooks
  const apiHooks = useInit<apiInterface.TicketListQuery>(
    ticketLogList,
    formData,
  );

  return (
    <PageContainer title="报修处理记录">
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
