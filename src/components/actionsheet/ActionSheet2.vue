<template>
    <transition name="actionsheet-float">
      <div class="dv-actionsheet" v-show="value">
        <ul class="dv-actionsheet-list" :style="{'margin-bottom': cancelText ? '5px' : '0px'}">
          <li class="dv-actionsheet-item" v-for="(item, index) in actions" v-text="item.name" @click="itemClick(index)" :key="index"/>
        </ul>
        <a class="dv-actionsheet-btn" v-if="showCancel" @click="$emit('input', false)" v-text="cancelText"></a>
      </div>
    </transition>
</template>
<script>
import Popup from '../mixinx/popup'
export default {
  name: 'action-sheet2',

  mixins: [Popup],
  props: {
    actions: {
      type: Array,
      default: []
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    overlay: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    itemClick (index) {
      this.$emit('input', false)
      if (index >= 0) {
        this.$emit('item-click', index)
      }
    },
    closeMasking () {
    }
  }
}
</script>
<style lang="css">
.dv-actionsheet{
    position: fixed;
    bottom: 0;
    right:0;
    left:0;
    text-align: center;
    margin: 0 1%;
    font-size:16px;
    z-index: 1000;
}
.dv-actionsheet-list{
  background-color: #fff;
  border-radius: 6px;
  max-height: 450px;
  overflow: scroll;
}
.dv-actionsheet-item{
  border-bottom:1px solid #f0f0f0;
  height:40px;
  line-height: 40px;
  overflow: hidden;
}
.dv-actionsheet-btn{
  background-color: #fff;
  display:block;
  line-height:40px;
  height:40px;
  border-radius: 6px;
  margin-bottom: 8px;
}
.actionsheet-float-enter-active, .actionsheet-float-leave-active {
  transition:300ms ease-out;
}
.actionsheet-float-enter-to, .actionsheet-float-leave{
  transform: translateY(0);
  opacity: 1;
}
.actionsheet-float-enter, .actionsheet-float-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

@keyframes opacitybg {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}  
</style>
