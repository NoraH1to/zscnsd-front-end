import { history } from 'umi';
import { userAdd } from '@/api/user';
import { dormBlocks, isps, TableFilterType } from '@/common';
import { useApi, useCustomForm } from '@/hooks';
import PageContainer from '@/mobile/components/PageContainer';
import { mobileAuthContext } from '@/mobile/wrappers/Auth/mobileAuthContext';
import { hasToken } from '@/utils';
import { Button } from 'antd-mobile';
import update from 'immutability-helper';
import { FC, useContext, useEffect, useState } from 'react';
import componentData from 'typings';

const propData: componentData.PropData[] = [
  {
    key: 'name',
    type: TableFilterType.str,
    name: '姓名',
    rules: [{ required: true }],
  },
  {
    key: 'studentId',
    type: TableFilterType.str,
    name: '学号',
    rules: [{ required: true }],
  },
  {
    key: 'isp',
    type: TableFilterType.select,
    name: '运营商',
    selectData: isps,
    rules: [{ required: true }],
  },
  {
    key: 'networkAccount',
    type: TableFilterType.str,
    name: '宽带账号',
    rules: [{ required: true }],
  },
  {
    key: 'dormBlock',
    type: TableFilterType.select,
    name: '宿舍楼',
    selectData: dormBlocks,
    rules: [{ required: true }],
  },
  {
    key: 'dormRoom',
    type: TableFilterType.number,
    name: '宿舍房间号',
    rules: [{ required: true }],
  },
  {
    key: 'telephone',
    type: TableFilterType.str,
    name: '手机号',
    rules: [{ required: true }],
  },
];

const bindWx: FC = () => {
  const { user, setUser } = useContext(mobileAuthContext);

  const [formData, setFormData] = useState<any>({});

  const {
    form,
    validateFields,
    validatedContainer,
    formRef,
    setPropData,
    setErrData,
  } = useCustomForm(
    propData,
    (newFormData) => setFormData(update(formData, { $merge: newFormData })),
    { layout: 'vertical' },
  );

  const { loading, setLoading, setParams, errorData } = useApi(
    userAdd,
    formData,
    (res: any) => {
      setUser && setUser(res.data);
      history.replace('/m');
    },
  );

  useEffect(() => {
    if (errorData && errorData[0]) {
      setErrData(errorData[0]);
    }
  }, [errorData]);

  const onSubmit = async () => {
    await validateFields();
    if (validatedContainer.validated) {
      setParams(formData);
      setLoading(true);
    }
  };

  if (!hasToken()) history.replace('/m');
  return (
    <div style={{ padding: '0 24px 24px 24px' }}>
      <PageContainer title="绑定微信">
        {form}
        <Button loading={loading} type="primary" onClick={() => onSubmit()}>
          绑定
        </Button>
      </PageContainer>
    </div>
  );
};

export default bindWx;
