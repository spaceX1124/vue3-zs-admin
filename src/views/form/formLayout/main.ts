import { Common } from '@/types'
import { validateEmail, validateIdCard } from '@/utils/rules.ts'

export const schemas: Common.BasicForm[] = [
  {
    key: 'key1',
    title: '单行输入框',
    component: 'Input'
  },
  {
    key: 'key2',
    title: '多行输入框',
    component: 'Input',
    componentProps: {
      type: 'textarea'
    }
  },
  {
    key: 'key3',
    title: '整数',
    component: 'Input',
    componentProps: {
      integer: true
    }
  },
  {
    key: 'key4',
    title: '身份证号码必填',
    component: 'Input',
    componentProps: {
      integer: true,
      maxlength: 18
    },
    required: true,
    dynamicRules() {
      return [
        {
          validator: validateIdCard,
          trigger: 'blur'
        }
      ]
    }
  },
  {
    key: 'key5',
    title: '邮箱必填',
    component: 'Input',
    required: true,
    dynamicRules() {
      // 不是必填，但是如果填了就需要验证
      return [
        {
          validator: validateEmail,
          trigger: 'blur'
        }
      ]
    },
    gridSpan: 2
  },
  {
    key: 'key6',
    title: '多行文本高度',
    component: 'Input',
    componentProps: {
      type: 'textarea',
      maxlength: 2000,
      autosize: {
        minRows: 3,
        maxRows: 6
      },
      showWordLimit: true
    }
  },
  {
    key: 'key7',
    title: '本地数据下拉',
    component: 'Select',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 }
    ]
  },
  {
    key: 'key8',
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
    key: 'key9',
    title: '禁用某个选项，可直接在数据中设置disabled',
    component: 'Select',
    dataList: [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2, disabled: true }
    ]
  },
  {
    key: 'key10',
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
  }
]
