<template>
    <div>
      <UserDomains :userEmail="userEmail" v-if="userStatus" class="btnMainbtn" @pushDomain="(domainName) => this.domainName = domainName"/> 
    </div>
  <div class="HeaderChild">
    <div><img :src="require(`../components/images/logo.png`)" alt="not found"/></div>
    <p @click="$router.push('/')">Home</p>
    <p @click="$router.push('whois')"   v-bind:class="{ activHeader: HeaderPos == 'whois' }">Whois</p>
    <p @click="$router.push('analiz')"  v-bind:class="{ activHeader: HeaderPos == 'analiz' }">Analysis</p>
    <p @click="$router.push('news')"    v-bind:class="{ activHeader: HeaderPos == 'news' }">News</p>
    <AuthForm :ModView="'Child'"/>
  </div>
</template>

<script>

import AuthForm from './AuthForm.vue';
import UserDomains from '../components/UserDomains.vue';

export default {
  name: 'MainHeader',
  props: {
    HeaderPos: {
      type: String,
      default: ''
    },
  },
  components: {
    UserDomains,
    AuthForm,
},
data() {
      return {
          authForm: false,
          userStatus: false,
      };
    },
    methods: {
      StatusUserCheck(hideForm, uemail, ustatus){
        this.authForm = hideForm;
        this.userEmail = uemail;
        this.userStatus = ustatus;
        console.log(uemail);
      },
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
  z-index: 1;
  top: 0;
  left: 0;
  border-radius: 1.5vw;
  background: #bda496;
  height: min(4vw, 57px );
  width: 42vw;
  margin: 0.5vw 29vw;
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
  width: 7vw;
}

.HeaderChild p:hover{
  color: #fee8da;
}

</style>
