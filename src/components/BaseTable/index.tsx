import './index.scss';
import { FC, ReactElement, useState } from 'react';
import { Button, Divider, Modal } from 'antd';

const baseTable: FC<{
  Filter?: ReactElement;
  FilterBtn?: ReactElement;
  TableActionLeft?: ReactElement | (ReactElement | null)[];
  TableActionRight?: ReactElement | (ReactElement | null)[];
  Table: ReactElement | ReactElement[];
  mobile?: boolean;
  hideLine?: boolean;
}> = (props) => {
  const {
    Filter,
    FilterBtn,
    TableActionLeft,
    TableActionRight,
    Table,
    mobile,
    hideLine,
  } = props;
  const form = (
    <div className="requests-container">
      <div className="filter-container">{Filter}</div>
      <div className="submit-btn">{FilterBtn}</div>
    </div>
  );
  return (
    <>
      {mobile ? (
        <></>
      ) : (
        <>
          {form}
          {hideLine || <Divider />}
        </>
      )}
      <div className="table-container">
        <div className="table-action">
          <div>{TableActionLeft}</div>
          <div>{TableActionRight}</div>
        </div>
        <div className="table">{Table}</div>
      </div>
    </>
  );
};

export default baseTable;
