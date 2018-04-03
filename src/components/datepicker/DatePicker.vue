<template>
  <picker
    :itemHeight = "itemHeight"
    :visibleItemCount = "visibleItemCount"
    :className = "className"
    :columns = 'columns'
    @on-change="onChange"
  />
</template>
<script>
import Picker from '../picker2/picker'
export default {
  name: 'dv-date-picker',
  components: {
    Picker
  },
  props: {
    itemHeight: {
      type: Number,
      default: 40
    },
    className: String,
    visibleItemCount: {
      type: Number,
      default: 5
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    startYear: {
      type: Number,
      default: new Date().getFullYear()
    },
    endYear: Number
  },
  data () {
    return {
      columns : [{value: [2011, 2012, 2013, 2014]}, {value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}, {value: [1, 2]}]
    }
  },
  methods: {
    getMonthDay (year, month) {
      if (month === 2) {
        return this.isLeapYear(year) ? 29 : 28
      } else if ([4, 6, 9, 11].indexOf(month)) {
        return 30
      } else {
        return 31
      }
    },
    isLeapYear (year) {
      return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)
    },
    onChange (value) {
      console.log(value)
    },
    formatDate () {
      // let time = Date.now()
      // let o = {
      //   'y+': time.getFullYear(),
      //   'm+': time.getMonth() + 1,
      //   'd+': time.getDate(),
      //   'h+': time.getHours(),
      //   'M+': time.getMinutes(),
      //   's+': time.getSeconds()
      // }
    }
  }
}
</script>
