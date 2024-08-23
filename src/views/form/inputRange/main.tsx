import { Common } from '@/types'
import {validatorInputRange} from '@/utils/rules'



export const schemas:Common.BasicForm[] = [
  {
    key: 'title1',
    title: '单行文本',
    component: 'BasicTitle',
    colSpan: 24
  },
  {
    key: 'key1',
    keyArr: ['first', 'last'],
    title: '区间输入',
    component: 'InputRange',
    componentProps: {
      positiveInteger: true // 只能输入正整数
    },
    required: true,
    dynamicRules(params) {
      return [{
        validator: validatorInputRange(params), trigger: 'blur'
      }]
    }
  }
]