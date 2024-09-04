<template>
  <div class="table-wrapper">
    <div class="table-wrapper-box">
      <vxe-table ref="VxeTableRef"
                 v-bind="getBindingVTable"
                 @sort-change="sortChangeEvent"
                 @cell-mouseenter="cellMouseenter"
                 @cell-mouseleave="cellMouseleave">
        <template #loading>
          <div class="loading-box">
            <el-icon class="is-loading" size="28px">
              <Loading />
            </el-icon>
            <span>Loading...</span>
          </div>
        </template>
        <template #empty>
          <div class="emptyBox">
            <img src="@/assets/images/noData.png" alt="" >
            <p>这里暂时没有内容哦～</p>
          </div>
        </template>
        <vxe-column v-if="getProps.openCheckbox"
                    width="50"
                    type="checkbox"
                    align="center"
                    fixed="left">
          <template #header="{ checked, indeterminate }">
            <el-checkbox
              :modelValue="checked"
              :indeterminate="indeterminate"
              @change="(val: string | number | boolean) =>
                selectAllEvent(val)
              " />
          </template>
          <template #checkbox="{ row, checked }">
            <el-checkbox :modelValue="checked" @change="toggleCheckboxEvent(row)" />
          </template>
        </vxe-column>
        <vxe-column v-if="!getProps.seqHidden"
                    type="seq"
                    title="序号"
                    fixed="left"
                    align="center"
                    width="50" />
        <vxe-column
          v-for="(column, index) in showColumns"
          :key="column.key"
          v-bind="getBindingVColumn(column)"
          :class-name="() => (column.lineClamp && column.lineClamp > 1 ? 'custom123' : 'custom321')">
          <template v-slot="scope">
            <template v-if="editStatus && column.tableEditable && mouseEnter.x === scope.$rowIndex && mouseEnter.y === index+mouseNum">
              <CellEdit ref="CellEditRef" :schema="column" :value="scope.row[column.key]"/>
            </template>
            <template v-else>
              <CellRender v-if="column.cellRender" :scope="scope" :column="column" />
              <template v-else-if="column.text">
                <template v-if="column.lineClamp && column.lineClamp > 1">
                  <el-tooltip :content="dealShowVal(column.text(scope.row))" placement="top">
                    <el-text :line-clamp="column.lineClamp">{{ dealShowVal(column.text(scope.row)) }}</el-text>
                  </el-tooltip>
                </template>
                <template v-else>
                  {{ dealShowVal(column.text(scope.row)) }}
                </template>
              </template>
              <template v-else>
                {{ dealShowVal(scope.row[column.key]) }}
              </template>
            </template>

            <span class="absolute-edit pointer" v-if="column.tableEditable && mouseEnter.x === scope.$rowIndex && mouseEnter.y === index+mouseNum">
              <el-icon @click="handleEdit(index)" v-if="!editStatus"><Edit /></el-icon>
              <template v-else>
                <el-icon @click="handleClose"><Close /></el-icon>
                <el-icon @click="handleCheck(column, scope.row)"><Check /></el-icon>
              </template>
            </span>
          </template>
        </vxe-column>
        <vxe-column v-if="getProps.operateList"
                    :title="showOperate?.title"
                    :width="showOperate?.width"
                    align="center"
                    fixed="right">
          <template v-slot="scope">
            <OperateRender :scope="scope" :column="showOperate" />
          </template>
        </vxe-column>
      </vxe-table>
    </div>
    <div class="pagination-box">
      <div>
        <slot name="leftSlot" />
      </div>
      <el-pagination
        v-if="!getProps.paginationHidden"
        class="custom-pagination"
        background
        :current-page="getPaginationInfo.pageNum"
        :page-size="getPaginationInfo.pageSize"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="sizeChange"
        @current-change="currentChange" />
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { VxeTable, VxeColumn } from 'vxe-table'
import 'vxe-pc-ui/lib/style.css'
import 'vxe-table/lib/style.css'
import { ref, VNode } from 'vue'
import { BasicTableProps, EmitEvent, TableActionType } from './types/table.ts'
import { useSourceData } from './hooks/useSourceData.ts'
import { useColumns } from './hooks/useColumn.ts'
import { useLoading } from './hooks/useLoading.ts'
import { useCheckbox } from './hooks/useCheckbox.ts'
import { Loading, Edit, Close, Check } from '@element-plus/icons-vue'
import { isNullOrUndefOrEmpty } from '@/utils/is.ts'
import CellRender from './components/cellRender.vue'
import OperateRender from './components/operateRender.vue'
import { usePagination } from './hooks/usePagination.ts'
import type { VxeTableProps, VxeColumnProps } from 'vxe-table'
import { Common } from '@/types'
import { useSort } from '@/components/common/Table/src/hooks/useSort.ts'
import CellEdit from './components/cellEdit.vue'
import { operateListRender } from './helper.tsx'
import { get } from 'lodash-es'

