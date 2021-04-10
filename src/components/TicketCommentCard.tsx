import { Card, CardProps, Typography } from 'antd';
import apiInterface from 'api';
import { FC } from 'react';

const TicketCommentCard: FC<{
  ticket: apiInterface.Ticket;
  cardProps?: CardProps;
}> = ({ ticket, cardProps }) => {
  return (
    <Card title="报修备注" {...cardProps}>
      <Typography.Paragraph
        ellipsis={{ rows: 5, expandable: true, symbol: 'more' }}
      >
        {ticket?.comment}
      </Typography.Paragraph>
    </Card>
  );
};

export default TicketCommentCard;
