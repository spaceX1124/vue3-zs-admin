import { Common } from '@/types/index.ts'

/**
 * 自定义渲染函数所需参数
 * */
interface CellRenderParams {
    column: Common.BasicForm, // 字段信息
    rowIndex: number // 当前行索引
}
/**
 * 表格渲染函数类型
 * */
export type CellRenderType = (params: CellRenderParams) => VNode