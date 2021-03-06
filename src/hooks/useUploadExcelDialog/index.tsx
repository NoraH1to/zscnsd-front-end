import { useState } from 'react';
import './index.scss';
import { useApi } from '@/hooks/index';
import apiInterface from 'api';
import { Button, Modal, Upload } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import Excel from './Excel';

const UploadExcelDialog = (
  api: apiInterface.Api<FormData>,
  downloadTemplate: () => void,
  title?: string,
  onSubmit?: (res: apiInterface.Response) => void,
) => {
  const [file, setFile] = useState<File | Blob | undefined>();

  const [visible, setVisible] = useState(false);

  const { loading, setLoading, setParams, errorData } = useApi(
    api,
    undefined,
    (res: apiInterface.Response) => {
      setVisible(false);
      onSubmit && onSubmit(res);
    },
  );

  const Dialog = (
    <Modal
      title={title || '批量上传'}
      width={1000000}
      centered={true}
      visible={visible}
      onCancel={() => setVisible(false)}
      destroyOnClose={true}
      footer={null}
    >
      <div className="excel-action-container">
        <Upload
          beforeUpload={() => false}
          maxCount={1}
          onChange={(info) => setFile(info.fileList[0]?.originFileObj)}
          disabled={loading}
          accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        >
          <Button loading={loading} type="primary" ghost>
            选择EXCEL文件
          </Button>
        </Upload>
        <div className="space" />
        {errorData && errorData.filePath && (
          <Button
            style={{ marginRight: '8px' }}
            loading={loading}
            type="primary"
            danger
            icon={<DownloadOutlined />}
            href={`${BASE_URL}/${errorData.filePath}`}
          >
            下载修正提示
          </Button>
        )}
        <Button
          style={{ marginRight: '8px' }}
          onClick={() => downloadTemplate()}
        >
          下载模板
        </Button>
        <Button
          loading={loading}
          disabled={!file}
          type="primary"
          icon={<UploadOutlined />}
          onClick={() => {
            if (file) {
              let forms = new FormData();
              forms.append('file', file);
              setParams(forms);
              setLoading(true);
            }
          }}
        >
          上传
        </Button>
      </div>
      <Excel file={file} />
    </Modal>
  );

  return {
    Dialog,
    setVisible,
  };
};

export default UploadExcelDialog;
