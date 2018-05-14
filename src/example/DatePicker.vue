<template>
  <div class="hello">
    <div style="text-align:center;padding-top:10px;">
      <btn @click="datePickerInfo= !datePickerInfo">点击弹出时间</btn>
    </div>
    <date-picker v-model="datePickerInfo" />
  </div>
</template>

<script>
import Picker2 from '@/components/picker2/Picker'
import DatePicker from '@/components/datepicker/DatePicker'
import Btn from '@/components/button/Button'
export default {
  components: {
    Picker2,
    DatePicker,
    Btn
  },
  data () {
    return {
      datePickerInfo: false,
    }
  },
  methods: {
    getValue (index) {
      console.log('confirm结果:', this.options[index])
    }
  }
}
</script>

