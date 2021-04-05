import { userLoginAdmin } from '@/api/user';
import { TableFilterType } from '@/common';
import { useApi, useCustomForm } from '@/hooks';
import './index.scss';
import apiInterface from 'api';
import { FC, useContext, useState } from 'react';
import componentData from 'typings';
import update from 'immutability-helper';
import { Button, Card } from 'antd';
import { history } from '@/.umi/core/history';
import { authContext } from '@/wrappers/Auth/authContext';

const propData: componentData.PropData[] = [
  {
    key: 'workId',
    type: TableFilterType.str,
    name: '工号',
    rules: [{ required: true }],
  },
  {
    key: 'password',
    type: TableFilterType.password,
    name: '密码',
    rules: [{ required: true }],
  },
];

const login: FC = () => {
  const userContext = useContext(authContext);
  const [formData, setFormData] = useState<apiInterface.UserLoginAdminData>({
    workId: '',
    password: '',
  });
  const { loading, setLoading, data, errorData, setParams } = useApi(
    userLoginAdmin,
    formData,
    (res: any) => {
      if (!res?.data?.token) return;
      window.localStorage.setItem('Token', res.data.token);
      userContext.setUser && userContext.setUser(res.data.user);
      history.push('/');
    },
  );
  const onFormChange = (newFormData: any) => {
    setFormData(update(formData, { $merge: newFormData }));
  };
  const { form, validateFields, validatedContainer } = useCustomForm(
    propData,
    onFormChange,
    { layout: 'horizontal' },
  );
  const submit = async () => {
    await validateFields();
    if (!validatedContainer.validated) return;
    setParams(formData);
    setLoading(true);
  };
  return (
    <div className="login-container">
      <Card
        className="login-card"
        title="ZSCNSD WORK SYSTEM"
        actions={[
          <Button type="primary" onClick={() => submit()} loading={loading}>
            登入
          </Button>,
        ]}
      >
        {form}
      </Card>
    </div>
  );
};

export default login;
