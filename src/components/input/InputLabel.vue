<template>
  <div class="input-wrap">
      <label v-if="label" class="input-title" v-text="label" :style="labelStyle"></label>
      <slot>
      </slot>
  </div>
</template>

<script>
export default {
  name: 'dv-input-label',
  props: {
    label: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String
    },
    align: {
      type: String,
      validator (value) {
        return ['right', 'left', 'center'].indexOf(value) > -1
      }
    }
  },
  computed: {
    labelStyle () {
      let style = {}
      if (this.labelWidth) {
        style.width = `${this.labelWidth}px`
      }
      if (this.align) {
        style.textAlign = this.align
      }
      return style
    }
  }
}
</script>
<style>
.input-wrap{
  display: flex;
  background-color: #fff;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
}
.input-wrap .input-title {
  display: inline-block;
  width:100%;
  width:80px;
  height: 100%;
  padding-right: 10px;
  box-sizing: content-box;
  text-align:right;
}
.input-wrap .input-value{
  flex:1;
  width:0;
}
</style>
