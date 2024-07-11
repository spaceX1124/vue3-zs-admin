// 不直接用饿了么的输入框组件，因为在处理类型的时候会有深度限制问题
import Input from './components/Input.vue'
import Select from './components/Select.vue'

const componentMap = new Map()
componentMap.set('Input', Input)
componentMap.set('Select', Select)

export { componentMap }