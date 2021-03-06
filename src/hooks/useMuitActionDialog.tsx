import { useCustomForm } from '@/hooks';
import { Divider, message, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { find, map } from 'ramda';
import { useEffect, useState } from 'react';
import componentData from 'typings';
import { useApi } from '.';
import update from 'immutability-helper';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';

const useMuitActionDialog = (
  actions: componentData.MuitActionProp[],
  onSubmit: () => void,
): componentData.MuitActionDialogHooks => {
  const [actionTypeList, setActionTypeList] = useState(
    map((item) => ({ key: item.key, value: item.value }), actions),
  );

  const [visible, setVisible] = useState(false);

  const [
    currentAction,
    setCurrentAction,
  ] = useState<componentData.MuitActionProp>();

  const [defaultFormData, setDefaultFormData] = useState<any>();

  const [formData, setFormData] = useState<any>();

  const [errMsg, setErrMsg] = useState<any>(null);

  const {
    form,
    validateFields,
    validatedContainer,
    setPropData,
    formRef,
    setErrData,
  } = useCustomForm(currentAction?.propData || [], (_formData) =>
    setFormData(update(formData || {}, { $merge: _formData })),
  );

  const { loading, setLoading, setParams, errorData } = useApi(
    currentAction?.api,
    formData,
    () => {
      setVisible(false);
      onSubmit();
    },
  );

  useEffect(() => {
    errorData && errorData[0] && setErrData(errorData[0]);
  }, [errorData]);

  const updateDefaultFormData = (newData: any) => {
    setDefaultFormData(update(defaultFormData || {}, { $merge: newData }));
    setFormData(update(formData || {}, { $merge: newData }));
  };

  const MuitActionDialog = (
    <Modal
      visible={visible}
      title="多选操作"
      okText="确定"
      cancelText="取消"
      onCancel={() => setVisible(false)}
      onOk={async () => {
        if (!currentAction) return setErrMsg('必须选择类型');
        if (currentAction.propData.length > 0) {
          await validateFields();
          if (!validatedContainer.validated) return;
        }
        setParams(formData);
        setLoading(true);
      }}
    >
      <FormItem label="操作类型" help={errMsg}>
        <Select
          dropdownMatchSelectWidth={false}
          onChange={(action) => {
            setErrMsg('');
            formRef.resetFields();
            setCurrentAction(find((item) => item.key == action, actions));
            setPropData(find((item) => item.key == action, actions)?.propData);
            setFormData(defaultFormData);
          }}
        >
          {actionTypeList.map((item) => (
            <Select.Option value={item.key} key={item.key}>
              {item.value}
            </Select.Option>
          ))}
        </Select>
      </FormItem>
      {!!form && <Divider />}
      {form}
    </Modal>
  );

  return {
    visible,
    setVisible,
    MuitActionDialog,
    updateDefaultFormData,
  };
};

export default useMuitActionDialog;
