import { ticketLogList } from '@/api/ticket';
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
  });

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
        filters={[]}
        apiHooks={apiHooks}
        DataComp={RequestRecordInfoCard}
      />
    </PageContainer>
  );
};

export default records;
