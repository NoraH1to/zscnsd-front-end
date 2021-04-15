import { useCustomForm } from '@/hooks';
import { Modal, ModalProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import update from 'immutability-helper';
import useApi from './useApi';
import componentData from 'typings';
import { forEachObjIndexed } from 'ramda';
import moment from 'moment';
import { dateformatInput, datetimeformatInput } from '@/utils';
import apiInterface from 'api';

const useDialogForm = <P,>(
  api: apiInterface.Api<P>,
  propData: componentData.PropData[],
  title?: string,
  onSubmit?: (res: apiInterface.Response | apiInterface.ResponsePage) => void,
  mobile?: boolean,
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
    (res: any) => {
      onSubmit && onSubmit(res);
      (!res.errorData || !res.errorData[0]) && setVisible(false);
    },
  );

  const {
    form,
    validatedContainer,
    validateFields,
    formRef,
    setErrData,
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

  useEffect(() => {
    (!errorData || !errorData[0]) && setVisible(false);
    setErrData(errorData && errorData[0]);
  }, [errorData]);

  const setForm = <T,>(data: T | any) => {
    setFormData(update(formData, { $merge: data }));
    // 特殊处理日期字符串
    forEachObjIndexed((value, key, obj) => {
      const _date = moment(value, [dateformatInput, datetimeformatInput], true);
      if (_date.isValid()) {
        data[key] = _date;
      }
    }, data);
    formRef.setFieldsValue(data);
  };

  // 移动端附加选项
  const mobileOption: ModalProps = mobile ? { centered: true } : {};

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
      destroyOnClose={true}
      {...mobileOption}
    >
      {form}
    </Modal>
  );
  return { visible, setVisible, DialogForm, setForm };
};

export default useDialogForm;
