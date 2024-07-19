import { Common } from '@/types'

export const schemas: Common.BasicForm[] = [
  {
    key: 'key1',
    title: '复选框-本地数据，展示全选',
    component: 'Checkbox',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ],
    componentProps: {
      checkAll: true
    }
  },
  {
    key: 'key2',
    title: '复选框-异步数据',
    component: 'Checkbox',
    async: {
      label: 'name',
      value: 'id',
      url: '/getList',
      data: { id: 1 }
    }
  },
  {
    key: 'key3',
    title: '我要的值是字符串',
    component: 'Checkbox',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ],
    componentProps: {
      valIsArray: false
    }
  },
  {
    key: 'key4',
    title: '我要的值是数组',
    component: 'Checkbox',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ]
  },
  {
    key: 'key5',
    title: '必填',
    component: 'Checkbox',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ]
  },
  {
    key: 'key6',
    title: '隐藏选项1和选项3',
    component: 'Checkbox',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ],
    componentProps: {
      hiddenOptions: [0, 2]
    }
  },
  {
    key: 'key7',
    title: '置灰选项1和选项3',
    component: 'Checkbox',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ],
    componentProps: {
      disabledOptions: [0, 2]
    }
  },
  {
    key: 'key8',
    title: '复选框-本地数据-必填',
    component: 'Checkbox',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 },
      { label: '选项11', value: 3 },
      { label: '选项22', value: 4 },
      { label: '选项33', value: 5 },
      { label: '选项111', value: 6 },
      { label: '选项222', value: 7 },
      { label: '选项333', value: 28 }
    ],
    required: true
  }
]