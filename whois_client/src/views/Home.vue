<template>
  <HomeBigScreen v-if="width > 1000"/>
  <HomeMiniScreen v-else/>
</template>
    
<script>
    import HomeBigScreen from "@/components/HomeBigScreen";
    import HomeMiniScreen from "@/components/HomeMiniScreen";

    export default {
      name: 'HomeMain',
      components: {
        HomeMiniScreen,
        HomeBigScreen,
    },
      data() {
        return {
          width: window.innerWidth,
        }
      },
      created() {
        window.addEventListener('resize', this.updateWidth);
      },
      methods: {
        updateWidth() {
          this.width = window.innerWidth;
        },
      }
    }
    </script>
    
    <style scoped>
    </style>
    