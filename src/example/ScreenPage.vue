<template>
  <div class="dt-screen-page" :style="style" ref="screenDOM">
      <div class="dt-item item1" >
        <span>page1</span>
        <span class="dv-down"></span>
      </div>
      <div class="dt-item item2">
        <span>page2</span>
        <span class="dv-down"></span>
      </div>
      <div class="dt-item item3">
        <span>page2</span>
        <span class="dv-down"></span>
      </div>
  </div>
</template>
<script>
export default {
  name: 'dv-screen-page',
  computed: {
    style () {
      return [{
        height: `${window.innerHeight}px`
      }]
    }
  },
  data () {
    return {
      dragStart: true,
      startY: 0,
      endY: 0,
      index: 0,
      DOMitems: []
    }
  },
  mounted () {
    // this.handleEvent()
    this.DOMitems = document.querySelectorAll('.dt-item')
  },
  watch: {
    'index': function (value) {
      console.log(value)
    }
  },
  methods: {
    handleEvent () {
      this.$refs.screenDOM.addEventListener('touchstart', this.handleStart)
      this.$refs.screenDOM.addEventListener('touchend', this.handleEnd)
      this.$refs.screenDOM.addEventListener('touchmove', this.handleMove)
    },
    handleEnd (event) {
      let result = this.endY - this.startY
      if (result < -80 && (this.index + 1) < this.DOMitems.length) {
        this.DOMitems[this.index].style.cssText = `transform: translate3d(0, -100%, 0)`
        this.DOMitems[this.index + 1].style.cssText = `transform: translate3d(0, 0, 0)`
        this.index = this.index + 1
      } else if (result > 80 && (this.index - 1) >= 0) {
        this.DOMitems[this.index].style.cssText = `transform: translate3d(0, 100%, 0)`
        this.DOMitems[this.index - 1].style.cssText = `transform: translate3d(0, 0, 0)`
        this.index = this.index - 1
      }
      this.startY = 0
      this.endY = 0
    },
    handleStart (event) {
      if (!this.dragStart) {
        return
      }
      this.startY = event.touches[0].clientY
    },
    handleMove (event) {
      let moveY = event.touches[0].clientY
      this.endY = moveY
      let scale = (Math.abs(this.endY - this.startY)) / 40
      if (scale <= 0.8) {
        scale = 0.8
      }
      console.log(this.endY - this.startY)
      // this.DOMitems[this.index].style.cssText = `transform: translate3d(0, 0, -${Math.abs(this.endY - this.startY)}px) scale(${scale})`
    }
  }
}
</script>

<style>
.dt-screen-page{
  width:100%;
  position: relative;
  overflow: hidden;
}
.dt-screen-page div:not(:first-child) {
  transform: translate3d(0, 100%, 0);
}

.dt-item{
  top:0;
  left:0;
  overflow: hidden;
  width: 100%;
  height:100%;
  min-height: 667px;
  position: absolute;
  transition: all 500ms;
}
.item1{
  background-color: green;
  height: 800px;
}
.item2{
  background-color: yellow;
}
.item3{
  background-color: red;
}
.dv-down{
  position: absolute;
  left: 50%;
  bottom: 20px;
  width: 20px;
  height: 20px;
  border-left: 2px solid #5a584e;
  border-bottom: 2px solid #5a584e;
  z-index: 1;
  transform:rotate(-45deg) translateX(-50%);
  animation:fadeIn 1.5s .2s infinite;
}
@keyframes fadeIn {
  0%{
    opacity: 0;
    transform: translateY(-30px) rotate(-45deg) translateX(-50%);
  }
  100%{
    opacity: 1;
    transform: translateY(0) rotate(-45deg) translateX(-50%);
  }
}
</style>
