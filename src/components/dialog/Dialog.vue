<template>
  <transition name="fade-out">
      <div class="dv-confirm-dialog" v-show="value">
        <div class="dv-title" v-text="title" v-if="title"></div>
        <slot name="content">
          <p class="dv-content" v-text="content" v-if="content"></p>
        </slot>
        <div class="dv-dialog-btn-area">
          <slot name="footer">
              <a class="dv-dialog-btn dv-dialog-btn-calc" v-if="cancelText" v-text="cancelText" @click="$emit('input', false)"></a>
              <a class="dv-dialog-btn dv-dialog-btn-ok" v-text="okText" v-if="okText" @click="okCB"></a>
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
      this.success()
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
.dv-dialog-btn-area{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dv-dialog-btn{
  padding: 6px 0;
  font-size: 14px;
  color:#26a2ff;
  background-color:#fff;
  border-radius: 4px;
}
.dv-dialog-btn-area .dv-dialog-btn{
  flex: 1;
}
.dv-dialog-btn.dv-dialog-btn-calc{
  color:#000;
  background-color:#fff;
}
.dv-dialog-btn.dv-dialog-btn-ok{
  border-left:1px solid #f0f0f0;
}
.fade-out-enter, .fade-out-leave-to{
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(.4);
}

.fase-out-enter-active, .fade-out-leave-active{
    animation: faseOut 300ms;
}

.fade-out-enter-to, .fade-out-leave{
  opacity: 1;
  transition: 300ms ease-in-out;

}
@keyframes fadeOut {
  0%{
    transform: translate3d(-50%, -50%, 0) scale(0.3); 
  }
  50%{
    transform: translate3d(-50%, -50%, 0) scale(1.2); 
  }
  100%{
    transform: translate3d(-50%, -50%, 0) scale(1); 
  }
}
</style>

