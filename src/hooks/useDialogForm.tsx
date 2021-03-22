import { useCustomForm } from '@/hooks';
import { Modal } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import update from 'immutability-helper';
import useApi from './useApi';
import componentData from 'typings';

const useDialogForm = <P,>(
  api: apiInterface.Api<P>,
  propData: componentData.PropData[],
  title?: string,
  onSubmit?: Function,
): componentData.DialogFormHooks => {
  const getDefaultFormData = useMemo(() => {
    const result: any = {};
    propData.forEach((item) => {
      result[item.key] = undefined;
    });
    return result;
  }, [propData]);
  const [formData, setFormData] = useState<any>(getDefaultFormData);
  const [visible, setVisible] = useState(false);
  const { loading, setLoading, setParams, data, errorData } = useApi<P>(
    api,
    formData,
    () => {
      onSubmit && onSubmit();
      formRef.resetFields();
    },
  );
  useEffect(() => {
    Object.keys(errorData || {}).length == 0 && setVisible(false);
  }, [data, errorData]);

  const {
    form,
    validatedContainer,
    validateFields,
    formRef,
  } = useCustomForm(
    propData,
    (newFormData) => {
      setFormData(update(formData, { $merge: newFormData }));
    },
    {
      layout: 'vertical',
      labelAlign: 'right',
    },
  );

  const setForm = <T,>(data: T) => {
    setFormData(update(formData, { $merge: data }));
    formRef.setFieldsValue(data);
  };

  const DialogForm = (
    <Modal
      key={title}
      title={title}
      visible={visible}
      onOk={async () => {
        await validateFields();
        if (!validatedContainer.validated) return;
        setParams(formData);
        setLoading(true);
      }}
      okText="确认"
      cancelText="取消"
      okButtonProps={{ loading: loading }}
      cancelButtonProps={{ disabled: loading }}
      onCancel={() => {
        setVisible(false);
        formRef.resetFields();
      }}
      destroyOnClose={false}
    >
      {form}
    </Modal>
  );
  return { visible, setVisible, DialogForm, setForm };
};

export default useDialogForm;
