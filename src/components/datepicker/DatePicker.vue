<template>
  <picker
    :value="value"
    :itemHeight = "itemHeight"
    :visibleItemCount = "visibleItemCount"
    :className = "className"
    :columns = 'columns'
    @on-change = "onChange"
    :header = "['年', '月', '日']"
    @on-ok="confirm"
    @click="$emit('input', false)"
  />
</template>
<script>
import Picker from '../picker2/picker'
import Popup from '../mixinx/popup'

const currentYear = new Date().getFullYear()
export default {
  name: 'dv-date-picker',
  components: {
    Picker
  },
  mixins: [Popup],
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
      default: currentYear
    },
    endYear: Number,
    overlay: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      currentYear: this.startYear,
      currentMonth: 1,
      curDate: 1
    }
  },
  computed: {
    columns () {
      let month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      let startYear = this.startYear - 5
      let endYear = this.endYear || this.startYear + 5
      let days = this.getDays(this.currentYear, this.currentMonth)
      let years = []
      for (let i = startYear ; i <= endYear ; i++) {
        years.push(i)
      }
      let day = []
      for (let i = 1 ; i <= days ; i++) {
        day.push(i)
      }
      if (this.curDate > days) {
        this.$children[0].$children.defaultIndex = day.length - 1
        console.log(this.$children[0].$children.defaultIndex)
        console.log(JSON.stringify([{value: years}, {value: month}, {value: day, defaultIndex: day.length - 1}]))
        return [{value: years}, {value: month}, {value: day, defaultIndex: day.length - 1}]
      } else {
        return [{value: years}, {value: month}, {value: day}]
      }
    }
  },
  methods: {
    getDays (year, month) {
      if (month === 2) {
        return this.isLeapYear(year) ? 29 : 28
      } else if ([4, 6, 9, 11].indexOf(month) > -1) {
        return 30
      } else {
        return 31
      }
    },
    isLeapYear (year) {
      return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)
    },
    onChange (value) {
      this.currentYear = this.columns[0].value[value[0]]
      this.currentMonth = this.columns[1].value[value[1]]
      this.curDate = this.columns[2].value[value[2]]
    },
    formatDate () {
    },
    confirm () {
      this.$emit('input', false)
    }
  }
}
</script>
