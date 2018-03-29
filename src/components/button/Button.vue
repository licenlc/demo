<template>
  <div class="dv-btn" @click="handleClick" :class="classes">
      <i class="dv-btn-icon"></i>
      <p class="dv-btn-text"><slot></slot></p>
  </div>
</template>

<script>
const prefixCls = 'dv-btn'
export default {
  name: 'dv-btn',
  props: {
    text: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'default',
      validator (value) {
        return ['small', 'large', 'default'].indexOf(value) > -1
      }
    }
  },
  computed: {
    classes () {
      return {
        [`${prefixCls}-${this.size}`]: !!this.size
      }
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style>
.dv-btn{
  text-align: center;
  font-size: 16px;
  border-radius: 4px;
  color:#fff;
  background-color:#26a2ff;
  padding: 12px;
  display: inline-block;
}
.dv-btn-small{
  width: 100px;
}
.dv-btn-default{
  width: 50%;
}
.dv-btn-large{
  width: 80%;
}
</style>


