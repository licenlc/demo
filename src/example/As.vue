<template>
  <div>
      <div style="text-align:center;padding-top:10px;">
        <!-- <btn @click="curValue = !curValue">点击弹出actionSheet</btn> -->
        <btn @click="curValue3 = !curValue3">点击弹出actionSheet2</btn>
        <!-- <btn @click="curValue2 = !curValue2" style="margin-top:10px;">没有取消按钮的</btn> -->
      </div>
      <!-- <action-sheet :actions="actions" :show="curValue" @item-click="onChange"></action-sheet> -->
      <!-- <action-sheet :actions="actions" :show="curValue3" :show-cancel=false  @item-click="onChange2"></action-sheet> -->
      <action-sheet2 :actions="actions" v-model="curValue3"  @item-click="onChange2"></action-sheet2>
      <!-- <div class="page-actionsheet-wrapper">
      </div> -->
  </div>
</template>
<script>
// import ActionSheet from '@/components/actionsheet/ActionSheet'
import ActionSheet2 from '@/components/actionsheet/ActionSheet2'
import Btn from '@/components/button/Button'
export default {
  components: {
    // ActionSheet,
    ActionSheet2,
    Btn
  },
  data () {
    return {
      // actions: [],
      curValue: false,
      curValue2: false,
      curValue3: false,
      sheetVisible: false,
      sheetVisible2: false,
      actions: [],
      actions2: []
    }
  },
  created () {
    // for (let i = 0; i < 4; i++) {
    //   this.actions.push({name: `确定${i}`})
    // }
  },
  methods: {
    onChange (index) {
      console.log('onChange:', index)
      this.curValue = false
    },
    onChange2 (index) {
      console.log('onChange2:', index)
      this.curValue2 = false
    }
  },
  mounted () {
    this.actions = [{
      name: '拍照',
      method: this.takePhoto
    }, {
      name: '从相册中选择',
      method: this.openAlbum
    }]
    this.actions2 = [{
      name: '确定'
    }, {
      name: '返回上一步',
      method: this.goBack
    }]
  }
}
</script>

