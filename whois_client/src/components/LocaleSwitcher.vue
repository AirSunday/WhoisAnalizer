<template>
  <div class="LocaleSwitcher">
    <select v-model="$i18n.locale">
      <option v-for="(locale, i) in locales" :key="`locale-${i}`" :value="locale">
        {{ locale }}
      </option>
    </select>
    <div class="label-text">{{ $t('localeSwitcher.Language') }}</div>
  </div>

</template>

<script>
export default {
  name: "LocaleSwitcher",
  data() {
    return { locales: ["ru", "en"] };
  }
};
</script>

<style scoped>
.LocaleSwitcher {
  position: absolute;
  bottom: 50px;
  left: 10px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: var(--color-dark-font);
}

.LocaleSwitcher select {
  width: 60px;
}

.label-text {
  margin-left: 16px;
}
</style>
