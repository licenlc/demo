<template>
    <div style="text-align:center;padding-top:10px;">
      <button @click="value = !value" size="small" style="font-size:12px;">点击弹出dialog</button>
      <button @click="okFunc" size="small" style="font-size:12px;">点击弹出dialog</button>
      <!-- <dv-dialog v-model="value" @on-ok="okFunc" title="标题" content="内容">
      </dv-dialog> -->
    </div>
</template>

<script>
export default {
  data () {
    return {
      value: false
    }
  },
  methods: {
    okFunc () {
      this.$dialog.alert(
        {
          title: '测试dialog',
          content: '内容测试好的打底裤',
          success: () => {
            console.log('callback=======')
          }
        }
      )
    }
  }
}
</script>
