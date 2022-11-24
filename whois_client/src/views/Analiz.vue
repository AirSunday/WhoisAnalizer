<template>
<MainHeader :HeaderPos="'analiz'"></MainHeader>

    <div class="radios">
      <table>
        <td class="SortBy">
          Sort By:
        </td>
        <td>

          <table class="radioAll">
            <td>
              <button class="radio1" 
              v-bind:class="{ StatusRadioActiv: radioStatus == 1, StatusRadioNoActiv: !radioStatus != 2 }"
              @click="SortByData(); this.PageDomainInAnaliz = 1"
              >Release date</button>
            </td>
            <td>
              <button class="radio2" 
              v-bind:class="{ StatusRadioActiv: radioStatus == 2, StatusRadioNoActiv: radioStatus != 2 }"
              @click="SortByNs(); this.PageDomainInAnaliz = 1"
              >NS-Servers</button>
            </td>
            <td>
              <button class="radio3" 
              v-bind:class="{ StatusRadioActiv: radioStatus == 3, StatusRadioNoActiv: !radioStatus != 2 }"
              @click="SortByReg"
              >Registrant</button>
            </td>
          </table>

        </td>
      </table>

      <div class="AnalizMain">
        <table v-if="radioStatus == 1" class="TableAnaliz">
          <tr>
            <td>Domain name</td>
            <td>Age</td>
            <td>Release date</td>
            <td>NS-Servers</td>
            <td>Registrant</td>
          </tr>
          <tr v-for="(domainA,key) in domainsAnaliz10" :key="key">
              <td class="domenNameAnaliz"
                  @click="copy(domainA.domain_name)">
                    {{ domainA.domain_name }}</td>
              <td>{{ domainA.age }}</td>
              <td>{{ 22222 }}</td>
<!--            <td>{{ domainA.release_date.split('T')[0] }}</td>-->
              <td>
                <p> 22222 </p>
<!--                <p v-for="(nsServer,key) in domainA.ns_servers.split(' ')" :key="key"> {{ nsServer }} </p>-->
              </td>
              <td>{{ domainA.registrant }}</td>
          </tr>
        </table>

        <table v-if="radioStatus == 2" class="TableAnaliz">
          <tr>
            <td>NS-Servers</td>
            <td>Count</td>
          </tr>
          <tr v-for="(domainA,key) in nsServersAnaliz" :key="key">
            <td>{{ domainA.name }}</td>
            <td>{{ domainA.count }}</td>
          </tr>
        </table>

        <table v-if="radioStatus == 3" class="TableAnaliz">
          <tr>
            <td>Registrant</td>
            <td>Count</td>
          </tr>
          <tr v-for="(domainA,key) in registrantAnaliz" :key="key">
            <td>{{ domainA.name }}</td>
            <td>{{ domainA.count }}</td>
          </tr>
        </table>

        <table v-if="radioStatus != 3" class="NavigationAnaliz">
          <td @click="GoPage(-2)"> &lt;&lt; </td>
          <td @click="GoPage(-1)"> &lt; </td>
          <td>{{ PageDomainInAnaliz }}</td>
          <td @click="GoPage(1)"> &gt; </td>
          <td @click="GoPage(2)"> &gt;&gt; </td>
        </table>
      </div>

    </div>
</template>

<script>
import WhoisDataService from '../services/WhoisDataService';
import MainHeader from '../components/MainHeader.vue';

export default {
  name: 'AnalizMain',
  components: {
    MainHeader
  },
  data() {
    return {
      radioStatus: 1,
      PageDomainInAnaliz: 1,
      CountPage: 0,
      domainsAnaliz10: [],
      nsServersAnaliz: [],
      registrantAnaliz: [],
    };
  },
  created (){
    this.SortByData();
    this.PageDomainInAnaliz = 1;
  },
  methods: {
    GoPage(direction){
      if(direction == 1 && this.PageDomainInAnaliz < this.CountPage) this.PageDomainInAnaliz += 1;
      else if (direction == -1 && this.PageDomainInAnaliz > 1) this.PageDomainInAnaliz -= 1;
      else if (direction == -2) this.PageDomainInAnaliz = 1;
      else if (direction == 2) this.PageDomainInAnaliz = this.CountPage;
      if (this.radioStatus == 1) this.SortByData();
      else this.SortByNs();
    },
    SortByData() {
      WhoisDataService.GetCountDomain('domain')
          .then(response => {
            this.CountPage = Math.ceil(response.data[0].reg_count / 10);
      });
      this.radioStatus = 1;
      this.PageDomainInAnaliz = 1;
      WhoisDataService.get10(this.PageDomainInAnaliz)
          .then(response => {
            this.domainsAnaliz10 = response.data;
      });
    },
    SortByNs(){
      this.radioStatus = 2;
      WhoisDataService.GetCountDomain('nsservers')
          .then(response => {
            this.CountPage = Math.ceil(response.data[0].reg_count / 20);
      });
      this.PageDomainInAnaliz = 1;
      WhoisDataService.GetNsServers(this.PageDomainInAnaliz)
          .then(response => {
            this.nsServersAnaliz = response.data;
      });
    },
    SortByReg(){
      this.radioStatus = 3;
      this.PageDomainInAnaliz = 1;
      WhoisDataService.GetRegistrant()
          .then(response => {
            this.registrantAnaliz = response.data;
      });
    },
    copy(domain) {
      navigator.clipboard.writeText(domain)
          .then(() => {
            this.$refs.AddAlertMess.AddAlertMess({ status: true, message: 'Domain added to buffer' });
          })
          .catch(err => {
            // возможно, пользователь не дал разрешение на чтение данных из буфера обмена
            console.log('Something went wrong', err);
          });
    },
  }
}
</script>

<style scoped>
.NavigationAnaliz{
  margin: 1vw 2vw;
  width: 95%;
  border-collapse: collapse;
  text-align: center;
  font-size: calc(0.5em + 1vw);
}

.NavigationAnaliz td{
  width: 2vw;
}

.NavigationAnaliz td:hover{
  opacity: 0.2;
}

.TableAnaliz{
  margin: 0 2vw;
  width: 95%;
  border-collapse: collapse;
  font-size: calc(0.3em + 1vw);
}

.TableAnaliz td {
  border-bottom: 1px solid black;
  padding: 9px 8px;
  transition: .3s linear;
}

.TableAnaliz p{
  margin: 0;
}

.AnalizMain{
  opacity: 0.9;
  margin-top: 2vw;
  border: 2px solid #000;
  border-radius: 30px;
  background: #e3dad5;
  width: 90vw;
}

.domenNameAnaliz:hover {
  opacity: 0.3;
}

.SortBy{  
  font-size: calc(0.9em + 1vw);
  color: #caa28d;
  text-shadow: rgba(0, 0, 0, 0.456) 10px 5px 10px;
  padding-right: 0.5vw;
}

.radios{
  margin-top: 5vw;
}

.radioAll{
  background: #e3dad5;
  border-radius: 30px;
  opacity: 0.8;
  border: 2px solid #000;
}

.StatusRadioNoActiv {
    background: #89756b;
    color: #DDD;
}

.StatusRadioActiv{
  background: #e3dad5;
  color: #222;
}

.radioAll button{
  font-size: calc(0.2em + 1vw);
  border: none;
  padding: 5px;
}

.radio1 {
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  margin-left: 2px;
}
.radio3{
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  margin-right: 2px;  
}

.imgBack{
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
}

</style>