import { FC, useEffect, useState } from 'react';
import { useCustomForm } from '@/hooks';
import update from 'immutability-helper';
import { Button, Space, Spin } from 'antd';
import BaseTable from '@/components/BaseTable';
import apiInterface from 'api';
import componentData, { InfoCardProp } from 'typings';
import { useTableSort } from '@/components/CustomTable';
import Modal from 'antd/lib/modal/Modal';
import { Button as ButtonM, WhiteSpace } from 'antd-mobile';

interface Props<T extends object> {
  formData: any;
  setFormData: any;
  filters: componentData.PropData[];
  apiHooks: any;
  apiAddHooks?: componentData.DialogFormHooks;
  sortList?: apiInterface.Enum[];
  DataComp: FC<InfoCardProp>;
  dataOnClick?: (data: any) => any;
  addBtnText?: string;
}

const CustomList = <T extends object>(props: Props<T>) => {
  const {
    formData,
    setFormData,
    filters,
    apiHooks,
    apiAddHooks,
    sortList,
    DataComp,
    dataOnClick,
    addBtnText,
  } = props;

  // 控制筛选dialog
  const [visible, setVisible] = useState(false);

  // api hooks
  const {
    loading,
    setLoading,
    setParams,
    data,
    errorData,
  }: {
    data: apiInterface.ResponsePage;
    [index: string]: any;
  } = apiHooks;

  const [dataList, setDataList] = useState<any[]>([]);

  // data 变化后加进数据列表以显示
  useEffect(() => {
    if (formData.page == 1) setDataList(data?.data?.content || []);
    else setDataList(dataList.concat(data?.data?.content || []));
  }, [data]);

  // 根据 loading 关闭 dialog
  useEffect(() => {
    if (!loading && (!errorData || (errorData && !errorData[0])))
      setVisible(false);
  }, [loading]);

  // 排序 hooks
  const { SortSelect } = useTableSort(sortList, (data) => {
    data.sort && (formData.sort = data.sort);
    data.order && (formData.order = data.order);
    if (!data.sort && !data.order) {
      formData.sort = null;
      formData.order = null;
    }
    formData.page = 1;
    setDataList([]);
    setParams(formData);
    setLoading(true);
  });

  // 添加接口 hooks
  const {
    visible: addVisible,
    setVisible: setAddVisible,
    DialogForm: AddDialogForm,
  } = apiAddHooks || {};

  // 搜索表单 hooks
  const {
    form,
    validatedContainer,
    validateFields,
    formRef,
    setPropData,
  } = useCustomForm(
    filters,
    (newformData) => setFormData(update(formData, { $merge: newformData })),
    { layout: 'horizontal' },
  );

  // 表格上方表单提交
  const onSubmit = async () => {
    await validateFields();
    if (!validatedContainer.validated) return;
    // 重置数据
    formData.page = 1;
    setDataList([]);
    setParams(formData);
    setLoading(true);
  };

  // 新增按钮
  const AddBtn = apiAddHooks ? (
    <Button type="primary" onClick={() => setAddVisible && setAddVisible(true)}>
      {addBtnText || '新建'}
    </Button>
  ) : undefined;

  // 搜索按钮
  const searchBtn =
    filters.length > 0 || sortList ? (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {SortSelect}
        {filters.length > 0 ? (
          <Button
            style={{ marginLeft: '1rem' }}
            type="primary"
            ghost
            onClick={() => setVisible(true)}
          >
            筛选
          </Button>
        ) : undefined}
      </div>
    ) : undefined;

  // 加载提示控件
  const loadingSpin = loading ? (
    <div
      style={{
        zIndex: 100,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Spin
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        tip="加载中"
      />
    </div>
  ) : undefined;

  return (
    <>
      <BaseTable
        mobile={true}
        TableActionLeft={AddBtn}
        TableActionRight={searchBtn}
        Table={dataList.map((_data: any) => (
          <div key={_data.id} style={{ margin: '12px 0' }}>
            <DataComp
              data={_data}
              onClick={() => dataOnClick && dataOnClick(_data)}
            />
          </div>
        ))}
      />
      <ButtonM
        loading={loading}
        disabled={loading || !data?.data?.hasNext}
        onClick={() => {
          formData.page += 1;
          setParams(formData);
          setLoading(true);
        }}
      >
        {loading ? '加载中' : '点击加载更多'}
      </ButtonM>
      <WhiteSpace />
      {AddDialogForm}
      <Modal
        title="筛选"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={onSubmit}
        destroyOnClose={true}
        centered={true}
        okText="筛选"
        cancelText="返回"
        okButtonProps={{ loading }}
      >
        {form}
      </Modal>
      {loadingSpin}
    </>
  );
};

export default CustomList;
