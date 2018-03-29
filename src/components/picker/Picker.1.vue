<template>
  <div class="picker-area">
    <div class="picker-comfirm-area">
      <span>取消</span>
      <span @click="getValue">确认</span>
    </div>
    <div class="picker-body">
      <div class="picker-inner" ref="pickerInner">
          <div class="picker-selected"></div>
          <ul class="picker-list" ref="pickerWrap">
              <li class="picker-item visibile" v-for = "(item, index) in listInfo" :style="item.style">{{item.text}}</li>
          </ul>
      </div>
      <div class="picker-inner" ref="pickerInner">
          <div class="picker-selected"></div>
          <ul class="picker-list" ref="pickerWrap">
              <li class="picker-item visibile" v-for = "(item, index) in listInfo" :style="item.style">{{item.text}}</li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Picker',
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
        // console.log('startY', this.startY)
        this.startTime = Date.now()
        lastAngle = this.startAngle
        // console.log('触摸开始lastAngle:', lastAngle)
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
        // console.log('endY:', this.endY)
        let dragRange = this.endY - this.startY
        // console.log('dragRange:', dragRange)
        let dragAngle = this.calcAngle(dragRange)
        // console.log('dragAngle:', dragAngle, 'lastAngle:', lastAngle)
        var newAngle = dragRange > 0 ? lastAngle - dragAngle : lastAngle + dragAngle
        // console.log('newAngle:', newAngle)
        if (newAngle <= this.beginExceed) {
          newAngle = this.beginExceed
        } else if (newAngle > (this.endAngle - this.beginExceed)) {
          newAngle = (this.endAngle - this.beginExceed)
        }
        this.startAngle = newAngle
        // console.log('touchmove:', newAngle)
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
      // console.log('滑动结束:', endY)
      let nowTime = Date.now()
      // 向上滑动为负数，向下为正数
      let v = (endY - this.startY) / (nowTime - this.startTime)
      // console.log('v:', v)
      if (v === 0) {
        return
      }
      // console.log('滑动速度：', v)
      let dir = v > 0 ? -1 : 1
      let deceleartion = dir * 0.0019 * -1
      // 持续时间
      let duration = Math.abs(v / deceleartion)
      let dist = v * duration / 2
      // console.log('惯性滑动距离：', dist)
      let distAngle = this.calcAngle(dist) * dir + this.startAngle
      if (distAngle > this.endAngle) {
        distAngle = (this.endAngle - this.beginExceed)
      } else if (distAngle < this.beginExceed) {
        distAngle = this.beginExceed
      }
      let index = parseInt((distAngle / this.itemAngle).toFixed(0))
      let disAngle = index * this.itemAngle
      // console.log('最终滑动角度：', disAngle)
      // console.log('index:', disAngle, index)
      this.index = index
      // this.$refs.pickerWrap.style.webkitTransition = '150ms ease-out'
      this.$refs.pickerWrap.style.webkitTransition = `${duration}ms ease-out`
      this.setAngle(distAngle)
      // this.endScroll(distAngle)
      setTimeout(() => {
        this.endScroll(distAngle)
      }, 12)
    },
    endScroll (distAngle) {
      // console.log('endScroll,', distAngle <= 0)
      if (distAngle > this.endAngle) {
        distAngle = this.endAngle
        this.$refs.pickerWrap.style.webkitTransition = `300ms ease-out`
      } else if (distAngle <= 0) {
        distAngle = 0
        this.$refs.pickerWrap.style.webkitTransition = `300ms ease-out`
      } else {
        let index = parseInt((distAngle / this.itemAngle).toFixed(0))
        distAngle = index * this.itemAngle
        this.$refs.pickerWrap.style.webkitTransition = `200ms ease-out`
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
      // console.log('initDeg:', initDeg,'; cosC:', cosC, '; rad:', Math.acos(cosC))
      // 计算旋转的角度
      let angleC = initDeg + this.rad2Deg(Math.acos(cosC))
      return angleC
    },
    // 设置父节点的旋转角度
    setAngle (dragAngle) {
      this.$refs.pickerWrap.style.webkitTransform = `perspective(1000px) rotateY(0deg) rotateX(${dragAngle}deg)`
      // this.$refs.pickerWrap.style.webkitTransition = '150ms ease-out'
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
      // this.$refs.pickerWrap.style.webkitTransition = '150ms ease-out'
      this.radius = this.$refs.pickerInner.offsetHeight / 2 - 10
      // this.radius = 100
      this.itemAngle = this.calcAngle(this.$refs.pickerWrap.offsetHeight * 0.8)
    },
    getValue () {
      // console.log(JSON.stringify(this.list))
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
.picker-area{
  position: fixed;
  bottom:0;
  right: 0;
  left: 0;
}
.picker-comfirm-area{
  display:flex;
  justify-content: space-between;
}
.picker-comfirm-area span {
  padding: 0 10px;
}
.picker-body{
  width:100%;
  height: 200px;
  position: relative;
  border-top:1px solid #ddd;
  display: flex;
}
.picker-body .picker-inner{
  flex:1;
  height:100%;
  background:#ddd;
  box-sizing: border-box;
  position: relative;
  -webkit-mask-box-image: -webkit-linear-gradient(bottom, transparent, transparent 5%, #fff 20%, #fff 80%, transparent 95%, transparent);
}
.picker-list{
  box-sizing: border-box;
  position: absolute;
  top:50%;
  height: 40px;
  line-height:40px;
  margin-top:-20px;
  /* background-color:yellow; */
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


