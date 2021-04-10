import { TableFilterType } from '@/common';
import { useApi, useInit } from '@/hooks';
import {
  Form,
  Input,
  Select,
  DatePicker,
  FormProps,
  InputNumber,
  FormInstance,
} from 'antd';
import { forEachObjIndexed, type } from 'ramda';
import update from 'immutability-helper';
import './index.scss';
import { FC, useEffect, useState } from 'react';
import componentData from 'typings';
import moment from 'moment';
import { dateformatOut, datetimeformatOut, formatDate } from '@/utils';
import UploadImg from '@/components/UploadImg';
import useUploadImg from '../useUploadImg';

const _Input: FC<{ item: componentData.PropData; password?: boolean }> = (
  props,
) => {
  const { item, password } = props;
  return (
    <BaseFormItem item={item}>
      <Input
        type={password ? 'password' : 'text'}
        placeholder={item?.holder}
      ></Input>
    </BaseFormItem>
  );
};

const _InputNumber: FC<{ item: componentData.PropData }> = (props) => {
  const { item } = props;
  return (
    <BaseFormItem item={item}>
      <InputNumber placeholder={item?.holder}></InputNumber>
    </BaseFormItem>
  );
};

const _DateRangePicker: FC<{ item: componentData.PropData }> = (props) => {
  const { item } = props;
  return (
    <BaseFormItem item={item}>
      <DatePicker.RangePicker
        placeholder={item?.holderList}
      ></DatePicker.RangePicker>
    </BaseFormItem>
  );
};

const _DatePicker: FC<{
  item: componentData.PropData;
  withoutTime?: boolean;
}> = (props) => {
  const { item, withoutTime } = props;
  const [value, setValue] = useState<any>();
  return (
    <BaseFormItem item={item}>
      <DatePicker
        value={value}
        onChange={(date) => {
          if (withoutTime) {
            setValue(date?.set({ hour: 0, minute: 0, second: 0 }));
          } else {
            setValue(date);
          }
        }}
        placeholder={item.holder}
        format={withoutTime ? dateformatOut : datetimeformatOut}
        showTime={
          withoutTime
            ? false
            : {
                defaultValue: moment('00:00:00'),
              }
        }
      ></DatePicker>
    </BaseFormItem>
  );
};

const _Select: FC<{ item: componentData.PropData; muit?: boolean }> = (
  props,
) => {
  const { Option } = Select;
  const { item, muit } = props;
  let { selectData, holder } = item;
  let options = selectData;
  if (typeof selectData == 'function') {
    const { loading, setLoading, setParams, data, errorData } = useInit(
      props.item.selectData,
    );
    options = data.data || [];
  }
  return (
    <BaseFormItem item={item}>
      <Select
        mode={muit ? 'multiple' : undefined}
        placeholder={holder}
        allowClear={true}
        dropdownMatchSelectWidth={false}
      >
        {options.map(
          (item: { id: string; string?: string; content?: string }) => (
            <Option key={item.id} value={item.id}>
              {item.string || item.content}
            </Option>
          ),
        )}
      </Select>
    </BaseFormItem>
  );
};

const _SelectSearch: FC<{ item: componentData.PropData }> = (props) => {
  const [timerContainer] = useState<any>({ timer: undefined });
  const { Option } = Select;
  const { item } = props;
  let { selectData, searchOption, holder } = item;
  const { loading, setLoading, setParams, data, errorData } = useApi(
    selectData,
    {},
  );
  return (
    <BaseFormItem item={item}>
      <Select
        placeholder={holder}
        style={{ minWidth: '8rem' }}
        showSearch={true}
        allowClear={true}
        dropdownMatchSelectWidth={false}
        filterOption={false}
        onSearch={(value) => {
          if (value) {
            if (timerContainer.timer) {
              clearTimeout(timerContainer.timer);
              timerContainer.timer = null;
            }
            function request() {
              setParams({
                search: value,
              });
              setLoading(true);
            }
            timerContainer.timer = setTimeout(request, 200);
          }
        }}
        loading={loading}
      >
        {data.data
          ? data.data.map((item: any) => (
              <Option
                key={item[searchOption?.keyProp || '_null']}
                value={item[searchOption?.keyProp || '_null']}
              >
                {item[searchOption?.labelProp || '_null']}
              </Option>
            ))
          : null}
      </Select>
    </BaseFormItem>
  );
};

// const _MuitSelect: FC<{ item: componentData.PropData }> = ({ item }) => {
//   return (
//     <BaseFormItem item={item}>
//       <Select mode="multiple" allowClear></Select>;
//     </BaseFormItem>
//   );
// };

