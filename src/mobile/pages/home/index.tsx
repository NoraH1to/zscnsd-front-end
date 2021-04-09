import { history } from 'umi';
import Card from '@/mobile/components/Card';
import CardListContainer from '@/mobile/components/Card/CardListContainer';
import { WhiteSpace } from 'antd-mobile';
import { FC } from 'react';
import './index.scss';

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
    <div className="m-home">
      <h1 id="m-home-title">首页</h1>
      <CardListContainer cards={cards} />
      <WhiteSpace />
    </div>
  );
};

export default home;
