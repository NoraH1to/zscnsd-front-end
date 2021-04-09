import { FC, ReactElement } from 'react';
import './CardListContainer.scss';

const CardListContainer: FC<{
  cards: ReactElement[];
  style?: React.CSSProperties;
}> = ({ cards, style }) => {
  return (
    <div className="card-container">
      {cards.map((card) => (
        <div key={card.key} className="m-route-card" style={style}>
          {card}
        </div>
      ))}
    </div>
  );
};

export default CardListContainer;