const _Image: FC<{
  item: componentData.PropData;
  form: FormInstance<any>;
  onValuesChange: FormProps['onValuesChange'];
}> = ({ item, form, onValuesChange }) => {
  const { urlList, UploadImg: _UploadImg } = useUploadImg();
  const [first, setFirst] = useState(true);
  useEffect(() => {
    if (!first) {
      const newValue = update(form.getFieldsValue(), {
        $merge: { [item.key]: urlList[0] },
      });
      onValuesChange && onValuesChange(newValue, newValue);
      form.setFieldsValue(newValue);
    } else setFirst(false);
  }, [urlList]);
  return (
    <>
      <BaseFormItem item={item}>
        <Input placeholder={item.holder}></Input>
      </BaseFormItem>
      {_UploadImg}
    </>
  );
};

const BaseFormItem: FC<{ item: componentData.PropData }> = ({
  item,
  children,
}) => (
  <Form.Item
    colon={false}
    label={item.name}
    name={item.key}
    rules={item.rules}
    hidden={item.hidden}
  >
    {children}
  </Form.Item>
);

const ErrorProp: FC = () => {
  return <div>错误的过滤器类型</div>;
};

const validateMessages: FormProps['validateMessages'] = {
  required: '必须输入 ${label}',
  number: {
    range: '${label} 必须在 ${min} 和 ${max}（不包含） 之间',
    min: '${label} 必须大于等于 ${min}',
  },
  types: {
    number: '${label} 输入不合法',
  },
};

const useCustomForm = (
  propData: componentData.PropData[],
  onChange: componentData.OnFormChange,
  formProps?: FormProps,
): componentData.CustomFormHooks => {
  const [timerContainer, setTimerContainer] = useState<any>({
    timer: undefined,
  });
  const [form] = Form.useForm();
  const [validatedContainer, setValidated] = useState({ validated: false });
  const [defaultFormData, setDefaultFormData] = useState<any>({});
  const [_propData, setPropData] = useState<componentData.PropData[]>(propData);
  const onValuesChange: FormProps['onValuesChange'] = (
    changeValues,
    allValues,
  ) => {
    if (timerContainer.timer) {
      clearTimeout(timerContainer.timer);
      timerContainer.timer = null;
    }
    function doit() {
      forEachObjIndexed((value: any, key: any, obj: any) => {
        if (value && value._isAMomentObject) {
          changeValues = update(changeValues, {
            [key]: {
              $set: formatDate(value),
            },
          });
        }
        if (
          value &&
          type(value) === 'Array' &&
          value.length === 2 &&
          value[0]._isAMomentObject
        ) {
          propData.forEach((item) => {
            if (item.key === key && item.timeRange) {
              changeValues = update(changeValues, {
                $unset: [key],
                [item.timeRange.rangeStartProp]: {
                  $set: value[0].format('YYYY-MM-DD'),
                },
                [item.timeRange.rangeEndProp]: {
                  $set: value[1].format('YYYY-MM-DD'),
                },
              });
            }
          });
        }
      }, changeValues);
      onChange(changeValues);
    }
    timerContainer.timer = setTimeout(doit, 100);
  };
  const result = _propData.map((item, index) => {
    if (item.default) defaultFormData[item.key] = item.default;
    switch (item.type) {
      case TableFilterType.str:
        return <_Input key={item.key} item={item} />;
      case TableFilterType.number:
        return <_InputNumber key={item.key} item={item} />;
      case TableFilterType.timeRange:
        return <_DateRangePicker key={item.key} item={item} />;
      case TableFilterType.time:
        return <_DatePicker key={item.key} item={item} />;
      case TableFilterType.timeWithoutTime:
        return <_DatePicker key={item.key} item={item} withoutTime={true} />;
      case TableFilterType.select:
        return <_Select key={item.key} item={item} />;
      case TableFilterType.selectSearch:
        return <_SelectSearch key={item.key} item={item} />;
      case TableFilterType.muitSelect:
        return <_Select key={item.key} item={item} muit={true} />;
      case TableFilterType.image:
        return (
          <_Image
            key={item.key}
            item={item}
            form={form}
            onValuesChange={onValuesChange}
          />
        );
      case TableFilterType.password:
        return <_Input key={item.key} item={item} password={true} />;
      default:
        return <ErrorProp />;
    }
  });
  useEffect(() => {
    onChange(defaultFormData);
  }, []);
  const validateFields = async () => {
    try {
      await form.validateFields();
      validatedContainer.validated = true;
    } catch (errorInfo) {
      validatedContainer.validated = false;
    }
  };
  const _form =
    _propData.length > 0 ? (
      <Form
        initialValues={defaultFormData}
        validateMessages={validateMessages}
        form={form}
        className="filter-form"
        labelAlign="right"
        layout={'inline'}
        onValuesChange={onValuesChange}
        {...formProps}
      >
        {result}
      </Form>
    ) : undefined;
  return {
    form: _form,
    validateFields,
    validatedContainer,
    formRef: form,
    setPropData,
  };
};

export default useCustomForm;
