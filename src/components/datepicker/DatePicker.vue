<template>
  <picker
    :itemHeight = "itemHeight"
    :visibleItemCount = "visibleItemCount"
    :className = "className"
    @on-change="onChange"
  />
</template>
<script>
import Picker from './picker2/picker'
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
      type: Number
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
      return year % 400 === 0 || (year % 100 !== 0 && year %4 === 0)
    },
    onChange (value) {
      console.log(value)
    }
  }
}
</script>
