import { Common } from '@/types'
import { isArray, isNullOrUndefOrEmpty, isBoolean, isString } from '@/utils/is.ts'
import { ElButton, ElPopconfirm, ElMessage, ElImage } from 'element-plus'
import { http } from '@/utils/http'
import { ComponentType } from '@/components/common/Form'

interface ButtonParamsType {
    data: Common.OperateType
    refresh: Global.PromiseFn
    row: Global.Recordable
    editCallback: Global.Fn
}
const buttonTypeObj = {
  'edit': ({ data, editCallback, row }: ButtonParamsType) => {
    return <ElButton size="small" onClick={() => editCallback({ id: row.id })} type={data.type}>{data.title}</ElButton>
  },
  'delete': ({ data, refresh, row }: ButtonParamsType) => {
    const { deleteData } = data
    return <>
      <ElPopconfirm
        width={180}
        title={deleteData?.confirmTitle || '确认删除该条数据？'}
        confirmButtonText="确认"
        cancelButtonText="取消"
        onConfirm={() => {
          if (!deleteData?.async.url){
            ElMessage.error('删除接口未传入')
            return
          }
          const key = deleteData?.deleteKey || 'id'
          const id = row[key]
          const postData = {
            [key]: id
          }
          http[deleteData.async.method](deleteData.async.url, postData).then(() => {
            ElMessage.success('操作成功！')
            refresh && refresh()
          })
        }}
        v-slots={{
          reference: () => (
            <ElButton size="small" type={data.type}>{data.title}</ElButton>
          )
        }}
      ></ElPopconfirm>
    </>
  },
  'customer': ({ data }: ButtonParamsType) => {
    return <ElButton size="small" type={data.type}>{data.title}</ElButton>
  }
}
interface ParamsType {
    fetchTableData: Global.PromiseFn
    row: Global.Recordable
    list?: Common.OperateType[]
    editCallback: Global.Fn
}
function operateListRender ({ list, fetchTableData, row, editCallback }: ParamsType) {
  if (!isArray(list)) return <span>-</span>
  return (
    <>
      {list.map((item) => buttonTypeObj[item.buttonType]({
        data: item,
        refresh: fetchTableData,
        row,
        editCallback
      }))}
    </>
  )
}

const tableValueConfig: Record<Exclude<ComponentType, 'BasicTitle'>, any> = {
  'Radio': (column: Common.BasicForm, value: any) => {
    return dealSingle(column, value)
  },
  'Select': (column: Common.BasicForm, value: any) => {
    // 多选
    if ((column as any)?.componentProps?.multiple) {
      // 将值转成字符串数组
      return dealMultiple(column, value)
    } else { // 单选
      return dealSingle(column, value)
    }
  },
  'Upload': (column: Common.BasicForm, value: any) => {
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
          height: '40px!important',
          display: 'block'
        }
      })
    }
  },
  'Input': (column: Common.BasicForm, value: any) => {
    return value
  }
}

// 处理单选回显
function dealSingle (column: Common.BasicForm, value: any) {
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
// 处理多选回显
function dealMultiple (column: Common.BasicForm, value: any) {
  const { dataList, async, splitStyle = ',' } = column
  // 将值转成字符串数组
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

export {
  operateListRender,
  tableValueConfig
}
