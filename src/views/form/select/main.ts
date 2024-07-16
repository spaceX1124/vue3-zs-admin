import { Common } from '@/types'

export const schemas: Common.BasicForm[] = [
  {
    key: 'key1',
    title: '本地数据下拉',
    component: 'Select',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ]
  },
  {
    key: 'key2',
    title: '远程数据下拉',
    component: 'Select',
    async: {
      label: 'name',
      value: 'id',
      url: '/getList',
      data: { id: 1 }
    }
  },
  {
    key: 'key3',
    title: '禁用某个选项',
    component: 'Select',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2, disabled: true }
    ]
  },
  {
    key: 'key4',
    title: '控制key5和key6显示隐藏',
    component: 'Select',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ],
    componentEmits ({ updateSchema }) {
      return {
        change (innerValue) {
          if (innerValue === '1') {
            // 控制key5和key6显示
            updateSchema({
              key: 'key5',
              formHidden: false
            })
          }
        }
      }
    }
  },
  {
    key: 'key5',
    title: 'key5',
    component: 'Select',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ],
    formHidden: true
  },
  {
    key: 'key6',
    title: 'key6',
    component: 'Select',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ],
    formHidden: true
  }
]
