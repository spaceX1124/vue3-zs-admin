import { Common } from '@/types'
import adminConfig from '@/libs/config.ts'
import { productionList } from '@/api'
import { ValidationType, RegexMap } from '@/libs/regexp.ts'
import { isNullOrUndefOrEmpty } from '@/utils/is.ts'
import { ElMessage } from 'element-plus'
import { http } from '@/utils/http'
import { type Ref } from 'vue'
import { validatorInputRange } from '@/utils/rules.ts'
interface ParamsType {
  InitPageRef: Ref<any>
}
export function getSchemas ({ InitPageRef }: ParamsType): Common.BasicForm[] {
  return [
    {
      key: 'id',
      component: 'Input',
      title: '产品ID',
      fixed: 'left',
      formHidden: true
    },
    {
      key: 'loanProductName',
      component: 'Input',
      title: '产品名称',
      search: true,
      width: '200px',
      formHidden: true
    },
    {
      key: 'logo',
      title: '产品logo',
      component: 'Upload',
      formHidden: true
    },
    {
      key: 'status',
      title: '状态',
      component: 'Select',
      dataList: adminConfig.commonList.onlineStatus,
      search: true,
      formHidden: true
    },
    {
      key: 'ifHide',
      title: '显示状态',
      component: 'Select',
      dataList: adminConfig.commonList.ifHideList,
      formHidden: true
    },
    {
      key: 'category',
      title: '网贷产品类别',
      component: 'Select',
      dataList: adminConfig.commonList.processList,
      search: true,
      width: '120px',
      formHidden: true
    },
    {
      key: 'category',
      title: '网贷产品类别',
      component: 'Radio',
      dataList: adminConfig.commonList.processList,
      required: true,
      tableHidden: true
    },
    {
      key: 'companyName',
      title: '公司主体名称',
      component: 'Input',
      required: true,
      tableHidden: true
    },
    {
      key: 'loanProductName',
      title: '产品名称',
      component: 'Input',
      required: true,
      tableHidden: true
    },
    {
      key: 'paymentRate',
      title: '下款率',
      component: 'Input',
      tableHidden: true
    },
    {
      key: 'label',
      title: '产品标签',
      component: 'Input',
      required: true,
      tableHidden: true
    },
    {
      key: 'avgAmount',
      title: '产品平均放款额度（元）',
      component: 'Input',
      required: true,
      tableHidden: true
    },
    {
      key: 'loanAmount',
      keyArr: ['minLoanAmount', 'maxLoanAmount'],
      title: '贷款金额（元）',
      component: 'InputRange',
      required: true,
      tableHidden: true,
      componentProps: {
        maxlength: 7,
        positiveInteger: true
      },
      dynamicRules (params) {
        return [{ validator: validatorInputRange(params), trigger: 'blur' }]
      }
    },
    {
      key: 'loanTerm',
      keyArr: ['minLoanTerm', 'maxLoanTerm'],
      title: '贷款期限（月）',
      component: 'InputRange',
      required: true,
      tableHidden: true,
      componentProps: {
        maxlength: 2,
        positiveInteger: true
      },
      dynamicRules (params) {
        return [{ validator: validatorInputRange(params), trigger: 'blur' }]
      }
    },
    {
      key: 'monthlyRate',
      title: '月利率',
      component: 'Input',
      required: true,
      tableHidden: true,
      componentProps: {
        decimal: 2
      }
    },
    {
      key: 'logo',
      title: '产品LOGO',
      component: 'Upload',
      tableHidden: true
    },
    {
      key: 'creditApiType',
      title: '信贷api类型',
      component: 'Select',
      dataList: adminConfig.commonList.creditApiType,
      search: true,
      formHidden: true
    },
    {
      key: 'sort',
      title: '产品排序值',
      component: 'Input',
      tableEditable: true,
      formHidden: true
    },
    {
      key: 'onlinePeriod',
      title: '在线时段',
      component: 'Input',
      formHidden: true
    },
    {
      key: 'applyNum',
      title: '申请限制数',
      component: 'Input',
      formHidden: true
    },
    {
      key: 'hasApplyNum',
      title: '当日已申请数',
      component: 'Input',
      width: '110px',
      formHidden: true
    },
    {
      key: 'updateTime',
      title: '修改时间',
      component: 'Input',
      formHidden: true
    },
    {
      key: 'price',
      title: '产品单价(元)',
      component: 'Input',
      tableEditable: true,
      width: '120px',
      formHidden: true
    },
    {
      key: 'dynamicPrice',
      title: '是否按撞库单价排序',
      component: 'Select',
      dataList: adminConfig.commonList.isOrNo,
      formHidden: true
    },
    {
      key: 'sortPrice',
      title: '排序价格（元）',
      component: 'Input',
      tableEditable: true,
      width: '160px',
      componentProps: {
        decimal: 2
      },
      tableEditCallback (value, row) {
        const reg = RegexMap[ValidationType.POSITIVEINTEGER].regular
        if (isNullOrUndefOrEmpty(value)) {
          ElMessage.error('不能为空')
          return
        }
        if (value && !reg.test(value)) {
          ElMessage.error('请输入正整数')
          return
        }
        const postData = {
          id: row.id,
          sort: value
        }
        console.log(InitPageRef, 'InitPageRef')
        http.post(productionList.updateSort, postData).then(() => {
          ElMessage.success('修改成功！')
          // 刷新表格
          InitPageRef.value.fetchTableData()
        })
      },
      formHidden: true
    }
  ]
}
