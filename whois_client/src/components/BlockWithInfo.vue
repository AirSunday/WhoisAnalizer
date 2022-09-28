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
}
</script>

<style>
.blocksInfo {
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    font-size: calc(0.3em + 1vw);
}

.blocksInfo {
    margin-left: 1vw;
    margin-top: 30px;
    margin-bottom: 30px;
    padding-left: 10px;
    border-left: 4px solid #323232;
}

.blocksInfo p {
    margin: 0;
}

.myImg {
   width: 5vw;
   vertical-align: middle;
}

</style>
