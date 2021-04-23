import { TableFilterType, weekDays } from '@/common';
import { useApi, useCustomForm } from '@/hooks';
import { FC, useState } from 'react';
import update from 'immutability-helper';
import PageContainer from '@/mobile/components/PageContainer';
import { Button } from 'antd-mobile';
import { memberTimetableAddUser } from '@/api/memberTimetable';
import { history } from 'umi';
import { workSemesterList } from '@/api/workSemester';

const uploadClassTable: FC = () => {
  const [formData, setFormData] = useState<any>({});
  const {
    loading,
    setLoading,
    data,
    setParams,
    errorData,
  } = useApi(memberTimetableAddUser, formData, () => history.goBack());
  const addPropData: componentData.PropData[] = [
    {
      key: 'semesterId',
      type: TableFilterType.select,
      name: '值班学期ID',
      selectData: workSemesterList,
      selectRequestParams: {
        page: 1,
        count: 20,
        status: 1,
      },
      searchOption: {
        keyProp: 'id',
        labelProp: 'name',
      },
      rules: [{ required: true }],
    },
    {
      key: 'imagePath',
      type: TableFilterType.image,
      name: '截图',
      holder: '上传图片/图片直链',
      rules: [{ required: true }],
    },
    {
      key: 'availableWeekday',
      type: TableFilterType.muitSelect,
      selectData: weekDays,
      name: '可值班日',
      rules: [{ required: true }],
    },
    {
      key: 'comment',
      type: TableFilterType.str,
      name: '备注',
      rules: [{ required: true }],
    },
  ];
  const {
    form,
    validateFields,
    validatedContainer,
    formRef,
    setPropData,
  } = useCustomForm(
    addPropData,
    (newFormData) => setFormData(update(formData, { $merge: newFormData })),
    { layout: 'vertical' },
  );
  const onSubmit = async () => {
    await validateFields();
    if (validatedContainer.validated) {
      setParams(formData);
      setLoading(true);
    }
  };
  return (
    <PageContainer title="上传课程表">
      {form}
      <Button loading={loading} type="primary" onClick={() => onSubmit()}>
        提交
      </Button>
    </PageContainer>
  );
};

export default uploadClassTable;
