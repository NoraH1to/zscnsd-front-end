import { FC, useState } from 'react';
import { useApi, useDialogForm, useInit } from '@/hooks/index';
import PermissionDenied from '@/pages/permissionDenied';
import apiInterface from 'api';
import { Button, Input } from 'antd';

const requests: FC = () => {
  const [value, setValue] = useState('');
  return (
    <PermissionDenied>
      {/* <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={() => setValue(value + 1)}>+1</Button> */}
    </PermissionDenied>
  );
};

export default requests;
