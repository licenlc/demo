<template>
  <div class="hello">
    <div style="text-align:center;padding-top:10px;">
      <btn @click="showPicker= !showPicker">点击picker</btn>
      <btn @click="setLocal">setLocal</btn>
    </div>
    <picker2 v-model = "showPicker" :columns="options" @on-ok="getValue"/>
  </div>
</template>

<script>
import Picker2 from '@/components/picker2/Picker'
import Btn from '@/components/button/Button'
export default {
  components: {
    Picker2,
    Btn
  },
  data () {
    return {
      options: [],
      showPicker: false
    }
  },
  created () {
    window.addEventListener('storage', () => {
      console.log('页面传==递数据')
    })
    let arr = []
    for (let i = 1; i < 67 ; i++) {
      arr.push(`测试${i}测试`)
    }
    // window.localStorage.setItem('key', '121212')
    this.options = arr
    // for (let i = 1; i < 17 ; i++) {
    //   this.list.push({text: `测试${i}测试`, value: i})
    // }
    // this.options = [{value: [10, 12, 13, 14, 15, 16, 17, 18, 19, 110, 111, 112, 113, 114], defaultIndex: 3}]
    // this.options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    // this.options = ['内蒙古自内蒙古自治区内蒙古自治区内蒙古自治区内蒙古自治区治区', '北京', '上海', '深圳', '广州', '武汉', '长沙', '南昌', '南京', '杭州', '宁波', '义乌', '成都', '西藏']
    // this.options = [{value: ['北京', '上海', '深圳', '广州', '武汉'], defaultIndex: 2}]
    // this.options = [{value: [{id: '1', value: 'text 1'}, {id: '2', value: 'text 2'}, {id: '3', value: 'text 3'}, {id: '4', value: 'text 4'}], defaultIndex: 3}]
    // this.options.push({value: [{id: '4', value: '测试 1'}, {id: '5', value: '测试 2'}, {id: '6', value: '测试 6'}, {id: '7', value: '测试 7'}], defaultIndex: 3})
    // this.options = [{value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}
    // {value: ['北京', '上海', '深圳', '广州', '武汉', '长沙', '南昌', '南京', '杭州', '宁波', '义乌', '成都', '西藏', '内蒙古自治区']}]
  },
  methods: {
    getValue (index) {
      console.log('==============================结果======================')
      console.log('index:', index, 'confirm结果:', this.options[index])
      console.log('==============================结果=====================')
    },
    setLocal () {
      window.localStorage.setItem('key', 1)
    }
  }
}
</script>

<style scoped>
.hello {
  height: 100px;
}
</style>
