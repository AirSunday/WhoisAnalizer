<template>
  <div class="HelpCard"
       @click="ChangeHelpCard"
       v-bind:style="{ right: rightCard + 'px' }">
    <p class="HelpWord">{{ $t("help.Help") }}</p>
    <div class="HelpText">
      <div v-if="ModHelp === 'analiz'">
        <p> {{ $t("help.Analiz_Help1") }} </p>
        <p> {{ $t("help.Analiz_Help2") }} </p>
      </div>
      <div v-if="ModHelp === 'news'">
        <p> {{ $t("help.News_Help1") }} </p>
        <p> {{ $t("help.News_Help2") }} </p>
      </div>
      <div v-if="ModHelp === 'whois'">
        <p> {{ $t("help.Whois_Help1") }} </p>
        <p> {{ $t("help.Whois_Help2") }} </p>
        <p> {{ $t("help.Whois_Help3") }} </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "HelpComponent",
  data() {
    return {
      rightCard: -300,
    };
  },
  props: {
    ModHelp: {
      type: String,
      default: ""
    }
  },
  created() {

  },
  methods: {
    ChangeHelpCard(){
      if(this.rightCard === 10) this.rightCard = -300;
      else this.rightCard = 10;
    }
  }
}
</script>

<style scoped>
.HelpCard{
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: flex;
  color: #FFF;
  font-size: 20px;
  box-shadow: 0 -10px 100px rgba(0, 0, 0, 0.2);
  background: none;
  transition-duration: 1s;
}

.HelpWord {
  position: absolute;
  font-size: max(20px, 2vw);
  writing-mode: vertical-rl;
  transform: scale(-1);
  background: var(--color-dark);
  margin: 0;
  padding: 25px 2px;
  border-radius: 0 10px 10px 0;
  height: auto;
  text-align: center;
  vertical-align: middle;
  bottom: 0;
  left: min(-20px, -2.5vw);
}
.HelpText {
  width: 300px;
  border-radius: 10px 10px 10px 0;
  background-color: var(--color-dark);
}

.HelpText p {
  text-align: justify;
  margin: 30px;
}
</style>
