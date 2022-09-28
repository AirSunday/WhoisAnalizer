<template>
  <div>
   <div class="titleWhois">
     <img src="./images/back.png">
        <!-- <p id="titleWhois">{{ titleWhois }}</p> -->
    </div>
    <button class="floating-btn" id="domens-btn" @click="pushCardDomen">Domens</button>
    <DomenCard v-show="showCardDomen" :domens="domens" :userid="userid"/>
    <div class="inputBlock">
        <label for="domen"></label>
        <input type="text"
            placeholder="write domen`s name"
            v-model="domenName">
        <button type="submit" v-on:click="pushBtn">
            <img src="./images/loup.png" width="30" style="padding-top: 10px;">
        </button>
        <div v-if="all.info.length > 0">
            <h1>{{domenNameTemp}}</h1>
            <button class="btnAddDomen" @click="trackDomen">Track domen</button>
            <BlockWithInfo :info="status.info" :typeName="status.type" />
            <BlockWithInfo :info="date.info" :typeName="date.type" :pathImg="date.path" />
            <BlockWithInfo :info="registrant.info" :typeName="registrant.type" :pathImg="registrant.path" />
            <BlockWithInfo :info="admin.info" :typeName="admin.type" :pathImg="admin.path" />
            <BlockWithInfo :info="tech.info" :typeName="tech.type" :pathImg="tech.path" />
            <BlockWithInfo :info="all.info" :typeName="all.type" />
        </div>
    </div>
  </div>
</template>
<script>
import Axios from 'axios'
import Authentication from '@/components/pages/Authentication'
const WhoisCheckerAPI = `http://${window.location.hostname}:3001`
export default {
  name: 'Home',
  components: {
    BlockWithInfo: () => import('./BlockWithInfoAboutDomen'),
    DomenCard: () => import('./DomenCard')
  },
  data () {
    return {
      users: [],
      titleWhois: 'WHOIS CHECKER',
      domenName: '',
      domenNameTemp: '',
      status: { info: [], type: 'Status', path: '' },
      all: { info: [], type: 'All', path: '' },
      date: { info: [], type: 'Date', path: 'date' },
      registrant: { info: [], type: 'Registrant', path: 'person' },
      admin: { info: [], type: 'Admin', path: 'admin' },
      tech: { info: [], type: 'Tech', path: 'tech' },
      email: '',
      domens: [],
      showLoginModal: false,
      showCardDomen: false,
      userid: this.$cookie.get('user_id')
    }
  },
  mounted () {
    this.getAllUsers()
    // this.updateDomen()
  },
  methods: {
    getAllUsers () {
      Axios.get(`${WhoisCheckerAPI}/api/v1/nowuser`, {
        headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
        params: { user_id: this.$cookie.get('user_id') }
      }).then(({data}) => (this.users = data))
    },
    async pushBtn () {
      const data = {
        name: this.domenName
      }
      const res = await fetch(`${WhoisCheckerAPI}/api/v1/getinfo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const newServer = await res.json()
      this.domenNameTemp = this.domenName
      this.domenName = ''

      this.all.info = []
      this.status.info = []
      this.date.info = []
      this.registrant.info = []
      this.admin.info = []
      this.tech.info = []
      this.all.info = newServer.split('\n')
      this.all.info.forEach(element => {
        if (element.indexOf('Date') >= 0) { this.date.info.push(element.replace('Date', '')) } else if (element.indexOf('Registrant') >= 0) { this.registrant.info.push(element.replace('Registrant', '')) } else if (element.indexOf('Admin') >= 0) { this.admin.info.push(element.replace('Admin', '')) } else if (element.indexOf('Tech') >= 0) { this.tech.info.push(element.replace('Tech', '')) } else if (element.indexOf('Status') >= 0 || element.indexOf('state') >= 0) { this.status.info.push(element) } else if (element.indexOf('No entries found for the selected source(s).') >= 0 ||
                         element.indexOf('No match for domain') >= 0 ||
                         element.indexOf('ERROR') >= 0 ||
                         element.indexOf('NOT FOUND') >= 0 ||
                         element.indexOf('not found') >= 0) {
          this.all.info = ['NOT FOUND']
        }
      })
      if (this.all.info.length < 2) {
        this.status.info = []
        this.date.info = []
        this.registrant.info = []
        this.admin.info = []
        this.tech.info = []
      }
    },
    pushCardDomen () {
      if (this.domens.length === 0) this.updateDomen()
      this.showCardDomen = !this.showCardDomen
    },
    async updateDomen () {
      const data = {
        id: this.userid
      }
      const res = await fetch(`${WhoisCheckerAPI}/api/v1/alltrack`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      this.domens = await res.json()
    },
    async trackDomen () {
      let temp = true
      this.domens.forEach(el => {
        if (el.domenname === this.domenNameTemp) temp = false
      })
      if (temp) {
        const data = {
          id: this.userid,
          domenname: this.domenNameTemp
        }
        await fetch(`${WhoisCheckerAPI}/api/v1/track`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        this.domens.push({domenname: this.domenNameTemp})
      }
    }
  }
}
</script>

<style>

body{
    left: 0;
    background-color: #BC986A;
}
.titleWhois img {
  margin: 0;
  padding: 0;
  max-width: 100%;
  height: auto;
  left: 0;
  position: fixed;
}

.inputBlock {
    background-color: #e9deb5;
    box-shadow: 4px 4px 14px rgba(0,0,0,0.25);
    border: 2px solid #323232;
    margin-top: 35%;
    margin-right: 10px;
    margin-left: 10px;
    padding: 10px 0 10px 10px;
    width: 96%;
    border-radius: 20px;
    left: 0;
    position: absolute;
    opacity: 98%;
}

.inputBlock input {
    width: 87%;
    box-sizing: border-box;
    border: none;
    background: transparent;
    border-bottom: 1px solid #ccc;
    color: #323232;
    padding: 10px 0 10px;
    outline: none;
    font-family: inherit;
    font-size: 23px;
}

.inputBlock label {
    width: 87%;
    box-sizing: border-box;
    border: none;
    background: transparent;
    border-bottom: 1px solid #ccc;
    color: #323232;
    padding: 10px 0 10px;
    outline: none;
    font-family: inherit;
    font-size: 23px;
}

.inputBlock button {
    background: #323232;
    margin-right: 10px;
    float:right;
    font-size: 20px;
    border: none;
    cursor: pointer;
    width: 8%;
    height: 50px;
    border-radius: 20px;
    color: #e9deb5;
}

.inputBlock button:hover{
    opacity: 0.8;
    background: #c9bf9e;
    color: #323232;
}

.floating-btn {
    position: fixed;
    z-index:  2;
    background: #323232;
    color: #e9deb5;
    border: none;
    border-radius: 50%;
    width: 63px;
    height: 63px;
}

.floating-btn:hover{
    opacity: 0.8;
    background: #c9bf9e;
    color: #323232;
}
#domens-btn {
    bottom: 50px;
    right: 130px;
}
</style>
