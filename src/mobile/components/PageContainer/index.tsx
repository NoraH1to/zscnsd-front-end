import { FC } from 'react';
import './index.scss';

const PageContainer: FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className="m-page-container">
      <h1 className="m-page-title">{title}</h1>
      {children}
    </div>
  );
};

export default PageContainer;
