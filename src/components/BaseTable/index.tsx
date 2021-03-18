import './index.scss';
import { FC, ReactElement } from 'react';
import { Divider } from 'antd';

const baseTable: FC<{
  Filter?: ReactElement;
  FilterBtn?: ReactElement;
  TableActionLeft?: ReactElement;
  TableActionRight?: ReactElement;
  Table: ReactElement;
}> = (props) => {
  const { Filter, FilterBtn, TableActionLeft, TableActionRight, Table} = props;
  return (
    <>
      <div className="requests-container">
        <div className="filter-container">{Filter}</div>
        <div className="submit-btn">{FilterBtn}</div>
      </div>
      <Divider />
      <div className="table-container">
        <div className="table-action">
          <div>
            {TableActionLeft}
          </div>
          <div>
            {TableActionRight}
          </div>
        </div>
        <div className="table">{Table}</div>
      </div>
    </>
  );
};

export default baseTable;
