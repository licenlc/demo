<template>
<transition name="slide-down">
    <div class="picker-area" v-show="showPicker">
      <div class="picker-comfirm-area">
        <span>取消</span>
        <span @click="getValue">确认</span>
      </div>
      <div class="picker-body">
        <picker-slot :list="list"></picker-slot>
      </div>
    </div>
</transition>
</template>

<script>
import PickerSlot from './PickerSlot'
export default {
  name: 'Picker',
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  components: {
    PickerSlot
  },
  data () {
    return {
      showPicker: true
    }
  },
  methods: {
    getValue () {
      this.showPicker = false
      console.log(this.list[this.index])
    }
  }
}
</script>
<style scoped>
@import './index.css'
</style>


