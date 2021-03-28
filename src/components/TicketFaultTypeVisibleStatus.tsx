import apiInterface from 'api';
import { FC } from 'react';
import { Badge } from 'antd';

const TicketFaultTypeVisibleStatusComp: FC<{
  ticketFaultType: apiInterface.TicketFaultMenu;
}> = ({ ticketFaultType }) => {
  if (ticketFaultType.visible) return <Badge text="可见" status="processing" />;
  else return <Badge text="不可见" status="default" />;
};

export default TicketFaultTypeVisibleStatusComp;
