<template>
    <div v-if="info.length > 0" class="blocksInfo">
        <table>
            <td v-if="pathImg.length > 0">
                <img :src="itemImage" class="myImg">
            </td>
            <td>
                <p>{{ typeName }}</p>
            </td>
        </table>

        <p v-for="(el, key) in info" :key="key">{{ el }}</p>
    </div>
</template>

<script>
// const WhoisCheckerAPI = `http://${window.location.hostname}:3001`
export default {
  name: 'BlockWithInfoAboutDomen',
  props: {
    info: {
      type: Array,
      default: null
    },
    typeName: {
      type: String,
      default: ''
    },
    pathImg: {
      type: String,
      default: ''
    }
  },
  computed: {
    itemImage () {
      if (!this.pathImg) {
        return
      }
      const fileName = this.pathImg.toLowerCase()
      return require(`./images/${fileName}.png`)
    }
  }
  // methods: {
  //   async allTrackd () {
  //     const data = {
  //       name: this.domenName
  //     }
  //     const res = await fetch(`${WhoisCheckerAPI}/api/v1/getinfo`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(data)
  //     })
  //     const newServer = await res.json()
  //   }
  // }
}
</script>

<style>
.blocksInfo {
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
}

.blocksInfo {
    margin-right: 10px;
    margin-left: 50px;
    margin-top: 30px;
    margin-bottom: 30px;
    padding-left: 10px;
    border-left: 4px solid #323232;
}

.blocksInfo p {
    margin: 0;
}

.infoDomen td {
    font-size: 30px;
}

.myImg {
   width: 60px;
   vertical-align: middle;
}

.infoDomen h1 {
    font-size: 300%;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 0 20px;
    border-radius: 20px;
}

</style>
