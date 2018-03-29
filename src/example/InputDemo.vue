<template>
  <div class="hello">
    <div>
      <input-label label="姓名" labelWidth="90" align="right">
          <Input placeholder="请输入姓名" v-model="name" maxlength="11" @input="handleInput" @blur="Blur"/>
      </input-label>
      <input-label label="不可编辑">
          <Input placeholder="内容不可编辑" :disabled="true"/>
      </input-label>
      <input-label label="电话号码">
          <Input label="电话号码不" v-model="telephone" placeholder="请输入电话号码" state="true"/>
      </input-label>
      <Input placeholder="请输入电话号码" type="tel" maxlength="11"/>
      <div style="text-align:center;">
        <btn  style="margin-top:20px;" @click="getValue">确定</btn>
      </div>
    </div>
  </div>
</template>

<script>
import Input from '@/components/input/Input'
import InputLabel from '@/components/input/InputLabel'
import Btn from '@/components/button/Button'
export default {
  components: {
    Input,
    InputLabel,
    Btn
  },
  data () {
    return {
      name: '',
      disableDemo: '不可编辑',
      telephone: ''
    }
  },
  watch: {
    name: function (val, oldValue) {
      this.name = val.replace(/\D/gi, '')
    }
  },
  created () {
  },
  methods: {
    getValue () {
      this.name = this.name + '89'
      console.log('name:', this.name)
    },
    handleInput (val) {
      console.log('$emit_input', val)
      this.name = val
    },
    Blur (e) {
      console.log(e)
    }
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
