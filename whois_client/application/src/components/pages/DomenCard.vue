<template>
  <div class="card">
    <p v-if="domens.length == 0" class="emptyList">List of monitored domains is empty</p>
    <table class="tracks" v-if="domens != null">
      <tr v-for="(domen,key) in domens" :key="key">
        <td>{{ domen.domenname }}</td>
        <td><button class="deleteBtn" @click="deleteTrack(key)">x</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
// import {mapGetters, mapActions} from 'vuex'
const WhoisCheckerAPI = `http://${window.location.hostname}:3001`
export default {
  name: 'DomenCard',
  props: {
    domens: {
      type: Array,
      default: null
    },
    userid: {
      type: String,
      default: ''
    }
  },
  methods: {
    async deleteTrack (key) {
      const data = {
        id: this.userid,
        domenname: this.domens[key].domenname
      }
      await fetch(`${WhoisCheckerAPI}/api/v1/deletetrack`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      this.domens.splice(key, 1)
    }
  }
}
</script>

<style>
.card {
    /* width: 200px;
    height: 400px; */
    background: red;
    z-index: 3;
    position: fixed;
    right: 10px;
    border-radius: 20px;
    border: 2px solid #323232;
    background-color: #e9deb5;
    color: #323232;
    bottom: 120px;
}

.tracks {
  padding: 30px;
}

.deleteBtn {
  background-color: red;
  width: 20px;
  border-radius: 100%;
}

.emptyList {
  padding: 30px;
}
</style>