interface PropsType {
  schemas?: Common.BasicForm[]
}
const props = withDefaults(defineProps<PropsType>(), {})
const searchArr = ref<Common.BasicForm[]>([])
const formArr = ref<Common.BasicForm[]>([])
// 当前鼠标移入单元格时的坐标
const mouseEnter = ref({ x: -1, y: -1 })
onMounted(() => {
  if (props.schemas) {
    innerProps.value.schemas = props.schemas
    // 只取search为true的
    searchArr.value = props.schemas.filter((item) => item.search)
    // 只取不屏蔽formHidden的字段
    formArr.value = props.schemas.filter((item) => !item.formHidden)
  }
  // 处理操作按钮回显
  showOperateList()
})

const VxeTableRef = ref()

// 当前外部使用table组件时通过useTable传入的一些参数（BasicTableProps）
let innerProps = ref<BasicTableProps>({})

// 获取通过useTable传入的一些参数
let getProps = computed(() => {
  return { ...unref(innerProps) }
})
// 处理表格加载状态-----hooks
const { getLoading, setLoading } = useLoading()

// 处理分页-----hooks
const { getPaginationInfo, sizeChange, currentChange } = usePagination(getProps, {
  fetchTableData: async () => {
    // 如果直接写fetchTableData，会存在变量未声明问题，只能写一个callback
    await fetchTableData()
  },
  dealPageSelected: () => {
    dealPageSelected()
  }
})
// 处理表头数据-----hooks
let { getColumns } = useColumns(getProps)
// 处理表格数据-----hooks
let {
  getTableData,
  total,
  fetchTableData,
  tableRequestParams,
  refreshSearchRequestParams,
  clearSearchRequestParams
} = useSourceData(getProps, { setLoading, getPaginationInfo, VxeTableRef })
// 处理表格选中-----hooks
const {
  selectedData,
  dealPageSelected,
  toggleCheckboxEvent, 
  selectAllEvent,
  clearAllCheckbox
} = useCheckbox({ VxeTableRef, getTableData })
// 处理表格字段排序-----hooks
const { sortChangeEvent } = useSort({ fetchTableData, tableRequestParams })

// 传递给VColumn的表头数据
const showColumns = computed(() => unref(getColumns))

// 给vxe-table绑定的一些参数
const getBindingVTable = computed<VxeTableProps>(() => {
  const data: VxeTableProps = {
    loading: unref(getLoading), // 当前表格加载状态
    data: unref(getTableData), // 表格数据
    stripe: unref(getProps).stripe || false, // 是否带有斑马纹
    border: unref(getProps).border || true, // 边框
    round: true,
    showOverflow: true, // 设置所有内容过长时显示为省略号
    height: 'auto',
    autoResize: true,
    sortConfig: unref(getProps).sortConfig, // 表格排序配置
    // 'scroll-y': unref(getProps).openVirtual ? { enabled: true, gt: 49 } : undefined, // 只针对纵向，横向字段不会太多,当开启了虚拟表格，当一页>=50就启用
    seqConfig: {
      // 这是序号值，主要是分页之后
      seqMethod ({ rowIndex }) {
        return (unref(getPaginationInfo).pageNum - 1) * unref(getPaginationInfo).pageSize + rowIndex + 1
      }
    },
    columnConfig: { resizable: true }, // 可调节表格宽度
    rowConfig: unref(getProps).rowConfig
  }
  if (unref(getProps).openVirtual) {
    data['scrollY'] = { enabled: true, gt: 49 }
  }
  console.log(data, 'data222')
  return data
})

