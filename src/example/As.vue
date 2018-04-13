<template>
  <div>
      <div style="text-align:center;padding-top:10px;">
        <btn @click="curValue3 = !curValue3">点击弹出actionSheet2</btn>
        <btn @click="curValue2 = !curValue2" style="margin-top:10px;">没有取消按钮的</btn>
      </div>
      <action-sheet :actions="actions" v-model = "curValue2" :show-cancel=false />
      <action-sheet :actions="actions" v-model = "curValue3"/>
  </div>
</template>
<script>
import ActionSheet from '@/components/actionsheet/ActionSheet'
import Btn from '@/components/button/Button'
export default {
  components: {
    ActionSheet,
    Btn
  },
  data () {
    return {
      curValue2: false,
      curValue3: false,
      actions: []
    }
  },
  methods: {
  },
  mounted () {
    this.actions = [{
      name: '拍照',
      method: this.takePhoto
    }, {
      name: '从相册中选择',
      method: this.openAlbum
    }]
  }
}
</script>

