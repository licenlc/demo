<template>
  <div class="dv-picker-wrapper"
      :class = "className"
      :style = "wrapperStyle"
      @touchstart = "onTouchStart"
      @touchmove = "onTouchMove"
      @touchend = "onTouchEnd" >
      <ul :style = "currentStyle">
        <li class="dv-picker-item" v-for = "(item, index) in options" 
            :key="index" 
            v-text="item.value || item"
            :style="{}"
            :class = "{'dv-picker-item-active': index === currentIndex }"
            @click="setIndex(index, true)"/>
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
    options: [Array, Number],
    defaultIndex: Number
  },
  computed: {
    maxOffset () {
      console.log('maxOffset:', this.count * this.itemHeight)
      return this.count * this.itemHeight
    },
    minOffset () {
      return this.baseOffset - this.itemHeight
    },
    count () {
      // console.log('options:', JSON.stringify(this.options), Object.prototype.toString.call(this.options) === '[object Number]')
      if (Object.prototype.toString.call(this.options) === '[object Number]') {
        return this.options
      } else {
        return this.options.length
      }
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
  watch: {
    defaultIndex: function (val) {
      console.log('默认值:', this.defaultIndex)
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
      e.preventDefault()
      let clientY = e.touches[0].clientY
      this.startY = clientY
      this.endMoveY = this.lastMoveY = clientY
      this.startOffset = this.offset
      this.duration = 0
      this.startTime = e.timeStamp
    },
    onTouchMove (e) {
      e.preventDefault()
      let deltaY = this.startY - e.touches[0].clientY
      // console.log('move:', e.touches[0].clientY, 'deltalY:', deltaY)
      this.offset = this.startOffset - deltaY
      this.endMoveY = e.touches[0].clientY
      if (e.timeStamp - this.startTime > 200) {
        console.log('重新设置参数')
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
      console.log('v:', v)
      // 滑动方向, 大于0 为向下滑动， 为负， 向上滑动
      // let direction = v > 0 ? -1 : 1
      let duration = v / 0.002
      let distance = v * duration / 2
      console.log('distance:', distance, 'v:', v, 'baseOffset:', this.baseOffset, 'offset:', this.offset, 'minoffset', this.minOffset)
      this.duration = 300
      if (v <= 0) {
        let offset = this.offset - distance
        if (offset <= -this.maxOffset) {
          this.offset = -this.maxOffset + 40
          this.currentIndex = this.count - 1
        } else {
          let index = Math.round(Math.abs(offset / this.itemHeight))
          this.currentIndex = index > this.count - 1 ? this.count - 1 : index
          this.offset = this.itemHeight * this.currentIndex * -1
        }
      } else if (v >= 0) {
        let offset = this.offset + distance
        if (offset < -this.maxOffset) {
          this.offset = -this.maxOffset + 40
          this.currentIndex = this.count - 1
        } else {
          let index = Math.round(Math.abs(offset / this.itemHeight))
          this.currentIndex = index
          this.offset = this.itemHeight * this.currentIndex * -1
        }
      }
      if (v <= 0) {
        // this.duration = 300
        // if (this.offset - distance <= -this.maxOffset) {
        //   this.offset = -this.maxOffset + 40
        //   this.currentIndex = this.count - 1
        //   console.log('maxOffset:', this.maxOffset)
        // } else if (this.offset + distance >= this.minOffset) {
        //   this.offset = this.minOffset - 40
        //   this.currentIndex = 0
        //   console.log('maxOffset:', this.maxOffset)
        // } else {
        //   let offset = this.offset - distance
        //   let index = Math.round(Math.abs(offset / this.itemHeight))
        //   this.currentIndex = index > this.count - 1 ? this.count - 1 : index
        //   console.log('index:', index)
        //   this.offset = this.itemHeight * this.currentIndex * -1
        // }
      } else if (v >= 0) {
        // this.duration = 300
        // if (this.offset + distance >= this.minOffset) {
        //   console.log('minoffset=====================')
        //   this.offset = this.minOffset - 40
        //   this.currentIndex = 0
        // } else if (this.offset - distance < -this.maxOffset) {
        //   console.log('maxoffset=====================')
        //   this.offset = -this.maxOffset + 40
        //   this.currentIndex = this.count - 1
        // } else {
        //   console.log('计算值=====================')
        //   let offset = this.offset + distance
        //   let index = Math.round(Math.abs(offset / this.itemHeight))
        //   this.currentIndex = index
        //   this.offset = this.itemHeight * this.currentIndex * -1
        // }
      }
      // if (v <= 0) {
      //   this.duration = 300
      //   if (this.offset - distance <= -this.maxOffset) {
      //     this.offset = -this.maxOffset + 40
      //     this.currentIndex = this.count - 1
      //     console.log('maxOffset:', this.maxOffset)
      //   } else if (this.offset + distance >= this.minOffset) {
      //     this.offset = this.minOffset - 40
      //     this.currentIndex = 0
      //     console.log('maxOffset:', this.maxOffset)
      //   } else {
      //     let offset = this.offset - distance
      //     let index = Math.round(Math.abs(offset / this.itemHeight))
      //     this.currentIndex = index > this.count - 1 ? this.count - 1 : index
      //     console.log('index:', index)
      //     this.offset = this.itemHeight * this.currentIndex * -1
      //   }
      // } else if (v >= 0) {
      //   this.duration = 300
      //   if (this.offset + distance >= this.minOffset) {
      //     console.log('minoffset=====================')
      //     this.offset = this.minOffset - 40
      //     this.currentIndex = 0
      //   } else if (this.offset - distance < -this.maxOffset) {
      //     console.log('maxoffset=====================')
      //     this.offset = -this.maxOffset + 40
      //     this.currentIndex = this.count - 1
      //   } else {
      //     console.log('计算值=====================')
      //     let offset = this.offset + distance
      //     let index = Math.round(Math.abs(offset / this.itemHeight))
      //     this.currentIndex = index
      //     this.offset = this.itemHeight * this.currentIndex * -1
      //   }
      // }
      this.setValue()
    },
    setIndex (index, action) {
      if (index !== this.currentIndex) {
        this.offset = -(this.itemHeight * index)
        this.currentIndex = index
        this.setValue()
      }
    },
    setValue () {
      // console.log('on-item-change子元素', this.currentIndex)
      this.$emit('on-item-change', this.currentIndex)
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
  word-wrap: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.dv-picker-item-active {
  color:red;
  font-size: 16px;
  font-weight: 800;
}
</style>
