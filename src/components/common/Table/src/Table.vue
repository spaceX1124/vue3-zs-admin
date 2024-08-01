<template>
  <div class="table-wrapper">
    <div class="table-wrapper-box">
      <vxe-table v-bind="getBindingVTable">
        <template #loading>
          <div class="loading-box">
            <el-icon class="is-loading" size="28px">
              <Loading />
            </el-icon>
            <span>Loading...</span>
          </div>
        </template>
        <vxe-column
          v-for="column in showColumns"
          :key="column.key"
          v-bind="getBindingVColumn(column)">
          <template v-slot="scope">
            <CellRender v-if="column.cellRender"
                        :scope="scope"
                        :column="column"/>
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
              {{dealShowVal(scope.row[column.key])}}
            </template>
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
        @size-change="handleSizeChangeFn"
        @current-change="handleCurrentChangeFn"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { BasicTableProps, EmitEvent, TableActionType } from './types/table.ts'
import { useSourceData } from './hooks/useSourceData.ts'
import { useColumns } from './hooks/useColumn.ts'
import { useLoading } from './hooks/useLoading.ts'
import { Loading } from '@element-plus/icons-vue'
import { isNullOrUndefOrEmpty } from '@/utils/is.ts'
import CellRender from './components/cellRender.vue'
import { usePagination } from './hooks/usePagination.ts'
import type { VxeTableProps, VxeColumnProps } from 'vxe-table'
import { Common } from '@/types'

// 当前外部使用table组件时通过useTable传入的一些参数（BasicTableProps）
let innerProps = ref<BasicTableProps>({})

// 获取通过useTable传入的一些参数
let getProps = computed(() => {
  return { ...unref(innerProps) }
})

// 处理分页
const { getPaginationInfo } = usePagination(getProps)

// 处理表格加载状态
const { getLoading, setLoading } = useLoading()

// 处理表头数据
let { getColumns } = useColumns(getProps, { getPaginationInfo })
// 传递给VColumn的表头数据
const showColumns = computed(() => unref(getColumns))

// 处理表格数据
let { getTableData, total } = useSourceData(getProps, { setLoading, getPaginationInfo })

// 给vxe-table绑定的一些参数
const getBindingVTable = computed<VxeTableProps>(() => {
  return {
    loading: unref(getLoading), // 当前表格加载状态
    data: unref(getTableData), // 表格数据
    stripe: unref(getProps).stripe || false, // 是否带有斑马纹
    border: unref(getProps).border || true, // 边框
    round: true,
    height: 'auto',
    rowConfig: { isHover: true }
  }
})

// 给vxe-column绑定的一些参数
function getBindingVColumn (column: Common.BasicForm): VxeColumnProps {
  return {
    field: column.key,
    title: column.title,
    width: column.width || '', // 没传的时候，不设置width，按照表格的宽度进行均匀分配
    minWidth: column.minWidth || '100px',
    type: column.type || null,
    showOverflow: column.lineClamp ? false : 'tooltip',
    fixed: column.fixed
  }
}

// 重新设置新的参数
function setProps (propsData: BasicTableProps) {
  innerProps.value = { ...unref(innerProps), ...propsData }
}

// 可被外部执行的一些方法
const tableAction: TableActionType = {
  setProps,
  setLoading
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

function handleSizeChangeFn () {

}
function handleCurrentChangeFn () {
  
}
</script>
<style lang="scss" scoped>
.table-wrapper {
  height: 100%;
  &-box {
    height: calc(100% - 60px);
  }
}
.loading-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: $primary-color1;
}
.pagination-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
</style>