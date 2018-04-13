<template>
  <section class="dv-swiper" ref="swiper">
    <div class="dv-swiper-wraper"
      :style="wraperStyle" ref="swiperWraper">
      <slot></slot>
    </div>
    <div class="dv-swiper-pagination"></div>
  </section>
</template>

<script>
const VERTICAL = 'vertical'
const HORIZONTAL = 'horizontal'
export default {
  name: 'dv-swiper',
  props: {
    loop: {
      type: Boolean,
      default: false
    },
    speed: {
      type: Number,
      default: 500
    },
    delay: {
      type: Number,
      default: 3000
    },
    direction: {
      type: String,
      default: VERTICAL,
      validator: (value) => [VERTICAL, HORIZONTAL].indexOf(value) > -1
    },
    paginationVisible: {
      type: Boolean,
      default: false
    },
    initPage: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      windWidth: window.innerWidth,
      curSpeed: this.speed,
      childItem: 0,
      curIndex: 0,
      timer: null,
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0,
      startTime: 0,
      moveTime: 0,
      isTouch: false,
      translateX: 0,
      delayTime: this.delay
    }
  },
  computed: {
    wraperStyle () {
      return {
        transition: `${this.curSpeed}ms`,
        width: `${this.childItem * this.windWidth}px`,
        transform: `translate3d(-${this.translateX}px, 0, 0)`
      }
    }
  },
  methods: {
    autoPlay () {
      if (this.loop && !this.isTouch) {
        this.timer = setInterval(() => {
          if (this.curIndex === (this.childItem - 1)) {
            this.curIndex = 1
            this.curSpeed = 0
            this.delayTime = 0
          } else if (this.curIndex === 0) {
            this.curIndex = this.childItem
            this.curSpeed = 0
          } else {
            this.curIndex += 1
            this.curSpeed = this.speed
            this.delayTime = this.delay
          }
          this.translateX = this.windWidth * this.curIndex
        }, this.delayTime)
      }
    },
    touchStart (e) {
      this.isTouch = true
      this.curSpeed = 0
      this.startX = e.touches[0].pageX
      this.startY = e.touches[0].pageY
      this.startTime = e.timeStamp
      clearInterval(this.timer)
    },
    touchMove (e) {
      this.moveX = e.touches[0].pageX
      this.moveY = e.touches[0].pageY
      this.moveTime = e.timeStamp
      console.log(this.moveX - this.startX, this.translateX)
      // if (this.moveTime - this.startTime > 200) {
      //   this.startTime = this.moveTime
      //   this.startX = this.moveX
      //   this.startY = this.moveY
      // }
      // this.translateX = this.translateX - (this.moveX - this.startX)
      this.translateX = -(this.moveX - this.startX) + this.translateX
    },
    touchEnd (e) {
      this.isTouch = false
      // this.curSpeed = this.speed
    }
  },
  mounted () {
    this.childItem = this.$children.length
    let wrapper = this.$refs.swiperWraper
    wrapper.addEventListener('touchstart', this.touchStart, false)
    wrapper.addEventListener('touchmove', this.touchMove, false)
    wrapper.addEventListener('touchend', this.touchEnd, false)
    let swiperWrap = wrapper.children
    if (this.loop) {
      let lastNode = swiperWrap[swiperWrap.length - 1].cloneNode(true)
      let firstNode = swiperWrap[0].cloneNode(true)
      wrapper.insertBefore(lastNode, swiperWrap[0])
      wrapper.appendChild(firstNode)
      this.childItem += 2
      this.curIndex = 1
      this.translateX = this.windWidth * this.curIndex
    }
    // this.autoPlay()
  }
}
</script>

<style>
.dv-swiper{
  width: 100%;
  height: 200px;
  position: relative;
  background-color:#fff;
  overflow: hidden;
}
.dv-swiper-wraper{
  height: 100%;
  display: flex;
  overflow: hidden;
}
</style>
