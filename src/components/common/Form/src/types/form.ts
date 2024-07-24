import { Common } from '@/types'
/**
 * 栅格样式类型
 * */
export interface ColEx {
    span?: number; // 栅格占据的列数
    offset?: number; // 栅格左侧的间隔格数
    xs?: number; // <768px
    sm?: number; // ≥768px
    md?: number; // ≥992px
    lg?: number; // ≥1200px
    xl?: number; // ≥1920px
}

/**
 * useForm所需参数
 * */
export interface BasicFormProps {
    schemas?:Common.BasicForm[], // 表单项数据
    labelPosition?: 'left' | 'top' | 'right';// 表单标签位置
    baseColspan?: number | ColEx; // 整个表单的栅格布局
    gutter?: number; // 栅格间隔
    globDisabled?: boolean; // 整个表单是否置灰
    formData?: Global.Recordable; // 表单数据，如编辑时，或者搜索时加了缓存，进来的时候要直接回显
}

export interface FormActionType {
    setProps: (props: BasicFormProps) => void;
    setFormModelValue: (key: string, value: any, schema: Common.BasicForm) => void;
    setFieldsValue: (values: Global.Recordable) => void
    updateSchema: (schema: Common.BasicForm | Common.BasicForm[]) => void
}

export interface EmitEvent {
    (e: 'register', tableAction: FormActionType): void;
    (e: 'submit', formModel: Global.Recordable): void;
}