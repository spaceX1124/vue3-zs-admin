import { FormSchema } from './form.ts'

/**
 * 通用的命名空间
 * */
export namespace Common {
    // 表格，表单所需数据格式
    export type BasicForm = FormSchema
    // 数组格式
    export interface List {
        label: string;
        value: any;
        disabled?: boolean;
    }
}