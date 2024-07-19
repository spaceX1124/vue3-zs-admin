import { Common } from '@/types'

export const schemas: Common.BasicForm[] = [
  {
    key: 'key13',
    title: '单选',
    component: 'BasicTitle',
    colSpan: {
      span: 24
    }
  },
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
    title: '禁用某个选项，可直接在数据中设置disabled',
    component: 'Select',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2, disabled: true }
    ]
  },
  {
    key: 'key11',
    title: '禁用某个选项，可直接通过属性控制',
    component: 'Select',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ],
    componentProps: {
      disabledOptions: [0, '1'] //  表明传数字字符串都行，也可以传字符串或数字
    }
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
            updateSchema && updateSchema([
              {
                key: 'key5',
                formHidden: false,
                component: 'Select'
              },
              {
                key: 'key6',
                formHidden: false,
                component: 'Select'
              }
            ])
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
  },
  {
    key: 'key7',
    title: '隐藏一个选项，本地数据',
    component: 'Select',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ],
    componentProps: {
      hiddenOptions: 1
    }
  },
  {
    key: 'key7',
    title: '隐藏多个选项，本地数据',
    component: 'Select',
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
    key: 'key8',
    title: '隐藏多个选项，远程数据',
    component: 'Select',
    componentProps: {
      hiddenOptions: [1, 3]
    },
    async: {
      label: 'name',
      value: 'id',
      url: '/getList',
      data: { id: 1 }
    }
  },
  {
    key: 'key9',
    title: '远程输入加载数据',
    component: 'Select',
    async: {
      label: 'name',
      value: 'id',
      url: '/getList',
      data: { id: 1 }, // 搜索的时候额外的参数，如果没有就不传
      remote: true,
      remoteKey: 'searchVal'
    }
  },
  {
    key: 'key10',
    title: '本地数据，可筛选',
    component: 'Select',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ],
    componentProps: {
      filterable: true
    }
  },
  {
    key: 'key14',
    title: '多选',
    component: 'BasicTitle',
    colSpan: {
      span: 24
    }
  },
  {
    key: 'key231',
    title: '我要的值是字符串',
    component: 'Select',
    async: {
      label: 'name',
      value: 'id',
      url: '/getList',
      data: { id: 1 }
    },
    componentProps: {
      multiple: true,
      valIsArray: false
    }
  },
  {
    key: 'key2321',
    title: '我要的值是数组',
    component: 'Select',
    async: {
      label: 'name',
      value: 'id',
      url: '/getList',
      data: { id: 1 }
    },
    componentProps: {
      multiple: true
    }
  },
  {
    key: 'key111',
    title: '本地数据下拉',
    component: 'Select',
    dataList: [
      { label: '选项是颠倒是非第三方1', value: 0 },
      { label: '选项是多福多寿2', value: 1 },
      { label: '选项防抖是非得失3', value: 2 },
      { label: '选反倒是f d s项4', value: 3 },
      { label: '选 反倒是方式d项fs4', value: 4 },
      { label: '选项是否史蒂夫 4', value: 5 },
      { label: '选项 反倒是411', value: 6 },
      { label: '选项422', value: 7 },
      { label: '选项4', value: 8 },
      { label: '选项1333dsf', value: 9 },
      { label: '选项2', value: 10 },
      { label: '选项3fdsf', value: 21 },
      { label: '选项4', value: 31 },
      { label: '选项4', value: 312 },
      { label: '选项4', value: 313 },
      { label: '选项4', value: 314 },
      { label: '选项4', value: 315 },
      { label: '选项4', value: 316 }
    ],
    componentProps: {
      multiple: true,
      collapseTags: true,
      collapseTagsTooltip: true
    }
  },
  {
    key: 'key21',
    title: '远程数据下拉',
    component: 'Select',
    async: {
      label: 'name',
      value: 'id',
      url: '/getList',
      data: { id: 1 }
    },
    componentProps: {
      multiple: true
    }
  },
  {
    key: 'key31',
    title: '禁用某个选项，可直接在数据中设置disabled',
    component: 'Select',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2, disabled: true }
    ],
    componentProps: {
      multiple: true
    }
  },
  {
    key: 'key41',
    title: '禁用某个选项，可直接通过属性控制',
    component: 'Select',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ],
    componentProps: {
      disabledOptions: [0, '1'], //  表明传数字字符串都行，也可以传字符串或数字
      multiple: true
    }
  },
  {
    key: 'key71',
    title: '隐藏一个选项，本地数据',
    component: 'Select',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ],
    componentProps: {
      hiddenOptions: 1,
      multiple: true
    }
  },
  {
    key: 'key81',
    title: '隐藏多个选项，本地数据',
    component: 'Select',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ],
    componentProps: {
      hiddenOptions: [0, 2],
      multiple: true
    }
  },
  {
    key: 'key82',
    title: '隐藏多个选项，远程数据',
    component: 'Select',
    componentProps: {
      hiddenOptions: [1, 3],
      multiple: true
    },
    async: {
      label: 'name',
      value: 'id',
      url: '/getList',
      data: { id: 1 }
    }
  },
  {
    key: 'key91',
    title: '远程输入加载数据',
    component: 'Select',
    async: {
      label: 'name',
      value: 'id',
      url: '/getList',
      data: { id: 1 }, // 搜索的时候额外的参数，如果没有就不传
      remote: true,
      remoteKey: 'searchVal'
    },
    componentProps: {
      multiple: true
    }
  },
  {
    key: 'key101',
    title: '本地数据，可筛选',
    component: 'Select',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ],
    componentProps: {
      filterable: true,
      multiple: true
    }
  }
]
