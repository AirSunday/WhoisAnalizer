<template>

  <MainHeader :HeaderPos="'home'"></MainHeader>

  <div class="HeaderMain">
    <p class="HeaderMainP">Whois</p>
    <p class="HeaderMainP" style="top: 15vw">Analiz</p>
    <div class="ScrollPage">
      <p>Scroll Page</p>
      <div class="arrow">
        <span></span>
        <span></span>
      </div>
      <div class="emptyScroll"></div>
    </div>

    <div class="PanelInfo panel1" v-bind:style="{ top: top1 + '%' }">
      <div @click="$router.push('whois')" class="GoTo GoToWhois">
        <span>Whois</span>
        <p>Find out the whois of the domain name and track its release</p>
      </div>
      <img :src="require(`@/components/images/pc3.png`)" alt="not found" class="backPC"/>
      <img :src="require(`@/components/images/pc2.png`)" alt="not found" class="PC"/>
      <img :src="require(`@/components/images/pc1.png`)" alt="not found" class="PC"/>
    </div>

    <div class="PanelInfo panel2" v-bind:style="{ top: top2 + '%' }">
      <div @click="$router.push('analiz')" class="GoTo GoToAnaliz">
        <span>Analysis</span>
        <p>Take a look at the distribution of domains by Registrars, NS-servers and by release date</p>
      </div>
      <img :src="require(`@/components/images/analiz2.png`)" alt="not found" class="analizImg"/>
      <img :src="require(`@/components/images/analiz.png`)" alt="not found" class="analizImg"/>
    </div>

    <div class="PanelInfo panel3" v-bind:style="{ top: top3 + '%' }">
      <div @click="$router.push('news')" class="GoTo GoToNews">
        <span>News</span>
        <p>Find out the latest news on the project</p>
      </div>
      <img :src="require(`@/components/images/news2.png`)" alt="not found" class="newsBackImg"/>
      <img :src="require(`@/components/images/news.png`)" alt="not found" class="newsImg"/>
    </div>

    <div class="PanelInfo panel4" v-bind:style="{ top: top4 + '%' }">
      <table>
        <tr>
          <td>
            <a href="https://github.com/AirSunday/WhoisCheckerAll.git">
              <img :src="require(`@/components/images/githubRep.png`)" alt="not found"/>
            </a>
          </td>
          <td>
            <a href="https://github.com/AirSunday">
              <img :src="require(`@/components/images/githubAcc.png`)" alt="not found"/>
            </a>
          </td>
          <td>
            <p>airsunday2001@gmail.com</p>
          </td>
        </tr>

        <tr>
          <td>Project repository on Github</td>
          <td>My Github profile</td>
          <td>Contact Email</td>
        </tr>

      </table>
    </div>

  </div>
  <AlertMessages ref="AddAlertMess"/>
</template>

<script>

import {debounce} from '@/services/debounce';
import MainHeader from './MainHeader.vue';
import AlertMessages from "@/components/AlertMessages";

export default {
  name: 'HomeMain',
  data() {
    return {
      top1: 93,
      top2: 94,
      top3: 95,
      top4: 96,
      scrollPos: 0,
      yDown: null,
    }
  },
  components: { MainHeader, AlertMessages },
  created() {
    const debounceScrollHeader = debounce(this.scrollHeader, 300);
    const debounceHandleTouchStart = debounce(this.handleTouchStart, 300);
    const debounceHandleTouchMove = debounce(this.handleTouchMove, 300);
    window.addEventListener("wheel", (event) => { debounceScrollHeader(event) });
    window.addEventListener("touchstart", (event) => { debounceHandleTouchStart(event) });
    window.addEventListener("touchmove", (event) => { debounceHandleTouchMove(event) });
  },
  methods: {

    swapPage(){
      this.CanSwap = true;
    },
    getTouches(evt) {
      return evt.touches;
    },
    handleTouchStart (event) {
      const firstTouch = this.getTouches(event)[0];
      this.yDown = firstTouch.clientY;
    },
    handleTouchMove(event) {
      if ( ! this.yDown ) {
        return;
      }
      const yUp = event.touches[0].clientY;
      const yDiff = this.yDown - yUp;
      if ( yDiff > 0 ) {
        if(this.top1 === 93) this.top1 = 10;
        else if(this.top2 === 94) this.top2 = 12;
        else if(this.top3 === 95) this.top3 = 14;
        else if(this.top4 === 96) this.top4 = 77;
      } else {
        if(this.top4 !== 96) this.top4 = 96;
        else if(this.top3 !== 95) this.top3 = 95;
        else if(this.top2 !== 94) this.top2 = 94;
        else if(this.top1 !== 93) this.top1 = 93;
      }
      this.yDown = null;
    },
    scrollHeader(event) {
      if(event.deltaY > 0){
        if(this.top1 === 93) this.top1 = 10;
        else if(this.top2 === 94) this.top2 = 12;
        else if(this.top3 === 95) this.top3 = 14;
        else if(this.top4 === 96) this.top4 = 77;
      }
      else{
        if(this.top4 !== 96) this.top4 = 96;
        else if(this.top3 !== 95) this.top3 = 95;
        else if(this.top2 !== 94) this.top2 = 94;
        else if(this.top1 !== 93) this.top1 = 93;
      }
    },
  }
}
</script>

