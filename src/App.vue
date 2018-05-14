<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
*{
  padding:0;
  margin:0;
}
.dv-overflow-hidden{
  overflow:hidden;
}
html {
    -webkit-tap-highlight-color: transparent;
}
ul, li {
  list-style: none;
}
</style>
