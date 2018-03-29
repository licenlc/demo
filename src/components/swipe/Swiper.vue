<<template>
  <section class="uvue-swiper">
    <div class="uvue-swiper-wrap" ref="wrap">
      <slot></slot>
    </div>
  </section>
</template>
<<script>
export default {
  name: 'uvueSwiper',
  data () {
    return {
      ready: false,
      index: 0,
      timer: null,
      dragging: false,
      animating: false,
      reInitTimer: null,
      pagesEle: [],
      noDrag: false,
      startTime: 0,
      endTime: 0,
      timerTemp: null,
    }
  },
  props: {
    auto: {
      type: Number,
      default: 4000
    },
    speed: {
      type: Number,
      default: 600
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    continuous: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    this.ready = true
    this.reInitPages()
    // if (this.auto > 0) {
    //   this.timer = setInterval(() => {
    //     if (!this.dragging && !this.animating) {
    //       console.log('next执行开始')
    //       this.next()
    //     }
    //   }, this.auto)
    // }
    this.handEvent()
  },
  methods: {
    handEvent () {
      let startX = 0, startY = 0, prevPageEle
      let touchStartEvent = (event) => {
        event.preventDefault()
        clearInterval(this.timer)
        clearInterval(this.timerTemp)
        startX = event.touches[0].pageX
        startY = event.touches[0].pageY
        nextPageEle = this.pageEle[this.index + 1] || this.pageEle[0]
        prevPageEle = this.pageEle[this.index - 1] || this.pageEle[this.pageEle.length - 1]
      }
      let touchMove = (event) => {
        event.preventDefault()
        moveX = event.touches[0].pageX - startX
        moveY = event.touches[0].pageY - startY
        if (moveX < 0) {
          prevPageEle = this.pagesEle[this.index + 1] || this.pageEle[0]
        }
      }
      let touchEnd = (event) => {
        event.preventDefault()
      }
      this.$refs.wrap.addEventListener('touchstart', touchStartEvent)
    },
    reInitPages () {
      let children = this.$children
      this.noDrag = children.length === 1
      let pages = []
      this.index = this.defaultIndex
      children.forEach((element, index) => {
        pages.push(element.$el)
        element.$el.classList.remove('active')
        if (index === this.index) {
          element.$el.classList.add('active')
        }
      })
      this.pagesEle = pages
    },
    next () {
      this.doAnimate('next')
    },
    prev () {
      this.doAnimate('prev')
    },
    goto () {
      this.doAnimate('goto')
    },
    translate (element, offset, speed, callback) {
      if (speed) {
        element.style.webkitTransition = `-webkit-transform ${speed}ms ease-in-out`
        element.style.transition = `-webkit-transform ${speed}ms ease-in-out`
        element.style.webkitTransform = `translate3d(${offset}px, 0, 0)`
        element.style.transform = `translate3d(${offset}px, 0, 0)`
        clearInterval(this.timerTemp)
        if (callback) {
          callback.apply(this, arguments)
        }
      } else {
        element.style.webkitTransform = `translate3d(${offset}px, 0, 0)`
        element.style.webktiTransition = ''
        element.style.transform = `translate3d(${offset}px, 0, 0)`
        element.style.transition = ''
      }
    },
    doAnimate (towards, options) {
      if ((this.$children.length === 0) || (!options && this.$children.length < 2)) {
        clearInterval(this.timer)
        return
      }
      let prevPageEle, nextPageEle, currentPageEle, pageWidth
      let index = this.index
      let pageCount = this.pagesEle.length
      if (!options || towards === 'goto') {
        options = options || {}
        pageWidth = this.$el.clientWidth
        currentPageEle = this.pagesEle[this.index]
        if (towards === 'next') {
          prevPageEle = this.pagesEle[index - 1] || this.pagesEle[this.pagesEle.length - 1]
          nextPageEle = this.pagesEle[index + 1] || this.pagesEle[0]
        }
        if (this.continuous && this.pagesEle.length > 1) {
          prevPageEle.style.display = 'block'
          this.translate(prevPageEle, -pageWidth)
          nextPageEle.style.display = 'block'
          this.translate(nextPageEle, pageWidth)
          console.log('回元')
          this.startTime = Date.now()
        }
      } else {
      }
      let newIndex
      let oldPageEle = this.pagesEle[index]
      if (towards === 'next') {
        if (index < (pageCount - 1)) {
          newIndex = index + 1
        }
        if (this.continuous && index === (pageCount - 1)) {
          newIndex = 0
        }
      }
      this.index = newIndex
      let callback = () => {
        this.endTime = Date.now()
        console.log((this.endTime - this.startTime) / 1000)
        console.log('newIndex:', newIndex)
        if (newIndex >= 0) {
          this.pagesEle[newIndex].classList.add('active')
          oldPageEle.classList.remove('active')
          this.index = newIndex
          this.$emit('change', newIndex, index)
        }
      }
      if (towards === 'next') {
        if (nextPageEle) {
          this.timerTemp = setTimeout(() => {
            this.translate(currentPageEle, -pageWidth, this.speed, callback)
            this.translate(nextPageEle, 0, this.speed)
          }, 10);
        }
      }
    },
    swipeItemCreated () {
    },
    swiperItemDestory () {
    }
  }
}
</script>
<style>
.uvue-swiper{
  overflow: hidden;
  position: relative;
  height: 100%;
  font-size:0;
}
.uvue-swiper-wrap{
  position:relative;
  height:100%;
  width:100%;
}
.uvue-swiper-wrap > div {
  position: absolute;
  width:100%;
  height:100%;
  transform: translateX(-100%);
}
.uvue-swiper-wrap > div.active{
  display: block;
  transform:none;
}
</style>
