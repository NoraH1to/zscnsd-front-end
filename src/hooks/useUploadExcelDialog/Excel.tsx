import { FC, useEffect, useRef, useState } from 'react';
import spreadsheet, { Options } from 'x-data-spreadsheet';
import XLSX from 'xlsx';

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

const process_wb = (wb: XLSX.WorkBook, xspr: spreadsheet) => {
  /* convert to x-spreadsheet form */
  let data = stox(wb);
  /* update x-spreadsheet */
  data[0].rows.len = Object.keys(data[0].rows).length;
  xspr.loadData(data);
};

const do_file = (file: any, xspr: spreadsheet) => {
  let reader = new FileReader();
  reader.onload = (e) => {
    let data = e.target?.result;
    if (!!data && data != undefined) {
      process_wb(
        XLSX.read(data, {
          type: 'binary',
        }),
        xspr,
      );
    }
  };
  reader.readAsBinaryString(file);
};

const Excel: FC<{ file: File | Blob | undefined }> = ({ file }) => {
  const [xspr, setXspr] = useState<spreadsheet | null>(null);
  const excelRef = useRef<HTMLDivElement>(null);
  const config: Options = {
    mode: 'read',
    showToolbar: false,
    showContextmenu: false,
    view: {
      height: () => document.documentElement.clientHeight - 160,
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
      xspr && do_file(file, xspr);
    } else {
      xspr?.loadData([{ name: 'sheet', rows: {} }]);
    }
  }, [file]);

  return <div ref={excelRef}></div>;
};

export default Excel;
