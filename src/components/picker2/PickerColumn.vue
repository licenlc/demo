<template>
  <div class="dv-picker-wrapper"
      :class = "className"
      :style = "wrapperStyle"
      @touchstart = "onTouchStart"
      @touchmove = "onTouchMove"
      @touchend = "onTouchEnd" >
      <ul :style = "currentStyle">
        <li clas="dv-picker-item" v-for = "(item, index) in options" 
            :key="index" 
            v-text="item.value || item"
            :style="{}"
            :class = "{'dv-picker-item-active': index === currentIndex }"
            @click="setIndex(index, true)"
        />
      </ul>
  </div>
</template>

<script>
const DEFAULT_DURATION = 200
export default {
  name: 'dv-picker-column',
  props: {
    className: String,
    itemHeight: Number,
    visibleItemCount: Number,
    options: {
      type: Array,
      default: () => []
    },
    defaultIndex: Number
  },
  computed: {
    maxOffset () {
      return this.count * this.itemHeight
    },
    minOffset () {
      return this.baseOffset - this.itemHeight
    },
    count () {
      return this.options.length
    },
    baseOffset () {
      return this.itemHeight * (this.visibleItemCount - 1) / 2
    },
    wrapperStyle () {
      return {height: this.itemHeight * this.visibleItemCount + 'px'}
    },
    currentStyle () {
      return {
        transition: `${this.duration}ms`,
        transform: `translate3d(0,  ${this.baseOffset + this.offset}px,  0)`,
        lineHeight: this.itemHeight + 'px'
      }
    }
  },
  data () {
    return {
      startY: 0,
      lastMoveY: 0,
      endMoveY: 0,
      duration: 0,
      startOffset: 0,
      currentIndex: this.defaultIndex,
      offset: -(this.defaultIndex * this.itemHeight),
      startTime: 0,
      endTime: 0
    }
  },
  methods: {
    onTouchStart (e) {
      let clientY = e.touches[0].clientY
      this.startY = clientY
      this.lastMoveY = clientY
      this.startOffset = this.offset
      this.duration = 0
      this.startTime = e.timeStamp
    },
    onTouchMove (e) {
      let deltaY = this.startY - e.touches[0].clientY
      this.offset = this.startOffset - deltaY
      this.endMoveY = e.touches[0].clientY
      if (e.timeStamp - this.startTime > 300) {
        // console.log('重新设置参数')
        this.startTime = e.timeStamp
        this.lastMoveY = e.touches[0].clientY
      }
    },
    onTouchEnd (e) {
      this.duration = DEFAULT_DURATION
      this.endTime = e.timeStamp
      this.startInertiaMove(event)
    },
    // 开始惯性滑动
    startInertiaMove (event) {
      this.endTime = event.timeStamp
      let v = (this.endMoveY - this.lastMoveY) / (this.endTime - this.startTime)
      // 滑动方向, 大于0 为向下滑动， 为负， 向上滑动
      // let direction = v > 0 ? -1 : 1
      let duration = v / 0.004
      let distance = v * duration / 2
      if (v <= 0) {
        this.duration = 300
        if (this.offset - distance < -this.maxOffset) {
          this.offset = -this.maxOffset + 40
          this.currentIndex = this.options.length - 1
        } else if (this.offset + distance >= this.minOffset) {
          this.offset = this.minOffset - 40
          this.currentIndex = 0
          // console.log('currentIndex:', index)
        } else {
          this.offset = this.offset - distance
          let index = Math.round(Math.abs(this.offset / this.itemHeight))
          this.currentIndex = index
          // console.log('currentIndex:', index)
          this.offset = this.itemHeight * index * -1
        }
      } else if (v >= 0) {
        this.duration = 300
        if (this.offset + distance >= this.minOffset) {
          this.offset = this.minOffset - 40
          this.currentIndex = 0
        } else if (this.offset - distance < -this.maxOffset) {
          this.offset = -this.maxOffset + 40
          this.currentIndex = this.options.length - 1
        } else {
          this.offset = this.offset + distance
          let index = Math.round(Math.abs(this.offset / this.itemHeight))
          this.currentIndex = index
          console.log('currentIndex:', index)
          this.offset = this.itemHeight * index * -1
        }
      }
      this.setValue()
    },
    setIndex (index, action) {
      if (index !== this.currentIndex) {
        this.offset = -(this.itemHeight * index)
        this.currentIndex = index
        // this.setValue()
      }
    },
    setValue () {
      console.log('on-change子元素', this.currentIndex)
      this.$emit('on-change', this.currentIndex)
    }
  }
}
</script>

<style>
.dv-picker-wrapper{
  overflow: hidden;
  flex: 1;
}
.dv-picker-wrapper ul{
  color: #666;
}
.dv-picker-item {
  height: 44px;
}
.dv-picker-item-active {
  color:red;
  font-size: 14px;
  font-weight: 800;
}
</style>
