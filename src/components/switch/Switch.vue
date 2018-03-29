<template>
  <div class="uvue-switch"  @click="$emit('input', !value)" :class="{'uvue-switch-active': value}">
    <div class="uvue-switch-handle" :class="{uvueActive: value}"></div>
  </div>
</template>
<script>
export default {
  props: {
    value: Boolean
  }
}
</script>
<style>
.uvue-switch {
    position: relative;
    display: inline-block;
    width:60px;
    height:30px;
    border-radius: 20px;
    background-color: red;
}
.uvue-switch-active{
  background-color:green;
}
.uvue-switch-active:after{
  position: absolute;
  content:'OFF';
  width:22px;
  height: 30px;
  font-weight: 700;
  font-size:12px;
  line-height:30px;
  color:#fff;
  right:6px;
}
.uvue-switch::before {
    position: absolute;
    content: 'ON';
    width: 12px;
    height:30px;
    line-height: 30px;
    font-weight: 700;
    color:#fff;
    font-size:12px;
    left: 6px;
}
.uvue-switch-handle{
    width: 25px;
    height: 24px;
    position: absolute;
    background:#fff;
    border:1px solid #f0f0f0;
    border-radius: 50%;
    transition: .3s ease-in-out;
    top: 2px;
    right:1px;
}
.uvueActive{
  transform: translateX(-32px);
}
.uvueActive::before{
    position: absolute;
    content: 'OFF';
    width: 12px;
    height:30px;
    line-height: 30px;
    font-weight: 700;
    color:#fff;
    font-size:12px;
    left: 1px;
}
</style>

