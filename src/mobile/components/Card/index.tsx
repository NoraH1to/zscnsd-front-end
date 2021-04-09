import { FC } from 'react';
import './index.scss';

const RouteCard: FC<{
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;
  bgColor: string;
  textColor: string;
  text: string;
}> = ({ onClick, bgColor, textColor, text }) => {
  return (
    <div>
      <div className="m-card-container">
        <div
          className="m-card-content"
          style={{
            background: bgColor,
            boxShadow: `0px 5px 20px 0px ${bgColor}`,
          }}
          onClick={onClick}
        >
          <span style={{ color: textColor }}>{text}</span>
        </div>
      </div>
    </div>
  );
};

export default RouteCard;
