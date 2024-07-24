import { Common } from '@/types'

export const schemas: Common.BasicForm[] = [
  {
    title: '日期',
    component: 'BasicTitle',
    colSpan: 24
  },
  {
    key: 'key1',
    title: '日期-单选年',
    component: 'Date',
    componentProps: {
      type: 'year',
      format: 'YYYY',
      valueFormat: 'YYYY'
    }
  },
  {
    key: 'key2',
    title: '日期-多选年-值是数组',
    component: 'Date',
    componentProps: {
      type: 'years',
      format: 'YYYY',
      valueFormat: 'YYYY'
    }
  },
  {
    key: 'key3',
    title: '日期-多选年-值是字符串',
    component: 'Date',
    componentProps: {
      type: 'years',
      format: 'YYYY',
      valueFormat: 'YYYY',
      valIsArray: false
    }
  },
  {
    key: 'key4',
    title: '日期-单选月',
    component: 'Date',
    componentProps: {
      type: 'month',
      format: 'YYYY-MM',
      valueFormat: 'YYYY-MM'
    }
  },
  {
    key: 'key5',
    title: '日期-单选日',
    component: 'Date',
    componentProps: {
      type: 'date',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD'
    }
  },
  {
    key: 'key6',
    title: '日期-多选日-值是数组',
    component: 'Date',
    componentProps: {
      type: 'dates',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD'
    }
  },
  {
    key: 'key7',
    title: '日期-多选日-值是字符串',
    component: 'Date',
    componentProps: {
      type: 'dates',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
      valIsArray: false
    }
  },
  {
    title: '日期区间',
    component: 'BasicTitle',
    colSpan: 24
  },
  {
    key: 'key8',
    title: '日期区间-值是数组',
    component: 'Date',
    componentProps: {
      type: 'daterange',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
      startPlaceholder: '请选择开始日期',
      endPlaceholder: '请选择结束日期'
    }
  },
  {
    key: 'key9',
    title: '日期区间-值是字符串',
    component: 'Date',
    componentProps: {
      type: 'daterange',
      valIsArray: false,
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD'
    }
  },
  {
    key: 'key10',
    title: '日期区间-两个key',
    keyArr: ['firstTime', 'lastTime'],
    component: 'Date',
    componentProps: {
      type: 'daterange',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD'
    }
  },
  {
    title: '日期时间',
    component: 'BasicTitle',
    colSpan: 24
  },
  {
    key: 'key11',
    title: '日期时间',
    component: 'Date',
    componentProps: {
      type: 'datetime',
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  {
    title: '日期区间时间',
    component: 'BasicTitle',
    colSpan: 24
  },
  {
    key: 'key12',
    title: '日期区间时间-值是数组',
    component: 'Date',
    componentProps: {
      type: 'datetimerange',
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  {
    key: 'key13',
    title: '日期区间时间-值是字符串',
    component: 'Date',
    componentProps: {
      type: 'datetimerange',
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  {
    key: 'key14',
    keyArr: ['firstTime1', 'lastTime1'],
    title: '日期区间时间-两个key',
    component: 'Date',
    componentProps: {
      type: 'datetimerange',
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  {
    key: 'key15',
    title: '不能选择当前日期之前的',
    component: 'Date',
    componentProps: {
      type: 'datetimerange',
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      disablePastDate: true
    }
  }
]