<template>
  <transition name="slide-down">
      <div class="picker-area" v-show="value">
        <div class="picker-comfirm-area">
          <span @click="$emit('input', false)">取消</span>
          <span @click="getValue">确认</span>
        </div>
        <div class="picker-body">
          <picker-slot :list="list" @on-change="getSelectValue"></picker-slot>
        </div>
      </div>
  </transition>
</template>

<script>
import PickerSlot from './PickerSlot'
import Popup from '../mixinx/popup'
export default {
  name: 'dv-picker',
  mixins: [Popup],
  props: {
    list: {
      type: Array,
      default: []
    },
    overlay: {
      type: Boolean,
      default: true
    }
  },
  components: {
    PickerSlot
  },
  data () {
    return {
      selectIndex: 0
    }
  },
  methods: {
    getValue () {
      this.$emit('input', false)
      this.$emit('confirm', this.selectIndex)
    },
    getSelectValue (val) {
      this.selectIndex = val
    }
  }
}
</script>
<style scoped>
@import './index.css'
</style>


