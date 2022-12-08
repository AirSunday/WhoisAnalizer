<template>
  <div class="HeaderChild">
    <div><img :src="require(`../components/images/logo.png`)" alt="not found"/></div>
    <p @click="$router.push('/')"       v-bind:class="{ activHeader: HeaderPos == 'home' }">{{ $t("mainHeader.Home") }}</p>
    <p @click="$router.push('whois')"   v-bind:class="{ activHeader: HeaderPos == 'whois' }">{{ $t("mainHeader.Whois") }}</p>
    <p @click="$router.push('analiz')"  v-bind:class="{ activHeader: HeaderPos == 'analiz' }">{{ $t("mainHeader.Analysis") }}</p>
    <p @click="$router.push('news')"    v-bind:class="{ activHeader: HeaderPos == 'news' }">{{ $t("mainHeader.News") }}</p>
    <AuthForm :ModView="'Header'"/>
  </div>
</template>

<script>

import AuthForm from './AuthForm.vue';

export default {
  name: 'MainHeader',
  props: {
    HeaderPos: {
      type: String,
      default: ''
    },
  },
  components: {
    AuthForm,
},
data() {
      return {
          authForm: false,
          userStatus: false,
      };
    },
}
</script>

<style scoped>

.activHeader{
  color: #dbcec8;
  text-decoration: underline #dbcec8;
  text-underline-offset: 4px;
}

.HeaderChild{
  color: #FFF;
  position: fixed;
  display: flex;
  justify-content: space-between;
  z-index: 1;
  top: 0;
  left: 0;
  border-radius: 1.5vw;
  background: var(--color-dark);
  height: min(4vw, 57px );
  width: auto;
  margin: 0.5vw 30vw;
  padding: 0 10px;
  opacity: 0.93;
  align-items: center;
}

.HeaderChild div {
  width: 7vw;
}

.HeaderChild img{
  width: min(4vw, 40px);
  height: min(4vw, 40px);
  margin-left: min(1.5vw, 40px);
  margin-right: min(1.5vw, 40px);
}

.HeaderChild p {
  text-align: center;
  font-size: min(2vw, 25px);
  font-family: "Montserrat", sans-serif;
  margin: 0 1vw;
}

.HeaderChild p:hover{
  color: #fee8da;
}

</style>
