<template>
  <div class="uvue-swiper-item">
    <slot></slot>
  </div>
</template>
<<script>
export default {
  name: 'uvue-swiper-item',
  mounted () {
    this.$parent && this.$parent.swipeItemCreated()
  },
  destoryed () {
    this.$parent && this.$parent.swiperItemDestory()
    console.log('swiper-item销毁')
  }
}
</script>
