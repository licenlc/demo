<template>
  <div class="hello">
    <div style="text-align:center;padding-top:10px;">
      <btn @click="showPicker2= !showPicker2">点击弹出picker</btn>
      <btn @click="datePickerInfo= !datePickerInfo">点击弹出时间</btn>
    </div>
    <picker :list = "list" v-model="showPicker" @confirm="getValue"/>
    <picker2 :columns="options" v-model="showPicker2" @on-ok="getValue"/>
    <date-picker v-model="datePickerInfo"/>
  </div>
</template>

<script>
import Picker from '@/components/picker/Picker'
import Picker2 from '@/components/picker2/Picker'
import DatePicker from '@/components/datepicker/DatePicker'
import Btn from '@/components/button/Button'
export default {
  components: {
    Picker,
    Picker2,
    DatePicker,
    Btn
  },
  data () {
    return {
      list: [],
      showPicker: false,
      showPicker2: true,
      datePickerInfo: true,
      options: []
    }
  },
  created () {
    // for (let i = 1; i < 17 ; i++) {
    //   this.list.push({text: `测试${i}测试`, value: i})
    // }
    // this.options = [{value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], defaultIndex: 3}]
    // this.options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    this.options = ['内蒙古自内蒙古自治区内蒙古自治区内蒙古自治区内蒙古自治区治区', '北京', '上海', '深圳', '广州', '武汉', '长沙', '南昌', '南京', '杭州', '宁波', '义乌', '成都', '西藏']
    // this.options = [{value: ['北京', '上海', '深圳', '广州', '武汉'], defaultIndex: 2}]
    // this.options = [{value: [{id: '1', value: 'text 1'}, {id: '2', value: 'text 2'}, {id: '3', value: 'text 3'}, {id: '4', value: 'text 4'}], defaultIndex: 3}]
    // this.options.push({value: [{id: '4', value: 'text 4'}, {id: '5', value: 'text 5'}, {id: '6', value: 'text 6'}, {id: '7', value: 'text 7'}], defaultIndex: 3})
    // this.options = [{value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]},
    // {value: ['北京', '上海', '深圳', '广州', '武汉', '长沙', '南昌', '南京', '杭州', '宁波', '义乌', '成都', '西藏', '内蒙古自治区']}]
  },
  methods: {
    getValue (index) {
      console.log('confirm结果:', this.options[index])
    }
  }
}
</script>

<style scoped>
</style>
