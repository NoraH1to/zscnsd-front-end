import UploadImg, { uploadImgProps } from '@/components/UploadImg';
import { UploadFile } from 'antd/lib/upload/interface';
import { useState } from 'react';

const checkFile = (file: UploadFile) => {
  return true; // TODO: 检查文件
};

const useUploadImg = (props?: uploadImgProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [urlList, setUrlList] = useState<string[]>([]);
  const _UploadImg = (
    <UploadImg
      {...props}
      onChange={({ file, fileList }) => {
        if (checkFile(file)) {
          setFileList(fileList);
          setUrlList(
            fileList
              .map((file) => file.response?.data?.filePath)
              .filter((file) => !!file),
          );
        }
      }}
    />
  );
  return {
    fileList,
    urlList,
    UploadImg: _UploadImg,
  };
};

export default useUploadImg;
