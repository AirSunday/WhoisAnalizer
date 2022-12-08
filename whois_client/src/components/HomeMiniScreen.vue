<template>
  <AuthForm :ModView="'Main'"/>

  <div class="HeaderMain">
    <p class="HeaderMainP">Whois</p>
    <p class="HeaderMainP" style="top: 15vw">Analiz</p>

 <div class="GoToAll">

      <div @click="$router.push('analiz')" class="GoTo LongPanel">
        <div class="HeaderPanel"><span>{{ $t("home.Analysis") }}</span></div>
        <p>{{ $t("home.Analysis_Info") }}</p>
      </div>

     <div @click="$router.push('whois')" class="GoTo ShortPanel">
       <div class="HeaderPanel"><span>{{ $t("home.Whois") }}</span></div>
       <p>{{ $t("home.Whois_Info") }}</p>
     </div>

     <div @click="$router.push('news')" class="GoTo ShortPanel">
       <div class="HeaderPanel"><span>{{ $t("home.News") }}</span></div>
       <p>{{ $t("home.News_Info") }}</p>
     </div>

      <div>
          <a class="LinkInPanel" href="https://github.com/AirSunday/WhoisAnalizer">
          <div class="AboutPanels LongPanel">
            <div class="LeftPanelInAboutPanels">{{ $t("home.Project") }}</div>
            <div class="RightPanelInAboutPanels"><p>{{ $t("home.Repository") }}</p></div>
          </div>
        </a>
        <a class="LinkInPanel" href="https://github.com/AirSunday">
         <div class="AboutPanels LongPanel">
           <div class="LeftPanelInAboutPanels">{{ $t("home.Github") }}</div>
             <div class="RightPanelInAboutPanels"><p>{{ $t("home.ProfileGithub") }}</p></div>
         </div>
        </a>
         <div class="AboutPanels LongPanel" @click="copy">
           <div class="LeftPanelInAboutPanels">{{ $t("home.Contact") }}</div>
           <div class="RightPanelInAboutPanels">
             <p>airsunday2001@gmail.com</p>
           </div>
         </div>
      </div>

 </div>
    </div>

  <AlertMessages ref="AddAlertMess"/>
</template>

<script>
import AlertMessages from './AlertMessages.vue';
import AuthForm from './AuthForm';
// import i18n from '@/plugins/i18n.js';

export default {
  name: 'HomeMain',
  data() {
    return {

    }
  },
  components: {
    AlertMessages, AuthForm
  },
  created() {},
  methods: {
    copy() {
      navigator.clipboard.writeText('airsunday2001@gmail.com')
          .then(() => {
            this.$refs.AddAlertMess.AddAlertMess({ status: true, message: this.$t("alert.t_Mail_Add_To_Buf") });
          })
          .catch(() => {
            // возможно, пользователь не дал разрешение на чтение данных из буфера обмена
            this.$refs.AddAlertMess.AddAlertMess({ status: true, message: this.$t("alert.f_Oops") });
          });
    }
  },
}
</script>

<style scoped>

.GoToAll{
  margin: 0;
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  top: 30vw;
  width: 100vw;
}

.LongPanel{
  width: 60vw;
}

.ShortPanel{
  width: 30vw;
}

.RightPanelInAboutPanels{
  width: 75%;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0  0 0 1vw;
}

.RightPanelInAboutPanels p {
  margin: 0;
  padding: 0;
}

.LeftPanelInAboutPanels{
  display: flex;
  align-items: center;
  color: var(--color-dark);
  font-family: "Montserrat", Impact, serif;
  font-size: 4vw;
  width: 25%;
  height: 100%;
  background: var(--color-light);
  border-radius: 5vw 0 0 5vw;
  padding: 0  0 0 1vw;
}

.AboutPanels{
  height: 6vw;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  color: var(--color-light);
  border-radius: 5vw;
  margin: 2vw;
  font-family: "Montserrat", sans-serif;
  font-size: 3vw;
  text-align: center;
  background: var(--color-dark);
}

.GoTo{
  height: 24vw;
  cursor: pointer;
  color: var(--color-light);
  border-radius: 5vw;
  margin: 2vw;
  background: var(--color-dark);
}

.GoTo span {
  font-family: "Montserrat", Impact;
  font-size: 8vw;
}

.GoTo p{
  font-family: "Montserrat", sans-serif;
  font-size: 3vw;
  margin: 1vw;
}

.GoTo img {
  width: 10vw;
  height: auto;
}

.HeaderMainP{
  position: fixed;
  z-index: -1;
  font-family: Niagara Solid,serif;
  font-size: 15vw;
  margin: 0 0 0 10vw;
  color: #bda496;
}

.HeaderPanel{
  text-align: center;
  color: var(--color-dark);
  background: var(--color-light);
  border-radius: 5vw 5vw 0 0;
}

.LinkInPanel{
  text-decoration: none;
}

.GoTo:hover, .AboutPanels:hover{
  opacity: 0.8;
}

.GoTo:active, .AboutPanels:active{
  opacity: 1;
  box-shadow: inset -4px -4px 8px rgba(255, 255, 255, 0.5),
  inset 8px 8px 16px rgba(0, 0, 0, 0.1);
  color: #a4e0c7;
}

@media (max-width: 750px) {
  .LongPanel{
    width: 90vw;
  }

  .ShortPanel{
    width: 90vw;
  }

  .GoTo{
    height: 20vw;
  }

  .LeftPanelInAboutPanels{
    width: 15%;
  }
}
</style>
