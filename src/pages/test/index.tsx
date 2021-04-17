import { FC, useEffect, useRef, useState } from 'react';
import './index.scss';
import { useApi, useDialogForm, useInit } from '@/hooks/index';
import PermissionDenied from '@/pages/permissionDenied';
import apiInterface from 'api';
import { Button, Input, Modal, Upload } from 'antd';
import spreadsheet, { Options } from 'x-data-spreadsheet';
import XLSX from 'xlsx';
import { UploadOutlined } from '@ant-design/icons';
import update from 'immutability-helper';
import UploadExcelDialog from '@/hooks/useUploadExcelDialog';
import { ticketAdd } from '@/api/ticket';

const test: FC<{}> = () => {
  // return <UploadExcelDialog visible={true} api={ticketAdd} />;
  return <div />;
};

export default test;
