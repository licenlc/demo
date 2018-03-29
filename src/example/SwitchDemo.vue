<template>
  <div class="hello">
    <!-- <div> -->
      <div style="padding: 10px;">
          <u-switch v-model="value"></u-switch>
      </div>
      <span>开关{{value}}</span>
    <!-- </div> -->
  </div>
</template>

<script>
import USwitch from '@/components/switch/Switch'
export default {
  components: {
    USwitch
  },
  data () {
    return {
      message: '',
      value: true
    }
  },
  watch: {
    'message': function (val) {
    }
  },
  created () {
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  /* margin: 0 10px; */
}
a {
  color: #42b983;
}
</style>
