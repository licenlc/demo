<template>
  <transition name="dv-fade">
      <div 
        v-show='visible'
        class="dt-modal"
        :class = "className"
        :style="style"
        @touchmove.prevent.stop
        @click="$emit('click', event)"
      />
  </transition>
</template>

<script>
export default {
  name: 'modal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    zIndex: Number,
    className: String,
    customStyle: Object
  },
  watch: {
    visible: function (val) {
      console.log('visible:', val)
    }
  },
  computed: {
    style () {
      return {
        zIndex: this.zIndex,
        ...this.customStyle
      }
    }
  }
}
</script>

<style lang="css">
.dt-modal{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(247, 76, 49, .6);
  background-color: rgba(0, 0, 0, .6);
  opacity: 0.4;
}
 .dv-fade-enter, .dv-fade-leave-to{
  opacity: 0.1;
}

.dv-fade-enter-active, .dv-fade-leave-active{
  transition: 300ms;
}

</style>