// 给vxe-column绑定的一些参数
function getBindingVColumn (column: Common.BasicForm): VxeColumnProps {
  return {
    field: column.key,
    align: column.align || unref(innerProps).align,
    headerAlign: column.headerAlign || unref(innerProps).headerAlign,
    title: column.title,
    width: column.width || '', // 没传的时候，不设置width，按照表格的宽度进行均匀分配
    minWidth: column.minWidth || '80px',
    type: column.type || null,
    showOverflow: column.lineClamp ? false : 'tooltip', // 表格内容超出显示省略号
    showHeaderOverflow: true, // 表头内容溢出时显示为省略号，当开启纵向虚拟滚动后不支持自动换行
    fixed: column.fixed, // 固定当前列
    sortable: column.sortable // 当前列是否排序
  }
}

// 重新设置新的参数
function setTableProps (propsData: BasicTableProps) {
  innerProps.value = { ...unref(innerProps), ...propsData }
}
// 获取选中的数据
function getSelectRecords () {
  return selectedData.value
}

// 可被外部执行的一些方法
const tableAction: TableActionType = {
  setTableProps, // 设置表格组件需要的参数
  setLoading, // 开启loading
  getSelectRecords, // 获取选中的数据
  clearAllCheckbox, // 清空所有数据选中
  refreshSearchRequestParams, // 刷新快捷搜索字段参数
  clearSearchRequestParams, // 清空快捷搜索字段参数
  fetchTableData // 请求表格
}

const emits = defineEmits<EmitEvent>()
emits('registerTable', tableAction)

// 处理表格回显值
function dealShowVal (val: any) {
  if (isNullOrUndefOrEmpty(val)) {
    return '-'
  }
  return val
}
const editIndex = ref(-1)
const editStatus = ref(false)
function cellMouseenter (data) {
  if (editStatus.value) return
  mouseEnter.value = {
    x: data.rowIndex,
    y: data.columnIndex
  }
}
function cellMouseleave () {
  if (editStatus.value) return
  mouseEnter.value = {
    x: -1,
    y: -1
  }
}
const mouseNum = computed(() => {
  let num = 0
  if (getProps.value.openCheckbox) {
    num++
  }
  if (!getProps.value.seqHidden) {
    num++
  }
  return num
})

function handleEdit (index: number) {
  editIndex.value = index
  editStatus.value = true
}
function handleClose () {
  editStatus.value = false
  editIndex.value = -1
  mouseEnter.value = {
    x: -1,
    y: -1
  }
}
const CellEditRef = ref()
function handleCheck (column: Common.BasicForm, row: Global.Recordable) {
  const data = CellEditRef.value[0]
  if (data) {
    column.tableEditCallback && column.tableEditCallback(data.modelValue, row)
  }
}

// 处理操作按钮的回显
const showOperate = ref<{title: string; width: number;cellRender: (params: {rowIndex: number;row: Global.Recordable}) => VNode}>()
function showOperateList () {
  if (unref(getProps).operateList) {
    let buttonWidth = 0
    unref(getProps).operateList?.forEach((item: any) => {
      buttonWidth += item.width || 70
    })
    showOperate.value = {
      title: '操作',
      width: buttonWidth,
      cellRender ({ row }) {
        return operateListRender({
          list: unref(getProps).operateList,
          fetchTableData: async () => {
            // 如果直接写fetchTableData，会存在变量未声明问题，只能写一个callback
            await fetchTableData()
          },
          row,
          editCallback: unref(getProps).editCallback
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.table-wrapper {
  flex: 1;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  &-box {
    flex: 1;
    overflow: hidden;
  }
  :deep(.custom123) {
    padding: 0;
    .c--ellipsis {
      overflow: visible !important;
      text-overflow: clip !important;
      white-space: normal !important;
    }
  }
  //:deep(.vxe-body--column) {
  //  height: auto;
  //  .vxe-cell {
  //    padding: 12px 10px;
  //    max-height: none;
  //  }
  //}
  :deep(.vxe-cell) {
  }
}
.pagination-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.loading-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: $primary-color1;
}
.emptyBox {
  padding: 20px 0;
  text-align: center;
  img {
    width: 25%;
    min-width: 120px;
    max-width: 216px;
    height: auto;
  }
  p {
    color: $primary-color3;
    line-height: 18px;
  }
}
.absolute-edit {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
