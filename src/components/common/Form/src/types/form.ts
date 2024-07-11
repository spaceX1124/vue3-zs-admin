import { ComponentType, ComponentProps, ComponentEmits } from './index'

interface BaseFormSchema<T extends ComponentType = any> {
    key: string; // （回显表格数据所需key | 表单绑定所需要的key）
    keyArr?: string[]; //  多值的时候，需要key一一对应
    title?: string; // 名称
    componentProps?: ComponentProps[T]; // 组件props参数
    componentEmits?:ComponentEmits[T]; // 组件执行的一些方法
}
export interface ComponentFormSchema<T extends ComponentType = any> extends BaseFormSchema<T> {
    component: T;
}

type ComponentFormSchemaType<T extends ComponentType = ComponentType> = T extends any
    ? ComponentFormSchema<T>
    : never;

export type FormSchema = ComponentFormSchemaType;