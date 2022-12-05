<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
body {
    background-image: var(--bg-i); /* Путь к фоновому изображению */
    background-color: var(--bg); /* Цвет фона */
   }

:root {
  --bg: #f9f9f8;
  --color-light: #f6ddcd;
  --color-dark: #bda496;
  --color-dark-font: #1b1917;
  --color-light-font: #f9f9f8;
  --bg-i: url('./components/images/back.png');
  --progress: #b26e00;
}

html.dark {
  --bg: #1b1917;
  --color-dark-font: #f9f9f8;
  --color-light-font: #1b1917;
  --color-light: #bda496;
  --color-dark: #282623;
  --bg-i: url('./components/images/back-dark.png');
  --progress: #f6ddcd;
}

#nprogress .bar {
  background: var(--progress) !important;
}

</style>
