import { IHMListItemProps } from "../ListIttem";
import { IHMOption } from "../SearchSelect";

export enum EFieldType {
    TEXT_AREA = 'textArea',
    SEARCH_SELECT = 'selectpicker'
};

export interface IAttrs {
    [prop: string]: any;
    label?: string;
    fieldKey: string;
    placeholder?: string;
    onFieldChange?: (value: any, action?: any) => void;
    required?: boolean;
    value?: any;
    readOnly?: boolean;
    fieldType?: string;
    options?: IHMListItemProps[];
};

export interface IInputFieldProps {
    [prop: string]: any;
    label?: string;
    updateValue?: IUpdateValue;
    fieldKey?: any;
    onFieldChange?: any;
    fieldType?: string;
};

export type IUpdateValue = (value: string) => void;