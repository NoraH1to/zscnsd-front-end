import { TableFilterType } from '@/common';
import { FormInstance } from 'antd';
import { AxiosResponse } from 'axios';
import { Rule } from 'rc-field-form/lib/interface';
import React from 'react';

declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

export = componentData;
export as namespace componentData;

declare namespace componentData {
  interface CustomTableOtherAction {
    key: string;
    text: string;
    hooks: componentData.DialogFormHooks | any;
    apiParamKeys: (record: any) => any;
    type: 'dialog' | 'api';
  }
  interface CustomFormHooks {
    form?: JSX.Element;
    validateFields: () => Promise<void>;
    validatedContainer: {
      validated: boolean;
    };
    formRef: FormInstance<any>;
    setPropData: any;
  }
  interface DialogFormHooks {
    visible: boolean;
    setVisible: React.Dispatch<boolean>;
    DialogForm: JSX.Element;
    setForm: <T>(data: T) => void;
  }
  interface MuitActionDialogHooks {
    visible: boolean;
    setVisible: React.Dispatch<boolean>;
    MuitActionDialog: JSX.Element;
    updateDefaultFormData: (data: any) => void;
  }
  interface PropData {
    key: string;
    name: string;
    type: TableFilterType;
    rules?: Rule[];
    selectData?:
      | apiInterface.Enum[]
      | ((params?: any) => Promise<AxiosResponse<apiInterface.Response>>)
      | any;
    searchOption?: {
      keyProp: string;
      labelProp: string;
    };
    default?: any;
    holder?: string;
    timeRange?: {
      rangeStartProp: string;
      rangeEndProp: string;
    };
    hidden?: boolean;
  }
  interface OnFormChange {
    (formData: any): void;
  }
  interface CustomFormProp {
    propData: PropData[];
    onChange: OnFormChange;
  }
  interface CustomFormDialogProp extends CustomFormProp {
    title: string;
    visible: boolean;
    onOk: (e: React.MouseEvent<HTMLElement, MouseEvent>) => any;
    onCancel?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => any;
  }
  interface MuitActionProp {
    key: string;
    value: string;
    propData: PropData[];
    api: any;
  }
}
