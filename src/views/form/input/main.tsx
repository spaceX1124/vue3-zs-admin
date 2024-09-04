import { validateEmail, validateIdCard, validatePhone } from '@/utils/rules.ts'
import { Search } from '@element-plus/icons-vue'
import { Common } from '@/types'
import { RegexMap, ValidationType } from '@/libs/regexp.ts'

export const schemas:Common.BasicForm[] = [
  {
    key: 'title1',
    title: '单行文本',
    component: 'BasicTitle',
    colSpan: 24
  },
  {
    key: 'key1',
    title: '不限制',
    component: 'Input',
    colSpan: 8
  },
  {
    key: 'key2',
    title: '置灰',
    component: 'Input',
    componentProps: {
      disabled: true
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
    key: 'key322',
    title: '正整数',
    component: 'Input',
    componentProps: {
      positiveInteger: true
    }
  },
  {
    key: 'key4',
    title: '3位小数',
    component: 'Input',
    componentProps: {
      decimal: 3
    }
  },
  {
    key: 'key5',
    title: '身份证号码必填',
    component: 'Input',
    componentProps: {
      integer: true,
      maxlength: 18
    },
    required: true,
    dynamicRules () {
      return [
        {
          validator: validateIdCard,
          trigger: 'blur'
        }
      ]
    }
  },
  {
    key: 'key6',
    title: '身份证号码非必填',
    component: 'Input',
    componentProps: {
      integer: true,
      maxlength: 18
    },
    dynamicRules () {
      return [
        {
          pattern: RegexMap[ValidationType.ID].regular,
          message: '请输入正确的身份证号',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    key: 'key7',
    title: '手机号必填',
    component: 'Input',
    componentProps: {
      maxlength: 11,
      integer: true
    },
    required: true,
    dynamicRules () {
      // 不是必填，但是如果填了就需要验证
      return [
        {
          validator: validatePhone,
          trigger: 'blur'
        }
      ]
    }
  },
  {
    key: 'key8',
    title: '手机号非必填',
    component: 'Input',
    componentProps: {
      maxlength: 11,
      integer: true
    },
    dynamicRules () {
      // 不是必填，但是如果填了就需要验证
      return [
        {
          validator: validatePhone,
          trigger: 'blur'
        }
      ]
    }
  },
  {
    key: 'key9',
    title: '邮箱必填',
    component: 'Input',
    required: true,
    dynamicRules () {
      // 不是必填，但是如果填了就需要验证
      return [
        {
          validator: validateEmail,
          trigger: 'blur'
        }
      ]
    }
  },
  {
    key: 'key10',
    title: '邮箱非必填',
    component: 'Input',
    dynamicRules () {
      // 不是必填，但是如果填了就需要验证
      return [
        {
          validator: validateEmail,
          trigger: 'blur'
        }
      ]
    }
  },
  {
    key: 'key11',
    title: '前后缀',
    component: 'Input',
    renderComponentSlot: [
      {
        slotName: 'prefix',
        slotRender: () => <el-icon><Search /></el-icon>
      },
      {
        slotName: 'suffix',
        slotRender: () => <el-icon><Search /></el-icon>
      },
      {
        slotName: 'prepend',
        slotRender: () => <el-icon><Search /></el-icon>
      },
      {
        slotName: 'append',
        slotRender: () => <el-icon><Search /></el-icon>
      }
    ]
  },
  {
    key: 'key12',
    title: '长度为10',
    component: 'Input',
    componentProps: {
      maxlength: 10
    }
  },
  {
    key: 'key13',
    title: '事件',
    component: 'Input',
    componentProps: {
      maxlength: 10
    },
    componentEmits () {
      return {
        blur: (val) => {
          console.log('blur', val)
        },
        focus (val) {
          console.log('focus', val)
        },
        input (val) {
          console.log('input', val)
        },
        clear () {
          console.log('clear')
        }
      }
    }
  },

  {
    key: 'key15',
    title: '密码',
    component: 'Input',
    componentProps: {
      showPassword: true
    }
  },

  {
    key: 'key17',
    title: '自动聚焦',
    component: 'Input',
    componentProps: {
      autofocus: true
    }
  },
  {
    key: 'title2',
    title: '多行文本',
    component: 'BasicTitle',
    colSpan: {
      span: 24
    }
  },
  {
    key: 'key14',
    title: '多行文本',
    component: 'Input',
    componentProps: {
      type: 'textarea',
      maxlength: 5,
      showWordLimit: true
    }
  },
  {
    key: 'key16',
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
    key: 'key17',
    title: '不显示字数统计',
    component: 'Input',
    componentProps: {
      type: 'textarea'
    }
  }
]