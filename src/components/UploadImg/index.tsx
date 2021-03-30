import { FC, useState } from 'react';
import './index.scss';
import { Upload, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile, UploadProps } from 'antd/lib/upload/interface';

export interface uploadImgProps {
  max?: number;
  url?: string;
  onChange?: UploadProps['onChange'];
}

const uploadImg: FC<uploadImgProps> = ({ max, url, onChange }) => {
  return (
    <Upload
      maxCount={max || 1}
      listType="picture-card"
      className="upload-image"
      onChange={(options) => {
        onChange && onChange(options);
      }}
      accept=".jpeg,.jpg,.png"
      action={url || '/api/file/upload-timetable'}
      headers={{ Token: window.localStorage.getItem('Token') || '' }}
    >
      <div>
        <UploadOutlined />
        <Typography.Text type="secondary" style={{ display: 'block' }}>
          上传图片
        </Typography.Text>
      </div>
    </Upload>
  );
};

export default uploadImg;
