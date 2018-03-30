<template>
<transition name="actionsheet-float">
  <div class="dv-picker" v-show="value">
    <div class="dv-picker-cancle" @click="$emit('input', false)">取消</div>
    <section class="picker-titles" v-if="header.length > 0">
      <div class="picker-title" v-for="(item, index) in header" :key="index" v-text="item"></div>
    </section>
    <div class="dv-picker-content">
      <picker-column
        v-for = "(item, index) in currentColums"
        :key = "index"
        :options = "item.value" 
        :itemHeight = "itemHeight"
        :className = "item.className"
        :defaultIndex = "item.defaultIndex || defaultIndex"
        @on-item-change="onChange(index)"
        :visibleItemCount = "visibleItemCount"
      />
      <div class="picker-center"></div>

    </div>
    <div class="dv-picker-ok" @click="confirm">确定</div>
  </div>
</transition>
</template>

<script>
import PickerColumn from './PickerColumn'
import Popup from '../mixinx/popup'

export default {
  components: {
    PickerColumn
  },
  mixins: [Popup],
  props: {
    className: String,
    itemHeight: {
      type: Number,
      default: 40
    },
    header: {
      type: Array,
      default: () => []
    },
    visibleItemCount: {
      type: Number,
      default: 5
    },
    columns: {
      type: Array,
      default: () => []
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    overlay: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      curIndex: 0,
      currentColums: [],
      isSimple: false
    }
  },
  created () {
    this.initColumns()
  },
  methods: {
    initColumns () {
      // 这里待修改
      let columns = JSON.parse(JSON.stringify(this.columns))
      if (typeof columns[0] === 'string' || typeof columns[0] === 'number') {
      // if (!columns.value && !columns[0].value && columns.length > 0) {
        this.currentColums = [{value: columns}]
        this.isSimple = true
      } else {
        if (columns.length === 1 && columns[0].value) {
          this.currentColums = [{value: columns[0].value, defaultIndex: columns[0].defaultIndex || 0}]
          this.isSimple = true
        } else {
          for (let i in columns) {
            this.currentColums.push({value: columns[i].value, efaultIndex: columns[0].defaultIndex || 0})
            this.isSimple = false
          }
        }
      }
    },
    onChange (index, b) {
      console.log('父元素：', index, b)
      console.log(this.$children[index].currentIndex)
      this.curIndex = index
      if (this.isSimple) {
        // console.log('simple-on-change:', index)
        this.$emit('on-change', this.columns[index])
      } else {
        this.$emit('on-change', this, this.curIndex)
      }
    },
    confirm () {
      this.$emit('input', false)
      this.$emit('on-ok', this.curIndex)
    }
  }
}
</script>
<style>
.dv-picker{
  cursor: pointer;
  position: fixed;
  right:0;
  left:0;
  bottom: 0;
  text-align: center;
  font-size: 14px;
  background: #fff;
}
.dv-picker-content{
  display:flex;
  position: relative;
}
.picker-titles {
  display: flex;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
}
.picker-title{
  flex: 1;
  padding: 5px 0;
}
.dv-picker-cancle {
  text-align: right;
  line-height:30px;
  padding: 5px;
  padding-right: 30px;
  color: #26a2ff;
  /* margin-right: 20px; */
  border-bottom: 1px solid #f0f0f0;
}
.dv-picker-ok {
  padding: 10px;
  border-top: 1px solid #f0f0f0;
}
.picker-center{
  position: absolute;
  top: 50%;
  height: 38px;
  width: 100%;
  transform: translateY(-50%);
  border-top: 1px solid red;
  border-bottom: 1px solid red;
  pointer-events: none;
}
.actionsheet-float-enter-active, .actionsheet-float-leave-active {
  transition:300ms ease-out;
}
.actionsheet-float-enter-to, .actionsheet-float-leave{
  transform: translateY(0);
  opacity: 1;
}
.actionsheet-float-enter, .actionsheet-float-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
