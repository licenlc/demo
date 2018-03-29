<template>
  <div>
    <ul class="slider-img-container" ref="container" style="width:375px;">
      <li class="slider-img" v-for = "(item, index) in imgListCurrent" :style="item.style">
        <img :src="item.src" style="width: 375px;"/>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'SliderImg',
  props: {
    imgList: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      windHeight: window.innerHeight,
      windWidth: window.innerWidth,
      imgListCurrent: [],
      transformList: [],
      index: 0,
      width: {width: this.windHeight}
    }
  },
  watch: {
    imgListCurrent: {
      handler: function (newValue, oldValue) {
        console.log('data:', JSON.stringify(newValue))
        this.imgListCurrent = newValue
      },
      deep: true
    }
  },
  methods: {
    toNext () {

    },
    handeEvent () {
      // 触摸起点
      let startX = 0
      // 偏移量
      let offsetX = 0
      let startHander = (event) => {
        startX = event.touches[0].pageX
        console.log(startX)
        offsetX = 0
      }
      let moveHander = (event) => {
        offsetX = event.touches[0].pageX - startX
        console.log(offsetX)
        if (this.index >= 0 && offsetX <= 0) {
          this.imgListCurrent[this.index].style = {transform: `translate3d(${offsetX}px, 0px, 0px)`}
          console.log(JSON.stringify(this.imgListCurrent))
        } else {
        }
      }
      let endHander = (event) => {
        let endX = event.changedTouches[0].pageX
        console.log(this.windWidth / 6)
        if ((endX - startX) < -(this.windWidth / 6)) {
          console.log('到下一个页面')
        } else if ((endX - startX) > (this.windWidth / 6)) {
          console.log('到上一个页面')
        }
      }
      this.$refs.container.addEventListener('touchstart', startHander)
      this.$refs.container.addEventListener('touchend', endHander)
      this.$refs.container.addEventListener('touchmove', moveHander)
    },
    init () {
      this.imgListCurrent = this.imgList.map((item, index) => {
        let x = `${index * this.windWidth}px`
        item.style = {transform: `translate3d(${x}, 0px,0px)`}
        return item
      })
    }
  },
  mounted () {
    this.$refs.container.style.height = `${this.windHeight}px`
    this.init()
    this.handeEvent()
  }
}
</script>
<<style>
.slider-img-container{
  /* width:100%; */
  display:flex;
  align-items:center;
  overflow:hidden;
  position:absolute;
  /* justify-content: center; */
  font-size:0;
  position:relative;
}
.slider-img-wrap{
  width:100%;
  position:absolute;
  left:0;
}
img{
  width:100%;
  width:320px;
}
</style>


