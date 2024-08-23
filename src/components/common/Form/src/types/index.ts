import type { Component, VNodeProps } from 'vue'
import { InputEmitsType } from '../components/Input.vue'
import { SelectEmitsType } from '../components/Select.vue'
import { RadioEmitsType } from '../components/Radio.vue'
import { CheckboxEmitsType } from '../components/Checkbox.vue'
import { CascaderEmitsType } from '../components/Cascader.vue'
import { DateEmitsType } from '../components/Date.vue'
import { UploadEmitsType } from '../components/Upload.vue'
import { InputRangeEmitsType } from '../components/InputRange.vue'

type ExtractPropTypes<T extends Component> = T extends new (...args: any) => any
  ? Omit<InstanceType<T>['$props']['options'], keyof VNodeProps>
  : never

/**
 * 注：typeof import('element-plus/es/components/input')['default']得到的是input组件的构造函数类型，
 * 这个构造函数可以用来创建Vue组件实例，接收props、提供模板、方法、生命周期钩子组件、计算属性等Vue组件的所有特性
 * InstanceType<T>， 获取构造函数的返回的实例类型，InstanceType<T>['$props']拿到的就是实例中的所有props
 */

export interface ComponentProps {
  Input: ExtractPropTypes<typeof import('../components/Input.vue')['default']>
  Select: ExtractPropTypes<typeof import('../components/Select.vue')['default']>
  Radio: ExtractPropTypes<typeof import('../components/Radio.vue')['default']>
  Checkbox: ExtractPropTypes<typeof import('../components/Checkbox.vue')['default']>
  Cascader: ExtractPropTypes<typeof import('../components/Cascader.vue')['default']>
  Date: ExtractPropTypes<typeof import('../components/Date.vue')['default']>
  Upload: ExtractPropTypes<typeof import('../components/Upload.vue')['default']>
  InputRange: ExtractPropTypes<typeof import('../components/InputRange.vue')['default']>
  BasicTitle: ExtractPropTypes<typeof import('../components/BasicTitle.vue')['default']>
}

export interface ComponentEmits {
  Input: InputEmitsType
  Select: SelectEmitsType
  Radio: RadioEmitsType
  Checkbox: CheckboxEmitsType
  Cascader: CascaderEmitsType
  Date: DateEmitsType
  Upload: UploadEmitsType
  InputRange: InputRangeEmitsType
  BasicTitle: Object
}

export type ComponentType = keyof ComponentProps
