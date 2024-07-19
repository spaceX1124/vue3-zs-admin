import { Component } from 'vue'
// 不直接用饿了么的输入框组件，因为在处理类型的时候会有深度限制问题
import Input from './components/Input.vue'
import Select from './components/Select.vue'
import Radio from './components/Radio.vue'
import BasicTitle from './components/BasicTitle.vue'
import type { ComponentType } from './types/index.ts'

const componentMap: Map<ComponentType, Component> = new Map()
componentMap.set('Input', Input)
componentMap.set('Select', Select)
componentMap.set('Radio', Radio)
componentMap.set('BasicTitle', BasicTitle)

export { componentMap }