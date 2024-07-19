import { Common } from '@/types'

export const schemas: Common.BasicForm[] = [
  {
    key: 'key1',
    title: '复选框-本地数据',
    component: 'Checkbox',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ]
  }
]