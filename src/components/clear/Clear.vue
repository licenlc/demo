<template>
  <div class="dv-clear">
  </div>
</template>

<style>
.dv-clear{
    display: inline-block;
    position: relative;
    border:2px solid #f8f8f8;
    border-radius: 50%;
    width: 40px;
    height: 40px;
}
.dv-clear::before{
    width: 2px;
    height:36px;
    position: absolute;
    top: 2px;
    left: 50%;
}
.dv-clear::after{
    width: 2px;
    height:36px;
    position: absolute;
    top: 2px;
    left: 50%;
}
</style>