<style scoped>
.ScrollPage{
  position: fixed;
  top: 60%;
  right: 40%;
  z-index: -1;
}

.ScrollPage p{
  font-size: 5vw;
  margin: 0;
  color: rgb(215, 199, 175);
  opacity: 0.5;
}

.emptyScroll{
  width: 100%;
  height: 9vh;
}

.arrow{
  opacity: 0.5;
  position: fixed;
  top: 80%;
  right: 45%;
  transform: translate(-50%,-50%);
}
.arrow span{
  display: block;
  width: 5vw;
  height: 5vw;
  border-bottom: 0.5vw solid rgb(215, 199, 175);
  border-right: 0.5vw solid rgb(215, 199, 175);
  transform: rotate(45deg);
  animation: animate 2s infinite;
}
.arrow span:nth-child(2){
  animation-delay: -0.2s;
}
@keyframes animate {
  0%{
    opacity: 0;
    transform: rotate(45deg) translate(-20px,-20px);
  }
  50%{
    opacity: 1;
  }
  100%{
    opacity: 0;
    transform: rotate(45deg) translate(20px,20px);
  }
}

.GoToAnaliz{
  color: #bda496;
  left: 56.5vw;
}

.GoToWhois{
  color: #bda496;
  left: 5vw;
}

.GoToNews{
  color: #bda496;
  left: 5vw;
}

@media only screen and (max-width: 560px)  {
  .GoToAnaliz{
    width: 40vw;
  }

  .GoToWhois{
    width: 40vw;
  }

  .GoToNews{
    width: 82vw;
  }
}

.GoTo{
  background: linear-gradient(0deg, #EECFBA, 2%, #fff5ef);
  margin: 1vw;
  top: 20vw;
  height: 18vw;
  width: 25vw;
  position: relative;
  border-radius: 2vw;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  box-shadow: -6px -6px 10px rgba(255, 255, 255, 0.8),
  6px 6px 10px rgba(0, 0, 0, 0.1);
}

.GoTo span {
  font-family: "Montserrat", Impact;
  font-size: 5vw;
  font-weight: semibold;
  margin-left: 2vw;
}

.GoTo p{
  font-family: "Montserrat", sans-serif;
  font-size: 2vw;
  font-weight: semibold;
  margin: 1vw;
}

.GoTo:hover{
  opacity: 0.3;
  box-shadow: -6px -6px 10px rgba(255, 255, 255, 0.8),
  6px 6px 10px rgba(0, 0, 0, 0.2);
}

.GoTo:active{
  opacity: 1;
  box-shadow: inset -4px -4px 8px rgba(255, 255, 255, 0.5),
  inset 8px 8px 16px rgba(0, 0, 0, 0.1);
  color: #a4e0c7;
}

.HeaderMainP{
  position: fixed;
  z-index: -1;
  font-family: Niagara Solid,serif;
  font-size: 15vw;
  margin: 0 0 0 10vw;
  color: #bda496;
}

.PanelInfo{
  position: fixed;
  box-shadow: 0 -10px 100px rgba(0, 0, 0, 0.2);
  border-radius: calc(0.5vw + 20px);
  background: linear-gradient(0deg, #EECFBA, #FFF);
  transition-duration: 1s;
}

.panel1{
  left: 3vw;
  width: 88vw;
  height: 86vh;
}

.panel2{
  left: 2.5vw;
  width: 89vw;
  height: 84vh;
}

.panel3{
  left: 2vw;
  width: 90vw;
  height: 82vh;
}

.panel4{
  left: 1.5vw;
  width: 91vw;
  height: 20vh;
  background: linear-gradient(0deg, #EECFBA, 30%, #FFF);
}

.panel1 img{
  height: auto;
  position: absolute;
}

.PC{
  width: 38vw;
  left: 40vw;
  top: 10vw;
}

.backPC{
  width: 48vw;
  left: 31vw;
  top: 2vw;
}

.panel2 img {
  height: auto;
  position: absolute;
}

.analizImg{
  width: 40vw;
  left: 2vw;
  top: 3vw;
}

.panel3 img {
  height: auto;
  position: absolute;
}

.newsImg{
  left: 38vw;
  width: 38vw;
  top: 18vw;
}

.newsBackImg{
  left: 33vw;
  width: 48vw;
  top: 2vw;
}

.panel4 table{
  position: absolute;
  bottom: 2vw;
  text-align: center;
  color: #a08063;
  font-family: "Montserrat", sans-serif;
  font-size: max(1vw, 7px);
  font-weight: semibold;
}

.panel4 td{
  width: 30vw;
}

.panel4 p{
  font-size: max(1.5vw, 15px);
}

.panel4 img{
  height: auto;
  width: 5vw;
  min-width: 70px;
}

</style>
