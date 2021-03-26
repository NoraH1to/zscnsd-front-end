import { ReactElement, useEffect, useState } from 'react';
import { useCustomForm } from '@/hooks';
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
  DownOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';
import BaseTable from '@/components/BaseTable';
import apiInterface from 'api';
import componentData from 'typings';
import { useDialogForm } from '@/hooks';
import { history } from 'umi';
import { TableFilterType } from '@/common';
import moment from 'moment';
import { map, reduce, type } from 'ramda';
import { formatDate } from '@/utils';

interface Props<T extends object> {
  formData: any;
  setFormData: any;
  filters: componentData.PropData[];
  colums: TableProps<T>['columns'];
  actions?: componentData.CustomTableAction[];
  apiHooks: any;
  apiAddHooks?: componentData.DialogFormHooks;
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

export const setDefaultDataInFilters = (
  filters: componentData.PropData[],
  defaultFormData?: any,
) => {
  if (defaultFormData)
    return filters.map((item) => {
      // 事件范围需要特殊处理成 moment 数组
      if (
        item.type == TableFilterType.timeRange &&
        defaultFormData.start &&
        defaultFormData.end
      ) {
        return update(item, {
          default: {
            $set: [moment(defaultFormData.start), moment(defaultFormData.end)],
          },
        });
      } else {
        return defaultFormData?.[item.key]
          ? update(item, { default: { $set: defaultFormData?.[item.key] } })
          : item;
      }
    });
  return filters;
};

export const useTableSort = (
  sortList?: apiInterface.Enum[],
  onChange?: (data: any) => void,
): Sorter => {
  const [formData, setFormData] = useState<{
    sort: string;
    order: 'desc' | 'asc';
  }>({ sort: '', order: 'asc' });

  const SortSelect = sortList ? (
    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '1rem' }}>
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

export const dateCell = (dateStr: string[]) =>
  dateStr && dateStr.length > 0 ? (
    <Space direction="vertical">
      {map(
      (date) => (
        <Typography.Text>
          {formatDate(date)}
        </Typography.Text>
      ),
      dateStr,
    )}
    </Space>
  ) : (
    <Typography.Text>{'_null'}</Typography.Text>
  );

export const dateRangeCell = (dateStr: string[]) =>
  dateStr && dateStr.length > 0 ? (
    <Space direction="vertical">
      <Typography.Text>
        {formatDate(dateStr[0])}
      </Typography.Text>
      {!!dateStr[1] ? (
        <>
          <Typography.Text style={{ display: 'block', textAlign: 'center' }}>
            {'->'}
          </Typography.Text>
          <Typography.Text>
            {formatDate(dateStr[1])}
          </Typography.Text>
        </>
      ) : undefined}
    </Space>
  ) : (
    <Typography.Text>{'_null'}</Typography.Text>
  );

export const goUserCenterCell = (user: apiInterface.User) =>
  getRouteCell(user.name, '/');

export const goMemberCenterCell = (user: apiInterface.Member) =>
  getRouteCell(`${user.name}-${user.member?.workId || '已退出'}`, '/');

export const getRouteCell = (text: string, target: string): ReactElement => (
  <Typography.Link
    onClick={(e) => {
      history.push(target);
      e.stopPropagation();
    }}
  >
    {text}
  </Typography.Link>
);

const CustomTable = <T extends object>(props: Props<T>) => {
  const {
    formData,
    setFormData,
    filters,
    colums,
    actions,
    apiHooks,
    apiAddHooks,
    apiMuiltActionDialogHooks,
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

  // 数据变化要进行的一些操作
  useEffect(() => {
    setSelectedList([]);
  }, [data]);

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

  // 搜索表单 hooks
  const {
    form,
    validatedContainer,
    validateFields,
    formRef,
  } = useCustomForm(filters, (newformData) =>
    setFormData(update(formData, { $merge: newformData })),
  );

  // 表格上方表单提交
  const onSubmit = async () => {
    await validateFields();
    if (!validatedContainer.validated) return;
    setParams(formData);
    setLoading(true);
  };

  // actions 中使用到 dialogHooks 的
  const [otherDialogHooks, setOtherDialogHooks] = useState<{
    [index: string]: componentData.DialogFormHooks;
  }>({});

  // 外部传入的 actions (表格操作列)
  actions &&
    actions.forEach((item) => {
      if (item.type == 'dialog') {
        otherDialogHooks[item.key] = useDialogForm(
          item.hooks.api,
          item.hooks.propData,
          item.hooks.title,
          item.hooks.onSubmit,
        );
      }
    });

  // 根据 actions 生成列的操作按钮，第三个开始放入菜单中
  const otherCol: TableProps<T>['columns'] = actions
    ? [
        {
          title: '操作',
          width: 130,
          fixed: 'right',
          render: (value, record, index) => {
            const outMenu = actions.slice(0, 2);
            const inMenu = actions.slice(2);
            return (
              <>
                {outMenu.map((item) => (
                  <Tooltip title={item.text} key={`${item.key}-${index}`}>
                    <Button
                      icon={item.icon}
                      type="text"
                      shape={item.icon ? 'circle' : undefined}
                      onClick={() => {
                        let param: any = {};
                        if (item.type == 'dialog') {
                          param = item.apiParamKeys(record);
                          otherDialogHooks[item.key].setForm(param);
                          otherDialogHooks[item.key].setVisible(true);
                        } else {
                          item.hooks.setParams(item.apiParamKeys(record));
                          item.hooks.setLoading(true);
                        }
                      }}
                      {...item.btnProps}
                    />
                  </Tooltip>
                ))}
                {inMenu?.length > 0 ? (
                  <Dropdown
                    overlay={
                      <Menu>
                        {inMenu?.map((item) => {
                          return (
                            <Menu.Item
                              key={`${item.key}-${index}`}
                              onClick={() => {
                                let param: any = {};
                                if (item.type == 'dialog') {
                                  param = item.apiParamKeys(record);
                                  otherDialogHooks[item.key].setForm(param);
                                  otherDialogHooks[item.key].setVisible(true);
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
            scroll={{
              x: reduce(
                (acc, value) => acc + parseInt(value.width?.toString() || '0'),
                0,
                (colums || []).concat(otherCol),
              ),
            }}
            loading={loading}
            dataSource={data.data?.content}
            columns={(colums || []).concat(otherCol)}
            rowSelection={apiMuiltActionDialogHooks ? rowSelection : undefined}
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
      {Object.keys(otherDialogHooks).map(
        (item) => otherDialogHooks[item].DialogForm,
      )}
      {apiMuiltActionDialogHooks?.MuitActionDialog}
    </>
  );
};

export default CustomTable;
