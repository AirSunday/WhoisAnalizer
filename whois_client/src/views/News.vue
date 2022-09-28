<template>
  <img :src="require(`../components/images/back.png`)" alt="not found" class="imgBack"/>
  <MainHeader :HeaderPos="'news'"></MainHeader>
<div>News</div>
</template>

<script>
  import MainHeader from '../components/MainHeader.vue';


export default {
  name: 'NewsMain',
  components: {
    MainHeader
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.imgBack{
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
}
</style>