import type { BasicTableProps, PaginationInfo } from '../types/table.ts'
import { ComputedRef } from 'vue'
import { cloneDeep } from '@/utils/tools.ts'
import { Common } from '@/types'
import { http } from '@/utils/http'
import { isArray, isBoolean, isNullOrUndefOrEmpty } from '@/utils/is.ts'
import { ElImage } from 'element-plus'
import { isString } from 'lodash-es'

interface Result {
    getColumns: ComputedRef<Common.BasicForm[]>
}
/**
 * 负责从外部传入的表头数据中,处理动态的表头，外面需要定义传进来的格式，然后我们通过传递进来的格式去进一步处理，最终渲染
 * @param {innerProps} innerProps 通过useTable传入的一些参数
 * @return {Result} 需要暴露给外面的一些数据和方法
 * */
export function useColumns (innerProps:ComputedRef<BasicTableProps>): Result {
  // 处理数据之后的表头字段
  const dealColumns = ref<Common.BasicForm[]>([])
  // 给表格的表头字段
  const columns = ref<Common.BasicForm[]>([])
  // 过滤表头字段,处理字段需要的异步dataList
  function dealColumnAndFilter () {
    // 没传表头，直接return
    if (!innerProps.value.schemas) return
    let columnsArr: Common.BasicForm[] = []
    // 过滤字段
    columnsArr = cloneDeep(innerProps.value.schemas).filter(column => {
      if(!column.tableHidden) {
        return {
          ...column
        }
      }
    })
    // 如果有字段需要请求接口去拿dataList
    Promise.all(columnsArr.map(column => {
      return (async () => {
        if (column.async && column.async.url) {
          const { url, method = 'get', data } = column.async
          const res = await http[method](url, data)
          return { ...column, dataList: res }
        } else {
          return { ...column }
        }
      })()
    })).then(res => {
      dealColumns.value = res
      createTableColumns()
    })
  }
  // 处理表头最终的回显
  function createTableColumns (){
    columns.value = dealColumns.value.map(column => {
      if (column.component === 'Select') {
        console.log(column.componentProps)
      }
      // 没有自定义渲染的情况下
      if (!column.cellRender || !column.text) {
        let strategyFn
        switch (column.component) {
          case 'Select':
            // 多选
            if ((column as any)?.componentProps?.multiple) {
              strategyFn = (column: Common.BasicForm, value: any): any => {
                const { dataList, async, splitStyle = ',' } = column
                const tempArrValue: any[] = !isNullOrUndefOrEmpty(value) ?
                  isArray(value) ? value.map(String) : value.split(',')
                  : []
                let resultArr: Global.Recordable[] = []
                if (dataList) {
                  resultArr = dataList.filter((item: Global.Recordable) => {
                    if (tempArrValue?.includes(String(item[async?.value || 'value']))) {
                      return item
                    }
                  })
                }
                if (resultArr) {
                  return resultArr.map((item: Global.Recordable) => item[async?.label || 'label']).join(splitStyle)
                } else {
                  return '-'
                }
              }
            } else { // 单选
              strategyFn = (column: Common.BasicForm, value: any): any => {
                const { dataList, async } = column
                const curItem = dataList?.find(item => {
                  if (isBoolean(value)) {
                    return item[async?.value || 'value'] === value
                  } else {
                    return String(item[async?.value || 'value']) === String(value)
                  }
                })
                return curItem ? curItem[async?.label || 'label'] : '-'
              }
            }
            // 多选
            break
          case 'Input':
            strategyFn = (column: Common.BasicForm, value: any): any => {
              return value
            }
            break
          case 'Upload':
            column.cellRender = (params) => {
              let imageList = []
              if (params.row[params.column.key]) {
                if (isString(params.row[params.column.key])) {
                  imageList = params.row[params.column.key].split(',')
                } else if(isArray(params.row[params.column.key])) {
                  imageList = params.row[params.column.key]
                } else {
                  imageList = []
                }
              }
              // 这儿显示的是缩略图，不需要太要求样式
              return h(ElImage, {
                src: imageList[0] || '',
                previewSrcList: imageList,
                fit: 'cover',
                style: {
                  width: '40px!important',
                  height: '40px!important'
                }
              })
            }
        }
        if (strategyFn) {
          column.text = (row: Global.Recordable) => strategyFn(column, row[column.key])
        }
      }
      return column
    })
    console.log(columns, 'columns')
  }
  onMounted(() => {
    dealColumnAndFilter()
  })

  // 获取处理之后的表头数据
  const getColumns = computed(() => unref(columns))
  return {
    getColumns
  }
}