import { Common } from '@/types'

export const schemas: Common.BasicForm[] = [
  {
    key: 'key1',
    component: 'Input',
    title: '姓名',
    width: '100px',
    fixed: 'left'
  },
  {
    key: 'key2',
    component: 'Select',
    title: '性别',
    dataList: [
      { label: '男', value: 0 },
      { label: '女', value: 1 },
      { label: '保密', value: 2 }
    ]
  },
  {
    key: 'key3',
    component: 'Select',
    title: '爱好',
    async: {
      url: '/hobbyList',
      method: 'get',
      label: 'title',
      value: 'id'
    }
  },
  {
    key: 'key4',
    component: 'Date',
    title: '创建日期'
  },
  {
    key: 'key5',
    component: 'Input',
    title: '备注一行'
  },
  {
    key: 'key6',
    component: 'Input',
    title: '备注3行',
    lineClamp: 3
  },
  {
    key: 'key7',
    component: 'Select',
    title: '爱好数据是字符串',
    async: {
      url: '/hobbyList',
      method: 'get',
      label: 'title',
      value: 'id'
    },
    componentProps: {
      multiple: true
    }
  },
  {
    key: 'key8',
    component: 'Select',
    title: '爱好数据是数组',
    async: {
      url: '/hobbyList',
      method: 'get',
      label: 'title',
      value: 'id'
    },
    componentProps: {
      multiple: true
    },
    splitStyle: '/'
  },
  {
    key: 'key9',
    component: 'Upload',
    title: '图片',
    formHidden: true
  },
  {
    key: 'key10',
    component: 'Upload',
    title: '2张图片',
    formHidden: true
  },
  {
    key: 'key31',
    title: '禁用某个选项',
    component: 'Select',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2, disabled: true }
    ],
    componentProps: {
      multiple: true
    },
    tableHidden: true
  }
]
