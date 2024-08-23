import { Common } from '@/types'
/**
 * 栅格样式类型
 * */
export interface ColEx {
  span?: number // 栅格占据的列数
  offset?: number // 栅格左侧的间隔格数
  xs?: number // <768px
  sm?: number // ≥768px
  md?: number // ≥992px
  lg?: number // ≥1200px
  xl?: number // ≥1920px
}

/**
 * useForm所需参数
 * */
export interface BasicFormProps {
  schemas?: Common.BasicForm[] // 表单项数据
  hiddenLabel?: boolean // 是否隐藏label，@todo 等会再处理这个属性
  labelPosition?: 'left' | 'top' | 'right' // 表单标签位置
  openLayout?: boolean // 开启栅格布局
  baseColspan?: number | ColEx // 整个表单的栅格布局, 控制一行展示几个
  gutter?: number // 元素间隔
  openGrid?: boolean // 开启grid响应式布局
  gridTemplateColumns?: number // 如300，则表单中的元素的宽度最小就是300px，为什么是最小，当表单容器宽700时，一行只能放2个，那么这2个的宽度平分，如果是900，那就刚好300一个
  globDisabled?: boolean // 整个表单是否置灰
  formData?: Global.Recordable // 表单数据，如编辑时，或者搜索时加了缓存，进来的时候要直接回显
}

export interface FormActionType {
  setFormProps: (props: BasicFormProps) => void
  setFormModelValue: (key: string, value: any, schema: Common.BasicForm) => void
  setFieldsValue: (values: Global.Recordable) => void
  updateSchema: (schema: Common.BasicForm | Common.BasicForm[]) => void
  clearFormValues: Global.Fn
  submit: Global.PromiseFn<any, Global.Recordable | undefined>
}

export interface EmitEvent {
  (e: 'registerForm', formAction: FormActionType): void
  (e: 'submit', formModel: Global.Recordable): void
}
