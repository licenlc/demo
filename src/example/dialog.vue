<template>
    <div style="text-align:center;padding-top:10px;">
      <dv-btn @click="value = !value" size="small" style="font-size:12px;">点击弹出dialog</dv-btn>
      <btn @click="okFunc" size="small" style="font-size:12px;">点击弹出dialog</btn>
      <dv-dialog v-model="value" @on-ok="okFunc" title="标题" content="内容">
      </dv-dialog>
    </div>
</template>

<script>
import DvDialog from '@/components/dialog/Dialog'
// import Btn from '@/components/button/Button'
export default {
  components: {
    DvDialog
    // Btn
  },
  data () {
    return {
      value: false
    }
  },
  methods: {
    okFunc () {
      // this.$dialog
      console.log(this.$dialog.alert({}))
      console.log('ok')
    }
  }
}
</script>
