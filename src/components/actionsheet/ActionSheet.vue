<template>
  <div>
      <transition name="actionsheet-float">
        <div class="uvue-actionsheet" v-show="curShow">
          <ul class="uv-actionsheet-list" :style="{'margin-bottom': cancelText ? '5px' : '0px'}">
            <li class="uv-actionsheet-item" v-for="(item, index) in actions" v-text="item.name" @click="itemClick(index)" :key="index"/>
          </ul>
          <a class="uv-actionsheet-btn" v-if="showCancel" @click="itemClick(-1)" v-text="cancelText"></a>
        </div>
      </transition>
      <transition name="uvue-mask">
        <div class="uvue-masking" @click="itemClick(-1)" v-show="curShow"></div>
      </transition>
  </div>
</template>
<script>
export default {
  name: 'action-sheet',
  props: {
    actions: {
      type: Array,
      default: []
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    show: {
      type: Boolean,
      default: false
    },
    showCancel: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      curShow: this.show
    }
  },
  watch: {
    'show': function (val) {
      this.curShow = val
    }
  },
  methods: {
    itemClick (index) {
      this.curShow = false
      if (index < 0) {
        this.$emit('item-click', -1)
      } else {
        this.$emit('item-click', index)
      }
    },
    closeMasking () {
    }
  }
}
</script>
<style lang="css">
.uvue-actionsheet{
    position: fixed;
    bottom: 0;
    right:0;
    left:0;
    text-align: center;
    margin: 0 1%;
    font-size:16px;
    z-index: 1000;
  }
  .uv-actionsheet-list{
    background-color: #fff;
    border-radius: 6px;
    max-height: 450px;
    overflow: scroll;
  }
  .uv-actionsheet-item{
    border-bottom:1px solid #f0f0f0;
    height:40px;
    line-height: 40px;
    overflow: hidden;
  }
  .uv-actionsheet-btn{
    background-color: #fff;
    display:block;
    line-height:40px;
    height:40px;
    border-radius: 6px;
    margin-bottom: 8px;
  }
  .actionsheet-float-enter-active {
    transform: translateY(0);
    transition:300ms ease-out;
  }
  .actionsheet-float-enter, .actionsheet-float-leave-active {
    transition:300ms ease-out;
    transform: translateY(100%);
  }
  .uvue-mask-enter-active{
    transition: opacitybg 300ms linear;
  }
  @keyframes opacitybg {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .uvue-mask-leave-active {
    opacity: 0;
    transition: 300ms ease-out;
  }
  .uvue-masking {
    position: fixed;
    right: 0;
    left:0;
    bottom: 0;
    top: 0;
    background-color: rgba(0,0,0,.2);
    z-index: 999;
    opacity: .6;
  }
 
  
</style>
