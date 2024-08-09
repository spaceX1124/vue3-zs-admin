<script lang="tsx">
import { PropType } from 'vue'
import { VxeColumnSlotTypes } from 'vxe-table'
import { Common } from '@/types'
export default {
  name: 'cellRender',
  props: {
    scope: {
      // 框架自带的数据scope
      type: Object as PropType<VxeColumnSlotTypes.DefaultSlotParams<any>>,
      required: true
    },
    // 表头字段信息
    column: {
      type: Object as PropType<Common.BasicForm>,
      required: true
    }
  },
  // setup返回一个渲染函数
  setup (props) {
    return () => {
      // 执行表头字段中的cellRender函数
      return props.column?.cellRender ? props.column.cellRender({
        column: props.column,
        rowIndex: props.scope.$rowIndex,
        row: props.scope.row
      }) : '-'
    }
  }
}
</script>

<style scoped lang="scss"></style>