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
      noDrag: false
    }
  },
  props: {
    auto: {
      type: Number,
      default: 8000
    },
    speed: {
      type: Number,
      default: 300
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
    //       this.next()
    //     }
    //   }, this.auto)
    // }
  },
  methods: {
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
        element.style.webkitTransform = `translate3d(${offset}px, 0, 0)`
        if (callback) {
          callback.apply(this, arguments)
        }
      } else {
        console.log('offset:', offset)
        element.style.webkitTransform = `translate3d(${offset}px, 0, 0)`
        element.style.webktiTransition = ''
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
          // console.log('设置前：', prevPageEle.style.webkitTransform, ';block: ', prevPageEle.style.display)
          prevPageEle.style.display = 'block'
          this.translate(prevPageEle, -pageWidth)
          // console.log('设置后：', prevPageEle.style.webkitTransform, ';block: ', prevPageEle.style.display)
          // console.log('nextPageEle设置前：', nextPageEle.style.webkitTransform, ';block: ', nextPageEle.style.display)
          nextPageEle.style.display = 'block'
          this.translate(nextPageEle, pageWidth)
          // console.log('nextPageEle设置后：', nextPageEle.style.webkitTransform, ';block: ', nextPageEle.style.display)
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
          setTimeout(() => {
            // this.translate(currentPageEle, -pageWidth, this.speed, callback)
            this.translate(nextPageEle, 0, this.speed)
          }, 50);
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
