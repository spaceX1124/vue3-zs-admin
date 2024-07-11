<script lang="tsx">
import { PropType } from 'vue'
import { SlotRender } from '../types/form.ts'
import { isFunc } from '@/utils/is.ts'
export default {
  name: 'slotRender',
  props: {
    slotRender: {
      type: [String, Function] as PropType<SlotRender>,
      default: ''
    }
  },
  // setup返回一个渲染函数
  setup (props) {
    return () => {
      const { slotRender } = props
      return isFunc(slotRender) ? slotRender() : slotRender
    }
  }
}
</script>

<style scoped lang="scss"></style>
