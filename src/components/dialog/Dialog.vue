<template>
  <transition name="fade-out">
      <div class="dv-confirm-dialog" v-show="value">
        <div class="dv-title" v-text="title" v-if="title"></div>
        <slot name="content">
          <p class="dv-content" v-text="content" v-if="content"></p>
        </slot>
        <div class="dv-btn-area">
          <slot name="footer">
              <a class="dv-btn dv-btn-calc" v-if="cancelText" v-text="cancelText" @click="$emit('input', false)"></a>
              <a class="dv-btn dv-btn-ok" v-text="okText" v-if="okText" @click="okCB"></a>
          </slot>
        </div>
      </div>
  </transition>
</template>

<script>
import Popup from '../mixinx/popup'
export default {
  name: 'dv-dialog',

  mixins: [Popup],
  props: {
    content: String,
    cancelText: {
      type: String,
      default: ''
    },
    okText: {
      type: String,
      default: '确定'
    },
    title: String,
    overlay: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    okCB () {
      this.$emit('input', false)
      this.$emit('on-ok')
    }
  }
}
</script>

<style>
.dv-confirm-dialog{
  position: fixed;
  background-color:#fff;
  border-radius:4px;
  width:70%;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate3d(-50%, -50%, 0);
}
.dv-title {
  padding: 4px; 
  font-size: 18px;
  border-bottom: 1px solid #f0f0f0;
}
.dv-content {
  padding: 20px 10px;
  color:#999;
  font-size:14px;
  border-bottom: 1px solid #f0f0f0;
  max-height: 100px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.dv-btn-area{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dv-btn{
  padding: 6px 0;
  font-size: 14px;
  color:#26a2ff;
  background-color:#fff;
  border-radius: 4px;
}
.dv-btn-area .dv-btn{
  flex: 1;
}
.dv-btn.dv-btn-calc{
  color:#000;
  background-color:#fff;
}
.dv-btn.dv-btn-ok{
  border-left:1px solid #f0f0f0;
}
.dv-btn-ok:active{
  background-color: red;
}
.fade-out-enter, .fade-out-leave-to{
  opacity: 0;
  transform: scale(.5);
}

.fade-out-enter-to, .fade-out-leave{
  opacity: 1;
  transition: all 300ms ease-in-out;
}
</style>

