<template>
  <transition name="toast-show">
    <div class="uvue-toast" v-if="desc && visible">
      <i class="uvue-icon" v-if="icon"></i>
      <span v-text="msg"></span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'toast',
  props: {
    desc: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 5000
    },
    icon: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: false
    }
  }
}
</script>
<style>
.uvue-toast{
  position: absolute;
  top: 50%;
  left:50%;
  transform: translate3d(-50%, -50%, 0);
  padding: 4px 10px;
  background-color: rgba(0, 0, 0, .6);
  border-radius: 4px;
  color: #fff;
  max-width: 40%;
  overflow: hidden;
  text-align: center;
  -webkit-line-clamp: 2;
  word-wrap: break-word;
}
</style>

