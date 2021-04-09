import { history } from 'umi';
import Card from '@/mobile/components/Card';
import CardListContainer from '@/mobile/components/Card/CardListContainer';
import { WhiteSpace } from 'antd-mobile';
import { FC } from 'react';
import './index.scss';
import PageContainer from '@/mobile/components/PageContainer';

const MY_REQUESTS_PATH = '/m/my-requests';

const home: FC = () => {
  const cards = [
    <Card
      key="card-my-requests"
      onClick={() => history.push(MY_REQUESTS_PATH)}
      text="我的报修"
      textColor="#F8ECCF"
      bgColor="#4E65E5"
    />,
  ];
  return (
    <PageContainer title="首页">
      <CardListContainer cards={cards} />
      <WhiteSpace />
    </PageContainer>
  );
};

export default home;
