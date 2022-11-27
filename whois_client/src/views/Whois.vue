<template>
  <MainHeader :HeaderPos="'whois'"></MainHeader>
    <div class="InfoMain">
      <div class="inputBlock">
          <input type="text"
              placeholder="write domen`s name"
              v-model="domainName">
          <button class="SearchBtn" type="submit" v-on:click="GetHoisInfo">
              <img src="../components/images/loup.png" class="imgSearch">
          </button>
          <div v-if="all.info.length > 0">
              <button v-if="authId != 0" class="btnAddDomen" @click="trackDomen">Track domen</button>
              <h1 style="font-size: 5vw">{{domenNameTemp}}</h1>
              <BlockWithInfo :info="status.info" :typeName="status.type" />
              <BlockWithInfo :info="date.info" :typeName="date.type" :pathImg="date.path" />
              <BlockWithInfo :info="registrant.info" :typeName="registrant.type" :pathImg="registrant.path" />
              <BlockWithInfo :info="admin.info" :typeName="admin.type" :pathImg="admin.path" />
              <BlockWithInfo :info="tech.info" :typeName="tech.type" :pathImg="tech.path" />
              <BlockWithInfo :info="all.info" :typeName="all.type" />
          </div>
      </div>
    </div>
  <AlertMessages ref="AddAlertMess"/>
  </template>
  
  <script>
  import BlockWithInfo from '../components/BlockWithInfo.vue';
  import WhoisDataService from '../services/WhoisDataService';
  import MainHeader from '../components/MainHeader.vue';
  import AlertMessages from '@/components/AlertMessages.vue';
  
  export default {
  name: 'WhoisMain',
  components: {
    BlockWithInfo,
    MainHeader,
    AlertMessages
},
    data() {
      return {
          width: window.innerWidth,
          domainName: "",
          domenNameTemp: "", 
          status: { info: [], type: 'Status', path: '' },
          all: { info: [], type: 'All', path: '' },
          date: { info: [], type: 'Date', path: 'date' },
          registrant: { info: [], type: 'Registrant', path: 'person' },
          admin: { info: [], type: 'Admin', path: 'admin' },
          tech: { info: [], type: 'Tech', path: 'tech' },
          userStatus: false,
          userEmail: '',
          authId: '',
      };
    },
    methods: {
        CheckSessionWhois(){
          WhoisDataService.FindSession().then(response => {
            if(response && response.data.userId != 0){
              this.authId = response.data.userId;
            }
            else{
              this.authId = 0;
            }
          });
      },
      trackDomen(){
        WhoisDataService.GetDomain( { userId: this.authId } )
            .then(response => {
              if(response.data.domains.split(' ').length >= 5)
                this.$refs.AddAlertMess.AddAlertMess({ status: false, message: 'You cannot add more than 5 domains' });
              else
                if(response.data.domains.indexOf(this.domenNameTemp) == -1){
                  WhoisDataService.AddDomain({ userId: this.authId, domainName: this.domenNameTemp})
                    .then(res=> {
                      if(res.statusText == "OK")
                        this.$refs.AddAlertMess.AddAlertMess({ status: true, message: 'The domain is being tracked' });
                      this.CheckSessionWhois();
                    })
                    .catch(() => {
                        this.AddAlert({ status: false, message: 'Oops... something went wrong' });
                    })
                }
                else 
                  this.$refs.AddAlertMess.AddAlertMess({ status: false, message: 'Are you already tracking this domain' });
            })
            .catch(() => {
                this.AddAlert({ status: false, message: 'Oops... something went wrong' });
            })
      },
        updateWidth() {
          this.width = window.innerWidth;
        },
        GetHoisInfo() {
          var data = {
            name: this.domainName,
          };
          WhoisDataService.getWhoisInfo(data)
             .then(response => {
               console.log(response)
              const newServer = response.data;
              this.domenNameTemp = this.domainName;
              this.domenName = '';
              this.all.info = [];
              this.status.info = [];
              this.date.info = [];
              this.registrant.info = [];
              this.admin.info = [];
              this.tech.info = [];
              this.all.info = newServer.split('\n');
              this.all.info.forEach(element => {
                if (element.indexOf('Date') >= 0) { this.date.info.push(element.replace('Date', '')); } 
                else if ( element.indexOf('Registrant') >= 0) { this.registrant.info.push(element.replace('Registrant', '')); } 
                else if ( element.indexOf('Admin') >= 0) { this.admin.info.push(element.replace('Admin', '')); } 
                else if ( element.indexOf('Tech') >= 0) { this.tech.info.push(element.replace('Tech', '')); } 
                else if ( element.indexOf('Status') >= 0 || element.indexOf('state') >= 0) { this.status.info.push(element); } 
                else if ( element.indexOf('No entries found for the selected source(s).') >= 0 ||
                          element.indexOf('No match for domain') >= 0 ||
                          element.indexOf('ERROR') >= 0 ||
                          element.indexOf('NOT FOUND') >= 0 ||
                          element.indexOf('not found') >= 0) {
                            this.all.info = ['NOT FOUND'];
                          }
              })
              if (this.all.info.length < 2) {
                this.status.info = [];
                this.date.info = [];
                this.registrant.info = [];
                this.admin.info = [];
                this.tech.info = [];
              }
            })
      },
    },
    created() {
      this.CheckSessionWhois();
      window.addEventListener("resize", this.updateWidth);
    },
  }
  </script>
  
  <style>

  .InfoMain{
      position: absolute;
      left: 3vw;
      opacity: 0.9;
  }
  
  .inputBlock {
    color: #2a1b14;
      background-color: #e3dad5;
      box-shadow: 4px 4px 14px rgba(0,0,0,0.25);
      border: 2px solid #000;
      margin-top: 5%;
      margin-right: auto;
      margin-left: auto;
      padding: 0.5vw 0 1vw 1vw;
      width: 85vw;
      min-height: 20px;
      border-radius: 3vw;
  }
  
  
  .inputBlock input {
      width: 75vw;
      box-sizing: border-box;
      border: none;
      background: transparent;
      border-bottom: 2px solid #000;
      color: #000;
      outline: none;
      font-family: inherit;
      font-size: 2vw;
  }
  
  @media only screen and (max-width: 501px)  {
    .inputBlock input{
      width: calc(100% - 60px);
    }
  }
  
  .SearchBtn {
      background: #bda496;
      float:right;
      border: none;
      cursor: pointer;
      width: 8vw;
      min-width: 40px;
      height: 3.3vw;
      min-height: 20px;
      margin-right: 10px;
      border-radius: 4vw;
      color: #DDD;
  }
  
.imgSearch{
  margin-top: 0.3vw;
  width: 2.5vw;
  min-width: 15px;
}

  .inputBlock button:hover{
      opacity: 0.4;
  }
  
  .inputBlock button:active{
      opacity: 0.6;
  }
  
  .btnAddDomen{
    background: #bda496;
    margin-right: 3vw;
    padding: 1vw 1vw;
    float:right;
    border: none;
    cursor: pointer;
    width: 20vw;
    max-width: 200px;
    font-size: calc(0.5em + 1vw);
    height: auto;
    border-radius: 2vw;
    color: #FFF;
  }

  .imgBack{
      position: fixed;
      left: 0;
      top: 0;
      z-index: -1;
    }
  </style>
  