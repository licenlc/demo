<template>
    <div class="dt-input-wrap">
      <input
        class="dt-input-core"
        ref="input"
        :type = "type"
        :value = "curValue"
        :maxlength = "maxlength"
        :placeholder = "placeholder"
        :readonly = "readonly"
        :disabled = "disabled"
        @focus = "handleFocus"
        @blur = "handleBlur"
        @input = "handleInput" >

      <div class="dt-clear" v-show="curValue && !disabled" @click="handleClear"></div>
      <div class="dt-clear dt-input-state" v-if="state"></div>
    </div>
</template>
<script>
export default {
  name: 'dv-input',
  props: {
    placeholder: String,
    readonly: Boolean,
    disabled: {
      type: Boolean,
      default: false
    },
    clear: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
      default: ''
    },
    type: String,
    maxlength: String,
    value: {
      type: [String, Number],
      default: ''
    },
    state: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      curValue: this.value || ''
    }
  },
  methods: {
    handleInput (event) {
      this.curValue = event.target.value
      this.$emit('input', this.curValue)
    },
    handleClear () {
      if (this.readonly || this.disabled) {
        return
      }
      this.curValue = ''
      this.$emit('input', this.curValue)
    },
    handleFocus (event) {
      this.active = true
      this.$emit('focus', event)
    },
    handleBlur (event) {
      this.$emit('blur', event)
    }
  },
  watch: {
    curValue (value) {
    }
  }
}
</script>

<style>
.dt-input-wrap{
  display: flex;
  flex:1;
  width:0;
  align-items: center;
  height: 42px;
  width:100%;
  background-color:#fff;
}
.dt-input-wrap input{
  padding: 6px 8px;
  outline: none;
  border:none;
  margin-right: 8px;
}
.dt-input-core {
  border:1px solid #f0f0f0;
  flex: 1;
  font-size: 16px;
  width:0;
}
.dt-clear{
    display: inline-block;
    position: relative;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: #afa6a6;
    transform: scale(0.4);
    opacity: .66;
    position: relative;
}
.dt-clear::before, .dt-clear::after{
    width: 4px;
    height:30px;
    position: absolute;
    top: 5px;
    left: 18px;
    content: '';
    color:#f0f0f0;
    border-radius: 4px;
    display:inline-block;
    background-color: #f0f0f0;
}
.dt-clear::before{
  transform: rotate(45deg);
}
.dt-clear::after{
  transform: rotate(-45deg) ;
}
.dt-input-state{
  background-color: red;
  opacity: 1;
  transform: scale(.5);
}
</style>
