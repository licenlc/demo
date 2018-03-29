<template>
  <a class="uvue-cell" :href="href">
    <div class="uvue-cell-wrapper">
      <div class="uvue-cell-title">
        <slot name="title">
          <span class="uvue-cell-text" v-text="title"></span>
        </slot>
      </div>
    </div>
    <div class="uvue-cell-right">
      <slot name="right"></slot>
    </div>
  </a>
</template>

<script>
export default {
  name: 'uvue-cell',
  props: {
    to: [String, Object],
    title: String
  },
  computed: {
    href() {
      console.log('lujing')
    }
  }
}
</script>
