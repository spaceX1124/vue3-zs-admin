import type { ComponentType } from './types/index.ts'
import { isArray } from '@/utils/is'
import { Common } from '@/types'
/**
 * 以下组件在表单验证的时候trigger为blur
 * */
export const NO_AUTO_LINK_COMPONENTS: ComponentType[] = [
  'Input'
]

// 判断是否有插槽
export function checkSlot (slotName: string, schema: Common.BasicForm) {
  const { renderComponentSlot } = schema
  if (!renderComponentSlot) return false
  if (isArray(renderComponentSlot)) {
    const curIndex = renderComponentSlot.findIndex(item => item.slotName === slotName)
    return curIndex > - 1
  } else {
    return renderComponentSlot.slotName === slotName
  }
}
// 获取插槽
export function getSlot (slotName: string, schema: Common.BasicForm) {
  const { renderComponentSlot } = schema
  if (!renderComponentSlot) return
  if (isArray(renderComponentSlot)) {
    const curItem = renderComponentSlot.find(item => item.slotName === slotName)
    return curItem?.slotRender
  } else {
    return renderComponentSlot.slotName === slotName ? renderComponentSlot.slotRender : undefined
  }
}
