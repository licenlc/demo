<template>
    <div class="picker-inner" ref="pickerInner">
      <div class="picker-selected"></div>
      <ul class="picker-list" ref="pickerWrap">
          <li class="picker-item visibile" v-for = "(item, index) in listInfo" :style="item.style" :key="index">{{item.text}}</li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'picker-slot',
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      listInfo: [],
      // 两端可以旋转的最大角度
      MAX_EXCEED: 30,
      itemAngle: 0,
      // touchstar起点和结束点
      startY: 0,
      endY: 0,
      // 设置滑动的时间点
      startTime: 0,
      endTime: 0,
      // 最后触摸的点
      lastMoveStart: 0,
      lastMoveTime: 0,
      // 3D旋转的半径
      radius: 0,
      isPikcer: false,
      beginExceed: -30,
      startAngle: 0,
      endAngle: 0,
      index: 0
    }
  },
  watch: {
    'index': function () {
      // this.selectIndex = this.index
      console.log('selectIndex:', this.index)
      this.$emit('on-change', this.index)
    }
  },
  methods: {
    rad2Deg (rad) {
      return rad / (Math.PI / 180)
    },
    deg2rag (deg) {
      return deg * (Math.PI / 180)
    },
    handeEvent () {
      let lastAngle = 0
      // touchStart事件
      let startHander = event => {
        event.preventDefault()
        this.isPicker = true
        this.startY = event.touches[0].pageY
        this.startTime = Date.now()
        lastAngle = this.startAngle
        this.$refs.pickerWrap.style.webkitTransition = ''
        this.updateInertiaParams(event, true)
      }
      // touchMove事件
      let moveHander = event => {
        event.preventDefault()
        if (!this.isPicker) {
          return
        }
        this.endY = event.touches[0].pageY
        let dragRange = this.endY - this.startY
        let dragAngle = this.calcAngle(dragRange)
        var newAngle = dragRange > 0 ? lastAngle - dragAngle : lastAngle + dragAngle
        if (newAngle <= this.beginExceed) {
          newAngle = this.beginExceed
        } else if (newAngle > (this.endAngle - this.beginExceed)) {
          newAngle = (this.endAngle - this.beginExceed)
        }
        this.startAngle = newAngle
        this.setAngle(newAngle)
        this.updateInertiaParams(event)
      }
      // touchEnd 事件
      let endHander = event => {
        event.preventDefault()
        this.isPicker = false
        this.startInertiaScroll(event)
      }
      // 监听事件
      this.$refs.pickerInner.addEventListener('touchstart', startHander)
      this.$refs.pickerInner.addEventListener('touchend', endHander)
      this.$refs.pickerInner.addEventListener('touchmove', moveHander)
    },
    // 惯性滑动
    startInertiaScroll (event) {
      let endY = event.changedTouches[0].pageY
      let nowTime = Date.now()
      // 向上滑动为负数，向下为正数
      let v = (endY - this.startY) / (nowTime - this.startTime)
      if (v === 0) {
        return
      }
      let dir = v > 0 ? -1 : 1
      let deceleartion = dir * 0.003 * -1
      // 持续时间
      let duration = Math.abs(v / deceleartion)
      let dist = v * duration / 2
      let distAngle = this.calcAngle(dist) * dir + this.startAngle
      if (distAngle > this.endAngle) {
        distAngle = (this.endAngle - this.beginExceed)
      } else if (distAngle < this.beginExceed) {
        distAngle = this.beginExceed
      }
      let index = parseInt((distAngle / this.itemAngle).toFixed(0))
      distAngle = index * this.itemAngle
      this.$refs.pickerWrap.style.webkitTransition = `${duration}ms ease-out`
      this.setAngle(distAngle)
      setTimeout(() => {
        this.endScroll(distAngle)
      }, 12)
    },
    endScroll (distAngle) {
      if (distAngle > this.endAngle) {
        distAngle = this.endAngle
        this.$refs.pickerWrap.style.webkitTransition = `300ms ease-out`
        this.index = this.list.length
      } else if (distAngle <= 0) {
        distAngle = 0
        this.index = 0
        this.$refs.pickerWrap.style.webkitTransition = `300ms ease-out`
      } else {
        let index = parseInt((distAngle / this.itemAngle).toFixed(0))
        this.index = index
        distAngle = index * this.itemAngle
        this.$refs.pickerWrap.style.webkitTransition = `300ms ease-out`
      }
      this.startAngle = distAngle
      this.setAngle(distAngle)
    },
    // 更想惯性滑动参数
    updateInertiaParams (event, isStart = false) {
      if (isStart) {
        this.lastMoveStart = event.changedTouches[0].pageY
        this.lastMoveTime = Date.now()
      } else {
        var nowTime = Date.now()
        if (nowTime - this.lastMoveTime > 300) {
          this.lastMoveStart = event.changedTouches[0].pageY
          this.lastMoveTime = nowTime
        }
      }
    },
    // 初始化惯性滑动参数
    initInertiaParams () {
      this.lastMoveTime = 0
      this.lastMoveStart = 0
    },
    // 计算旋转的角度 使用等腰三角形的余旋公式
    calcAngle (c) {
      c = Math.abs(c)
      let initDeg = parseInt(c / (this.radius * 2)) * 180
      c = c % (this.radius * 2)
      // 计算余弦 等腰三角形
      let cosC = (this.radius * this.radius * 2 - c * c) / (2 * this.radius * this.radius)
      // 计算旋转的角度
      let angleC = initDeg + this.rad2Deg(Math.acos(cosC))
      return angleC
    },
    // 设置父节点的旋转角度
    setAngle (dragAngle) {
      this.$refs.pickerWrap.style.webkitTransform = `perspective(1000px) rotateY(0deg) rotateX(${dragAngle}deg)`
    },
    setItemStyle () {
      let listArr = this.list
      this.listInfo = listArr.map((item, index) => {
        item.style = `transform-origin: center center -${this.radius}px; transform: translateZ(${this.radius}px) rotateX(-${this.itemAngle * index}deg)`
        return item
      })
      this.endAngle = (this.listInfo.length - 1) * this.itemAngle
    },
    initParams () {
      this.$refs.pickerWrap.style.webkitTransform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)'
      this.radius = window.getComputedStyle(this.$refs.pickerInner).getPropertyValue('offsetHeight') / 2 - 10
      console.log(window.getComputedStyle(this.$refs.pickerInner).height)
      console.log(window.getComputedStyle(this.$refs.pickerInner).offsetHeight)
      this.radius = this.$refs.pickerInner.offsetHeight / 2 - 10
      this.radius = 90
      console.log('radius:', this.radius)
      this.itemAngle = this.calcAngle(this.$refs.pickerWrap.offsetHeight * 0.8)
    },
    getValue () {
      console.log(this.list[this.index])
    }
  },
  mounted () {
    this.initParams()
    this.setItemStyle()
    this.handeEvent()
  }
}
</script>
<style>
.picker-list{
  box-sizing: border-box;
  position: absolute;
  top:50%;
  height: 40px;
  line-height:40px;
  margin-top:-20px;
  width:100%;
  transform-style: preserve-3d;
  text-align:center;
}
.picker-selected{
  box-sizing: border-box;
  position: absolute;
  top:50%;
  height: 40px;
  line-height:40px;
  margin-top:-20px;
  border-top:1px solid red;
  border-bottom:1px solid red;
  width:100%;
}
.picker-item{
  height: 40px;
  width:100%;
  position: absolute;
  backface-visibility: hidden;
  visibility: hidden;
}
.picker-item.visibile{
  visibility: visible;
}
</style>


