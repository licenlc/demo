<template>
  <div class="uvue-tab" ref="tabWidths">
    <div class="vue-tab-wrapper" ref="wrapperWidth" :style="style">
      <span v-for="index in widths" :key= "index">测试{{index}}</span>
      <!-- <slot></slot> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'uvue-tab',
    props: {
      // 近似等于超出边界时最大可拖动距离(px);
      additionalX: {
        type: Number,
        default: 90
      }
    },
    data () {
      return {
        widths: 20,
        speed: 0,
        touching: false,
        springBack: false,
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0,
        currentX: 0,
        currentY: 0,
        inertiaFrame: 0,
        translateX: 0,
        translateY: 0,
        acceleration: 0 // 惯性滑动加速度;
      }
    },
    computed: {
      style () {
        return {
          transform: `translate3d(${this.translateX}px, 0px, 0px)`
        }
      },
      // 是否向左惯性滚动
      isMoveLeft () {
        console.log('left')
        return this.currentX <= this.startX
      },
      isMoveRight () {
        console.log('right')
        return this.startX <= this.currentX
      },
      tabWidth () {
        console.log('offsetWidth:', this.$refs.tabWidths.offsetWidth)
        return this.$refs.tabWidths.offsetWidth
      },
      listWidth () {
        console.log('wrapperWidth:', this.$refs.wrapperWidth.offsetWidth)
        console.log('listWidth:', this.$refs.wrapperWidth.offsetWidth - this.tabWidth)
        return this.wrapperWidth - this.tabWidth
      },
      wrapperWidth () {
        return this.$refs.wrapperWidth.offsetWidth
      }
    },
    mounted () {
      this.$refs.tabWidths.addEventListener('touchstart', this.handeStart, false)
      this.$refs.tabWidths.addEventListener('touchmove', this.handeMove, false)
      this.$refs.tabWidths.addEventListener('touchend', this.handeEnd, false)
    },
    methods: {
      handeStart (event) {
        this.startX = event.touches[0].clientX
        this.lastX = this.startX
        console.log('startX', this.startX)
      },
      handeMove (event) {
        if (this.listWidth < 0) {
          return
        }
        event.preventDefault()
        event.stopPropagation()
        // this.lastX = this.startX
        this.currentX = event.touches[0].clientX
        this.moveFollow()
        if (Math.round((this.currentX - this.startX)) % 20 === 0) {
          console.log(this.currentX, this.startX, (this.currentX - this.startX))
          console.log('translateX======:', this.translateX)
        }
        this.endTouchTime = event.timeStamp
      },
      handeEnd (event) {
        this.touching = false
        if (this.checkReBound()) {
          // console.log('回弹啊')
        } else {
          // let currentTime = event.timeStamp - this.endTouchTime

        }
      },
      // 检测是否回弹
      checkReBound () {
        this.springBack = false
        if (this.translateX > 0) {
          this.springBack = true
          this.translateX = 0
        } else if (this.translateX < -this.wrapperWidth) {
          this.springBack = true
          this.translateX = -this.listWidth
        }
        return this.translateX === 0 || this.translateX === -this.listWidth
      },
      moveFollow () {
        if (this.currentX > this.startX) {
          if (this.translateX >= 0) {
            // console.log('向右---导函数:', (this.currentX - this.lastX))
            this.translateX += this.additionalX * (this.currentX - this.lastX) / (this.tabWidth + this.translateX)
          } else {
            this.translateX = this.currentX - this.startX
          }
        } else if (this.currentX < this.startX) {
          if (this.translateX < -this.listWidth) {
            // console.log('导函数')
          } else {
            this.translateX = this.currentX - this.startX
          }
        }
        this.lastX = this.currentX
      }
    }
  }
</script>
<style>
.uvue-tab{
  width: 100%;
  overflow: hidden;
  display:flex;
  position: relative;
}
.vue-tab-wrapper{
  min-width: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-shrink: 0;
  /* overflow:hidden; */
}
.vue-tab-wrapper span{
  font-size: 16px;
  padding: 6px 4px;
  display: inline-block;
}
</style>
