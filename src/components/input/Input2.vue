<template>
  <input-label :label="label">
    <div class="uvue-input-wrap">
      <input
        class="uvue-input-core"
        :placeholder = "placeholder"
        :readonly = "readonly"
        :disabled="disabled"
        @focus="active = true"
        v-model= "curValue"
        @input = "handleInput">
        <div class="uvue-clear" v-show="active && curValue && !disabled" @click="handleClear"></div>
        <div class="uvue-clear uvue-input-state" v-if="state"></div>
    </div>
  </input-label>
</template>
<script>
import InputLabel from './InputLabel'
export default {
  name: 'uvue-input',
  components: {
    InputLabel
  },
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
    value: String,
    state: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      curValue: this.value || '',
      active: true
    }
  },
  methods: {
    handleInput (evt) {
      this.curValue = evt.target.value
    },
    handleClear () {
      console.log('清除')
      if (this.readonly || this.disabled) {
        return
      }
      this.curValue = ''
    }
  },
  watch: {
  }
}
</script>

<style>
.uvue-input-wrap{
  display: flex;
  flex:1;
  width:0;
  align-items: center;
  height: 42px;
}
.uvue-input-wrap input{
  padding: 6px 8px;
  outline: none;
  border:none;
  margin-right: 8px;
}
.uvue-input-core {
  border:1px solid #f0f0f0;
  flex: 1;
  font-size: 16px;
  width:0;
}
.uvue-clear{
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
.uvue-clear::before, .uvue-clear::after{
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
.uvue-clear::before{
  transform: rotate(45deg);
}
.uvue-clear::after{
  transform: rotate(-45deg) ;
}
.uvue-input-state{
  background-color: red;
  opacity: 1;
  transform: scale(.5);
}
</style>
