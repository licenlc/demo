<template>
  <div class="home">
      <router-link tag="p" class="home-item" :to = "{path: 'input'}">Input</router-link>
      <router-link tag="p" class="home-item" :to = "{path: 'switch'}">switch</router-link>
      <router-link tag="p" class="home-item" :to = "{path: 'picker'}">picker</router-link>
      <router-link tag="p" class="home-item" :to = "{path: 'action'}">ac-sh</router-link>
      <router-link tag="p" class="home-item" :to = "{path: 'tab'}">tab</router-link>
      <router-link tag="p" class="home-item" :to = "{path: 'toast'}">toast</router-link>
      <router-link tag="p" class="home-item" :to = "{path: 'dialog'}">confirm</router-link>
  </div>
</template>
<style>
.home{
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    font-size:10px;
}
.home-item{
    width:32.33%;
    height:60px;
    /* font-size: 20px; */
    display: flex;
    justify-content: center;
    align-items: center;
    border:1px solid #26a2ff;
    font-size:14px;
}
</style>
