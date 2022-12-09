<template>
<div class="AllMessage">
    <div v-for="(statAlert,key) in StatusAlertArray" :key="key">
      <div v-if="statAlert.status" class="AlertMessage AlertSucc">
        &#10003;
        <span>{{ statAlert.message }}</span>
      </div>

      <div v-else class="AlertMessage AlertWarn">
        &#9888;
        <span>{{ statAlert.message }}</span>
      </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'AlertMessages',
  data() {
    return{
      StatusAlertArray: [],
    }
  },
   methods: {
    AddAlertMess(mess){
      this.StatusAlertArray.push(mess);
      setTimeout(() => { this.StatusAlertArray.shift() }, 3000);
    }
   }
}
</script>

<style scoped>

.AllMessage {
  position: fixed;
  bottom: 0;
  right: 2px;
  width: 100%;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
}

.AlertSucc{
    background-color: rgba(157, 230, 157, 0.727);
    border: solid 2px rgb(147, 236, 147);
    color: rgb(39, 197, 39);
}

.AlertWarn{
    background-color: rgba(230, 157, 157, 0.727);
    border: solid 2px rgb(236, 147, 147);
    color: rgb(214, 80, 80)
}

.AlertMessage{
    margin: 0.5vw 1.5vw;
    font-size: max(2vw, 30px);
    border-radius: 20px;
    opacity: 0.8;
    padding: 0.5vw 1vw;
    display: flex;
    align-items: center
}

.AlertMessage span{
  font-family: "Montserrat", sans-serif;
  font-size:max(2vw, 15px);
  margin-left: 1vw;
}

</style>
