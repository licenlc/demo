<template>
  <div class="dv-swiper-item" :style = "curStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'dv-swiper-item',
  computed: {
    curStyle () {
      return {
        width: `${window.innerWidth}px`
      }
    }
  }
}
</script>

<style>
.dv-swiper-item {
  height: 100%;
  background-color:#f088ff;
}
</style>

