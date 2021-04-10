import { ticketStatus } from '@/common';
import apiInterface from 'api';
import { find, propEq } from 'ramda';
import { FC } from 'react';
import { Badge } from 'antd';

const TicketStatusComponent: FC<{
  ticket:
    | apiInterface.Ticket
    | apiInterface.IspTicket
    | apiInterface.TicketLog
    | apiInterface.IspTicketLog;
}> = ({ ticket }) => {
  const status =
    find<apiInterface.TicketStatusExtra>(propEq('id', ticket.status.id))(
      ticketStatus,
    )?.status || 'default';
  const text = ticket.status.string;
  return <Badge status={status} text={text} />;
};

export default TicketStatusComponent;
