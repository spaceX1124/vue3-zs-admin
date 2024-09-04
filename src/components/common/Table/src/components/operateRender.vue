<script lang="tsx">
import { PropType, VNode } from 'vue'
import { VxeColumnSlotTypes } from 'vxe-table'
export default {
  name: 'cellRender',
  props: {
    scope: {
      // 框架自带的数据scope
      type: Object as PropType<VxeColumnSlotTypes.DefaultSlotParams>,
      required: true
    },
    // 表头字段信息
    column: {
      type: Object as PropType<{title: string; width: number;cellRender: (params: {rowIndex: number;row: Global.Recordable}) => VNode}>,
      required: true
    }
  },
  // setup返回一个渲染函数
  setup (props) {
    return () => {
      // 执行表头字段中的cellRender函数
      return props.column?.cellRender ? props.column.cellRender({
        rowIndex: props.scope.$rowIndex,
        row: props.scope.row
      }) : '-'
    }
  }
}
</script>

<style scoped lang="scss"></style>