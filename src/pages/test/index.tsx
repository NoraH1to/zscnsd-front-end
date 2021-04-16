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

const stox = (wb: XLSX.WorkBook): Record<string, any> => {
  // 只拿第一个sheet
  const name = wb.SheetNames[0];
  let out: Record<string, any> = [{ name, rows: {} }];
  const o = out[0];
  console.log('wb', wb.Sheets[name]);
  let aoa = XLSX.utils.sheet_to_json<any[]>(wb.Sheets[name], {
    raw: false,
    header: 1,
  });
  console.log('aoa', aoa);
  aoa.forEach(function (rowData, row) {
    let cells: any = {};
    rowData.forEach(function (cellData, col) {
      cells[col] = { text: cellData };
    });
    o.rows[row] = { cells };
  });
  return out;
};

const process_wb = (wb: XLSX.WorkBook, xspr: spreadsheet, config: any) => {
  /* convert to x-spreadsheet form */
  let data = stox(wb);
  /* update x-spreadsheet */
  data[0].rows.len = Object.keys(data[0].rows).length;
  xspr.loadData(data);
};

const do_file = (file: any, xspr: spreadsheet, config: any) => {
  let reader = new FileReader();
  reader.onload = (e) => {
    let data = e.target?.result;
    if (!!data && data != undefined) {
      process_wb(
        XLSX.read(data, {
          type: 'binary',
        }),
        xspr,
        config,
      );
    }
  };
  reader.readAsBinaryString(file);
};

const test: FC<{ visible: boolean; title?: string }> = ({ visible, title }) => {
  const [xspr, setXspr] = useState<spreadsheet | null>(null);
  const [file, setFile] = useState<File | Blob | undefined>();
  const excelRef = useRef<HTMLDivElement>(null);
  const [_visible, set_Visible] = useState(!visible);
  const config: Options = {
    // mode: 'read',
    // showToolbar: false,
    showContextmenu: false,
    view: {
      height: () => document.documentElement.clientHeight - 180,
      width: () => document.documentElement.clientWidth - 80,
    },
  };

  useEffect(() => {
    if (excelRef.current && !xspr) {
      setXspr(new spreadsheet(excelRef.current, config));
    }
  }, [excelRef.current]);

  useEffect(() => {
    if (!!file) {
      xspr && do_file(file, xspr, config);
    } else {
      xspr?.loadData([{ name: 'sheet', rows: {} }]);
    }
  }, [file]);

  return (
    <div>
      <Modal
        title={title || '批量上传'}
        width={1000000}
        centered
        visible={_visible}
        onCancel={() => set_Visible(false)}
        destroyOnClose
      >
        <div id="htmlout" ref={excelRef}></div>
        <Upload
          beforeUpload={() => false}
          maxCount={1}
          onChange={(info) => setFile(info.fileList[0]?.originFileObj)}
          accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        >
          <Button type="primary" icon={<UploadOutlined />}>
            上传EXCEL
          </Button>
        </Upload>
        <Button onClick={() => xspr && console.log('xsprdata', xspr.getData())}>
          get data
        </Button>
      </Modal>
    </div>
  );
};

export default test;
