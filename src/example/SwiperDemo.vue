<template>
<div class="parent">
  <swiper>
    <swiper-item v-for="(item, index) in list" :key="index">
      <div style="text-align:center;">{{item}}</div>
    </swiper-item>
  </swiper>
</div>
</template>
<script>
import Swiper from '@/components/swiper2/Swiper'
import SwiperItem from '@/components/swiper2/SwiperItem'
export default {
  name: 'swiper-demo',
  components: {
    Swiper,
    SwiperItem
  },
  data () {
    return {
      // list: [11211111111111, 22222222222222222, 3333333333333, 444444444, 5555555555, 666666666, 77777777],
      list: [11111111111111, 22222222222222222, 3333333333333]
    }
  }
}
</script>
<style>
.parent{
  /* width: 100%;
  margin: 10%; */
  box-sizing: border-box;
}
</style>
