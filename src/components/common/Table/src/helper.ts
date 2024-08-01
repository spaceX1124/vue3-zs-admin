import { Common } from '@/types'

const tableObj: Global.Recordable = {}
// 处理表格回显值
export function createTableValueStrategy (tableObj: Global.Recordable) {
  // 单选下拉框，单选按钮
  [
    'Select',
    'Radio'
  ].forEach(key => {
    tableObj[key] = (column: Common.BasicForm, value: any) => {
      const list = column.dataList || []

      return filterEnums(String(value), list).label
    }
  });
  // 多选下拉，复选按钮
  [
    fieldTypeConfig.multipleChoice,
    fieldTypeConfig.checkbox,
    fieldTypeConfig.personMultiple,
    fieldTypeConfig.department,
    fieldTypeConfig.multipleDepartment
  ].forEach(key => {
    tableObj[key] = (filed: Recordable, value: any) => {
      const list = filed.dataList || []
      const tempArrValue: any[] = !isNullOrUndefOrEmpty(value) ? String(value).split(',').map((val: any) => String(val)) : []
      let resultArr: Recordable[] = []
      resultArr = list.filter((item: Recordable) => {
        if (tempArrValue?.includes(String(item.value))) {
          return item
        }
      })
      if (resultArr) {
        return resultArr.map((item: Recordable) => item.label).join(',')
      } else {
        return '-'
      }
    }
  });
  // 单行文本，多行文本，手机号，邮箱，邮政编码，描述文字，身份证, 统一社会信用代码，流水号，座机号，金额，数字，百分比，日期
  [
    'Input'
  ].forEach(key => {
    tableObj[key] = (filed: Recordable, value: any) => {
      return value
    }
  });
  // 地址
  [
    fieldTypeConfig.address
  ].forEach(key => {
    tableObj[key] = (filed: Recordable, value: any) => {
      console.log(value, 'value213213', filed)
      if (value && isJSON(value)) {
        const getTextValue = () => {
          if (!isJSON(value)) { // 如果不是JSON格式就直接返回，不往下执行
            return value
          }
          const {
            pName = '', cName = '', aName = '', detail
          } = JSON.parse(value)
          if (filed.precisions === 1) {
            return (pName + cName + aName + detail) || '-'
          } else if (filed.precisions === 2) {
            return (pName + cName + aName) || '-'
          } else if (filed.precisions === 3) {
            return (pName + cName) || '-'
          } else if (filed.precisions === 4) {
            return pName || '-'
          } else {
            return (pName + cName + aName + detail) || '-'
          }
        }
        return getTextValue()
      } else {
        return value
      }

    }
  });
  // 时间
  [
    fieldTypeConfig.date3
  ].forEach(key => {
    tableObj[key] = (filed: Recordable, value: any) => {
      return value ? getTime(value) : '-'
    }
  });
  // 级联
  [
    fieldTypeConfig.cascader
  ].forEach(key => {
    tableObj[key] = (filed: Recordable, value: any) => {
      console.log(filed, 'filed213213', value)
      return value ? getCascadeLabel(value, filed.dataList) : '-'
    }
  })
  return tableObj
}

export const dealTableValueConfig = createTableValueStrategy(tableObj)