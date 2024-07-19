import { Common } from '@/types'

export const schemas: Common.BasicForm[] = [
  {
    key: 'key1',
    title: '单选框-本地数据',
    component: 'Radio',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ]

  },
  {
    key: 'key2',
    title: '单选框-异步数据',
    component: 'Radio',
    async: {
      label: 'name',
      value: 'id',
      url: '/getList',
      data: { id: 1 }
    }
  },
  {
    key: 'key3',
    title: '单选框-禁用, 可直接改本地数据的disabled',
    component: 'Radio',
    dataList: [
      { label: '选项1', value: 0, disabled: true },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ]
  },
  {
    key: 'key4',
    title: '单选框-禁用，通过属性控制',
    component: 'Radio',
    dataList: [
      { label: '选项1', value: 0, disabled: true },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ],
    componentProps: {
      disabledOptions: [0, '1']
    }
  },
  {
    key: 'key5',
    title: '单选框-布尔值',
    component: 'Radio',
    dataList: [
      { label: '是', value: true },
      { label: '否', value: false }
    ]
  },
  {
    key: 'key6',
    title: '单选框-删除某个选项，通过属性控制',
    component: 'Radio',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ],
    componentProps: {
      hiddenOptions: ['1']
    },
    required: true
  }
]