import { ReactElement, useEffect, useState } from 'react';
import { useCustomForm } from '@/components/CustomForm';
import update from 'immutability-helper';
import {
  Button,
  Tooltip,
  Table,
  Dropdown,
  Menu,
  TableProps,
  TableColumnProps,
  Typography,
  Select,
  Space,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  DownOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';
import BaseTable from '@/components/BaseTable';
import apiInterface from 'api';
import componentData from 'typings';
import { useDialogForm } from '@/hooks';
import { History } from '@umijs/runtime';

interface Props<T extends object> {
  formData: any;
  setFormData: any;
  filters: componentData.PropData[];
  colums: TableProps<T>['columns'];
  otherActions?: componentData.CustomTableOtherAction[];
  apiHooks: any;
  apiAddHooks?: componentData.DialogFormHooks;
  apiEditHooks?: componentData.DialogFormHooks;
  editData?: any;
  apiDeleteHooks?: any;
  deleteData?: any;
  apiMuiltActionDialogHooks?: componentData.MuitActionDialogHooks;
  expandable?: TableProps<T>['expandable'];
  onRow?: TableProps<T>['onRow'];
  sortList?: apiInterface.Enum[];
  extraComponent?: {
    Left?: ReactElement;
    Right?: ReactElement;
  };
}

interface Sorter {
  SortSelect: JSX.Element | null;
}

export const useTableSort = (
  sortList?: apiInterface.Enum[],
  onChange?: (data: any) => void,
): Sorter => {
  const [formData, setFormData] = useState<{
    sort: string;
    order: 'desc' | 'asc';
  }>({ sort: '', order: 'asc' });

  const SortSelect = sortList ? (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Button
        icon={
          formData.order == 'desc' ? (
            <SortDescendingOutlined />
          ) : (
            <SortAscendingOutlined />
          )
        }
        onClick={() => {
          const value = formData.order == 'desc' ? 'asc' : 'desc';
          setFormData(
            update(formData, {
              order: { $set: value },
            }),
          );
          onChange && onChange({ order: value });
        }}
        shape="circle"
        type="text"
      />
      <Select
        onChange={(value) => {
          setFormData(
            update(
              formData,
              value
                ? { sort: { $set: value.toString() } }
                : { $unset: ['sort'] },
            ),
          );
          console.log(value);
          onChange && onChange({ sort: value || null });
        }}
        allowClear={true}
        dropdownMatchSelectWidth={false}
        style={{ minWidth: '4rem' }}
      >
        {sortList.map((sort) => (
          <Select.Option value={sort.id}>{sort.string}</Select.Option>
        ))}
      </Select>
    </div>
  ) : null;

  return {
    SortSelect,
  };
};

export const getRouteCell = <T,>(
  text: (record: T) => string,
  target: (record: T) => string,
  histroy: History,
): TableColumnProps<T>['render'] => {
  return (value, record, index) => {
    return (
      <Typography.Link onClick={() => histroy.push(target(record))}>
        {text(record)}
      </Typography.Link>
    );
  };
};

const CustomTable = <T extends object>(props: Props<T>) => {
  const {
    formData,
    setFormData,
    filters,
    colums,
    otherActions,
    apiHooks,
    apiAddHooks,
    apiDeleteHooks,
    apiEditHooks,
    editData,
    apiMuiltActionDialogHooks,
    deleteData: oDeleteData,
    expandable,
    onRow,
    sortList,
    extraComponent,
  } = props;
  // 被选中的行
  const [selectedList, setSelectedList] = useState<any>([]);
  const rowSelection = {
    selectedList,
    onChange: (selectedRowKeys: any[]) => {
      setSelectedList(selectedRowKeys);
    },
  };

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

  // 排序 hooks
  const { SortSelect } = useTableSort(sortList, (data) => {
    data.sort && (formData.sort = data.sort);
    data.order && (formData.order = data.order);
    if (!data.sort && !data.order) {
      formData.sort = null;
      formData.order = null;
    }
    setParams(formData);
    setLoading(true);
  });

  // 添加接口 hooks
  const {
    visible: addVisible,
    setVisible: setAddVisible,
    DialogForm: AddDialogForm,
  } = apiAddHooks || {};

  const {
    visible: editVisible,
    setVisible: setEditVisible,
    DialogForm: EditDialogForm,
    setForm: setEditForm,
  } = apiEditHooks || {};

  const {
    loading: deleteLoading,
    setLoading: setDeleteLoading,
    setParams: setDeleteParams,
    data: deleteData,
    errorData: deleteErrorData,
  } = apiDeleteHooks
    ? apiDeleteHooks
    : {
        // 空值
        loading: null,
        setLoading: null,
        setParams: null,
        data: null,
        errorData: null,
      };

  // 搜索表单 hooks
  const { form, validatedContainer, validateFields } = useCustomForm(
    filters,
    (newformData) => setFormData(update(formData, { $merge: newformData })),
  );

  const onSubmit = async () => {
    await validateFields();
    if (!validatedContainer.validated) return;
    setParams(formData);
    setLoading(true);
  };

  const [otherHooks, setOtherHooks] = useState<{
    [index: string]: componentData.DialogFormHooks;
  }>({});

  useEffect(() => {}, []);
  otherActions &&
    otherActions.forEach((item) => {
      if (item.type == 'dialog') {
        otherHooks[item.key] = useDialogForm(
          item.hooks.api,
          item.hooks.propData,
          item.hooks.title,
          item.hooks.onSubmit,
        );
      }
    });

  const otherCol: TableProps<T>['columns'] =
    otherActions || apiDeleteHooks || apiEditHooks
      ? [
          {
            title: '操作',
            width: 80,
            fixed: 'right',
            render: (value, record, index) => {
              const editBtn = apiEditHooks ? (
                <Tooltip title="修改">
                  <Button
                    icon={<EditOutlined />}
                    type="text"
                    shape="circle"
                    onClick={() => {
                      setEditForm && setEditForm(editData(record));
                      setEditVisible && setEditVisible(true);
                    }}
                  />
                </Tooltip>
              ) : null;
              const deleteBtn = deleteData ? (
                <Tooltip title="删除">
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    type="text"
                    shape="circle"
                    onClick={() => {
                      setDeleteParams && setDeleteParams(oDeleteData(record));
                      setDeleteLoading && setDeleteLoading(true);
                    }}
                  />
                </Tooltip>
              ) : null;
              return (
                <>
                  {editBtn}
                  {deleteBtn}
                  {otherActions ? (
                    <Dropdown
                      overlay={
                        <Menu>
                          {otherActions?.map((item) => {
                            return (
                              <Menu.Item
                                key={item.text}
                                onClick={() => {
                                  let param: any = {};
                                  if (item.type == 'dialog') {
                                    param = item.apiParamKeys(record);
                                    otherHooks[item.key].setForm(param);
                                    otherHooks[item.key].setVisible(true);
                                  } else {
                                    item.hooks.setParams(
                                      item.apiParamKeys(record),
                                    );
                                    item.hooks.setLoading(true);
                                  }
                                }}
                              >
                                {item.text}
                              </Menu.Item>
                            );
                          })}
                        </Menu>
                      }
                    >
                      <Button
                        icon={<DownOutlined />}
                        type="text"
                        shape="circle"
                      ></Button>
                    </Dropdown>
                  ) : null}
                </>
              );
            },
          },
        ]
      : [];
  return (
    <>
      <BaseTable
        Filter={form}
        FilterBtn={
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              height: '100%',
              minHeight: '5rem',
            }}
          >
            <Button loading={loading} type="primary" onClick={onSubmit}>
              搜索
            </Button>
            {SortSelect}
          </div>
        }
        TableActionLeft={
          extraComponent?.Left || apiAddHooks ? (
            <Space>
              {apiAddHooks ? (
                <Button onClick={() => setAddVisible && setAddVisible(true)}>
                  新建
                </Button>
              ) : null}
              {extraComponent?.Left}
            </Space>
          ) : undefined
        }
        TableActionRight={
          extraComponent?.Right || apiMuiltActionDialogHooks ? (
            <Space>
              {extraComponent?.Right}
              {apiMuiltActionDialogHooks ? (
                <Button
                  disabled={selectedList.length === 0}
                  type="primary"
                  onClick={() => {
                    apiMuiltActionDialogHooks.updateDefaultFormData({
                      id: selectedList,
                    });
                    apiMuiltActionDialogHooks.setVisible(true);
                  }}
                >
                  {`操作选中项 (${selectedList.length})`}
                </Button>
              ) : undefined}
            </Space>
          ) : undefined
        }
        Table={
          <Table
            scroll={{ x: 1350 }}
            loading={loading}
            dataSource={data.data?.content}
            columns={(colums || []).concat(otherCol)}
            rowSelection={apiDeleteHooks ? rowSelection : undefined}
            rowKey={'id'}
            sticky
            pagination={{
              position: ['bottomCenter'],
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '30'],
              onShowSizeChange: (current, size) => {
                formData.count = size;
                setParams(formData);
                setLoading(true);
              },
              total: data.data?.totalRecords,
              onChange: (page, pageSize) => {
                formData.page = page;
                setParams(formData);
                setLoading(true);
              },
            }}
            expandable={expandable}
            onRow={onRow}
          ></Table>
        }
      />
      {AddDialogForm}
      {EditDialogForm}
      {Object.keys(otherHooks).map((item) => otherHooks[item].DialogForm)}
      {apiMuiltActionDialogHooks?.MuitActionDialog}
    </>
  );
};

export default CustomTable;
