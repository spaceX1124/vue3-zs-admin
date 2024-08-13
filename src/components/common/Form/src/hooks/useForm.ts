import { BasicFormProps, FormActionType } from '../types/form.ts'

/**
 * 入口函数
 * @param {BasicFormProps} formProps 接受一个对象，对象参数可可控制表单的一些能力，也是使用表单的参数入口
 * @return {[() => void, FormActionType]}
 * */
export function useForm (formProps?: BasicFormProps): [(tableAction: FormActionType) => void, FormActionType] {
  // 存储表单中定义的方法
  const tableActionRef = ref<FormActionType>()

  // 初始化方法，方便在外部使用
  function registerForm (tableAction: FormActionType) {
    tableActionRef.value = tableAction
    formProps && tableAction.setFormProps(formProps)
  }

  const methods:FormActionType = {
    setFormProps: (tableProps) => {
      tableActionRef.value?.setFormProps(tableProps)
    },
    setFormModelValue: (key, value, schema) => {
      tableActionRef.value?.setFormModelValue(key, value, schema)
    },
    setFieldsValue: (values) => {
      tableActionRef.value?.setFieldsValue(values)
    },
    updateSchema: (schema) => {
      tableActionRef.value?.updateSchema(schema)
    },
    clearFormValues: () => {
      tableActionRef.value?.clearFormValues()
    },
    submit: async () => {
      return tableActionRef.value?.submit()
    }
  }

  return [registerForm, methods]
}
