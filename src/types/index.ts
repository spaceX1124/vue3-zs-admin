import { FormSchema } from './form.ts'

/**
 * 通用的命名空间
 * */
export namespace Common {
    // 表格，表单所需数据格式
    export type BasicForm = FormSchema
    // 表格操作按钮
    export interface OperateType {
        buttonType: 'edit' | 'delete' | 'customer'; // 按钮类型
        title: string; // 按钮名称
        click?: () => void // 自定义的时候会用到，编辑和删除在组件内部去实现，只需要配置获取详情接口和更新接口即可
        width?: number; // 用于计算按钮在操作列的宽度，并不是按钮的宽度（如2个按钮，都是设置width：100，则操作列的宽度则为200）
        type?: 'primary'| 'success'| 'warning'| 'danger'| 'info'; // 按钮样式
        deleteData?: {
            async: {
                url: string // 接口地址
                method: 'get' | 'post'
            },
            deleteKey?: string; // 删除数据所需要的自定义key，默认是id
            confirmTitle?: string; // 用于删除的弹窗文案
        }
    }
    // 数组格式
    export interface List {
        label: string;
        value: any;
        disabled?: boolean;
        children?: List[];
        [key: string]: any;
    }
    // 请求方法
    export type Method = 'get' | 'post';

}

export namespace Business {
    // 菜单
    export interface MenuItem {
        id: number;
        title: string;
        name: string;
        path: string;
        icon?: string;
        children?: MenuItem[];
    }
}