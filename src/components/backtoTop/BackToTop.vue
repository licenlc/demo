<template>
  <div class="dv-backto-top" v-show="visible" @click="toTop" >
  </div>
</template>

<script>
export default {
  name: 'dv-backto-top',
  props: {
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
    let winHeight = window.innerHeight
    let req = false
    window.addEventListener('scroll', () => {
      if (req) {
        return
      }
      req = true
      window.requestAnimationFrame(() => {
        req = false
        console.log((document.documentElement.scrollTop || document.body.scrollTop), (winHeight * this.screenNum))
        if ((document.documentElement.scrollTop || document.body.scrollTop) > (winHeight * this.screenNum)) {
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
