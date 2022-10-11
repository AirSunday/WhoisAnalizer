<template>
  <img :src="require(`./components/images/back.png`)" alt="not found" class="imgBack"/>
  <router-view></router-view>

</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
.imgBack{
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  height: auto;
}
</style>
