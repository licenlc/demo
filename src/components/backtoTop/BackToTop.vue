<template>
  <div class="dv-backto-top" v-show="visible">
  </div>
</template>

<script>
export default {
  name: 'dv-backto-top',
  prop: {
    bottom: {
      type: [Number, String],
      default: 20
    },
    right: {
      type: [Number, String],
      default: 20
    },
    screenNum: {
      type: Number,
      default: 0.5
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    toTop () {
      document.documentElement.scrollTop = document.body.scrollTop = 0
      this.visible = false
    }
  },
  mounted () {
    const win = window
    let winHeight = window.innerHeight
    let heightInfo = winHeight * this.screenNum
    let req = false
    win.addEventListener('scroll', () => {
      if (req) {
        return
      }
      req = true
      requestAnimationFrame(() => {
        req = false
        if ((document.documentElement.scrollTop || document.body.scrollTop) > (heightInfo)) {
          this.visible = true
        } else {
          this.visible = false
        }
      })
    })
  }
}
</script>

<style>
.dv-backto-top{
  position:fixed;
  bottom: 80px;
  right: 20px;
  height: 40px;
  width: 40px;
  background-color: red;
  border-radius: 50%;
}
</style>
