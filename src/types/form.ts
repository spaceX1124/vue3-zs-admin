import { CellRenderType } from './table.ts'
import type { FormItemRule } from 'element-plus'
import { ComponentType, ComponentProps, ComponentEmits, FormActionType } from '@/components/common/Form'
import { VNode } from 'vue'
import { Common } from './index'

/**
 * 异步请求及字段取值自定义
 * */
export interface AsyncType {
    label?: string; // 可自定义名称
    value?: string; // 可自定义值
    url?: string; // 接口地址
    data?: Global.Recordable; // 接口参数
    remote?: boolean; // 是否开启远程输入搜索
    remoteKey?: string; // 远程输入搜索所需key
}
type SlotRender = (() => VNode | string) | VNode | string
/**
 * 组件渲染所需插槽
 * */
export interface RenderComponentSlot{
    slotName: string;
    slotRender: SlotRender
}
/**
 * 自定义rule的数据可能需要表单数据和当前字段信息
 * */
interface DynamicRules {
    formModel: Global.Recordable;
    schema: Common.BasicForm
}
/**
 * 栅格样式类型
 * */
interface ColEx {
    span?: number; // 栅格占据的列数
    offset?: number; // 栅格左侧的间隔格数
    xs?: number; // <768px
    sm?: number; // ≥768px
    md?: number; // ≥992px
    lg?: number; // ≥1200px
    xl?: number; // ≥1920px
}

/**
 * 表格表单基础数据格式
 * */
interface BaseFormSchema<T extends ComponentType = any> {
    key: string; // （回显表格数据所需key | 表单绑定所需要的key）
    keyArr?: string[]; //  多值的时候，需要key一一对应
    title?: string; // 名称
    componentProps?: ComponentProps[T]; // 组件props参数
    componentEmits?: (({ updateSchema }:{updateSchema?: FormActionType['updateSchema']}) => ComponentEmits[T]) | ComponentEmits[T]; // 组件执行的一些方法
    renderComponentSlot?: RenderComponentSlot | RenderComponentSlot[]; // 组件插槽
    width?: string; // 列宽度，不设置当前列宽就是自适应的,用于表格列宽
    minWidth?: string; // 列最小宽
    type?: 'seq' | 'checkbox' | 'radio' | 'expand'; // 表格当前列可以是 序号 | 复选框 | 单选框 | 展开行
    cellRender?: CellRenderType; // 表格渲染函数
    search?: boolean; // 该字段是否在搜索框中
    tableHidden?: boolean; // 表格中是否隐藏
    formHidden?: boolean; // 新增表单中是否隐藏
    async?:AsyncType; // 异步请求
    dataList?: Common.List[]; // 需要本地list数据
    dynamicRules?:(params?: DynamicRules) => FormItemRule[]; // 自定义校验规则
    defaultValue?: string | string[] // 默认值
    required?: boolean; // 是否必填
    colSpan?: ColEx;// 字段栅格布局样式，用于表单布局
}
interface ComponentFormSchema<T extends ComponentType = any> extends BaseFormSchema<T> {
    component: T;
}

type ComponentFormSchemaType<T extends ComponentType = ComponentType> = T extends any
    ? ComponentFormSchema<T>
    : never;

export type FormSchema = ComponentFormSchemaType;