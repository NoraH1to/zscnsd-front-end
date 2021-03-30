import { FC, useState } from 'react';
import { useApi, useDialogForm, useInit } from '@/hooks/index';
import UploadImg from '@/components/UploadImg';
import apiInterface from 'api';
import { Button, Input } from 'antd';

const requests: FC = () => {
  const [value, setValue] = useState('');
  return (
    <>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={() => setValue(value + 1)}>+1</Button>
    </>
  );
};

export default requests;
