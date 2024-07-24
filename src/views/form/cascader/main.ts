import { Common } from '@/types'

export const schemas: Common.BasicForm[] = [
  {
    key: 'key1',
    title: '级联单选-本地数据-值是数组',
    component: 'Cascader',
    dataList: [
      {
        label: '选项1',
        value: 0,
        children: [
          { label: '选项1-1', value: 10 }
        ]
      },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ]
  },
  {
    key: 'key2',
    title: '级联单选-本地数据-值是字符串',
    component: 'Cascader',
    dataList: [
      {
        label: '选项1',
        value: 0,
        children: [
          { label: '选项1-1', value: 10 }
        ]
      },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ],
    componentProps: {
      valIsArray: false
    }
  },
  {
    key: 'key3',
    title: '级联多选-本地数据',
    component: 'Cascader',
    dataList: [
      {
        label: '选项1',
        value: 0,
        children: [
          { label: '选项1-1', value: 10 }
        ]
      },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ],
    componentProps: {
      multiple: true
    }
  },
  {
    key: 'key4',
    title: '父子节点不互相关联',
    component: 'Cascader',
    dataList: [
      {
        label: '选项1',
        value: 0,
        children: [
          { label: '选项1-1', value: 10 }
        ]
      },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ],
    componentProps: {
      checkStrictly: true
    }
  },
  {
    key: 'key5',
    title: '级联多选-异步数据',
    component: 'Cascader',
    async: {
      label: 'name',
      value: 'id',
      children: 'children',
      url: '/getList',
      data: { id: 1 }
    },
    componentProps: {
      multiple: true
    }
  },
  {
    key: 'key6',
    title: '输入过滤',
    component: 'Cascader',
    async: {
      label: 'name',
      value: 'id',
      children: 'children',
      url: '/getList',
      data: { id: 1 }
    },
    componentProps: {
      filterable: true
    }
  },
  {
    key: 'key7',
    title: '动态加载数据',
    component: 'Cascader',
    async: {
      label: 'name',
      value: 'id',
      children: 'children',
      url: '/getList',
      data: { id: 1 }
    },
    componentProps: {
      lazy: true
    }
  }
]