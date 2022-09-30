<template>
  
    <button @click="this.ShowUsers = !this.ShowUsers;; ShowUsersClick()" class="AddNewsBtn">Show Users</button>
    <button @click="ShowAddNews = !ShowAddNews" class="AddNewsBtn">Add News</button>
  
    <div v-show="ShowAddNews" class="AddNewsBlock">
      <div @click="ShowAddNews = false"></div>
      <input v-model="Title" type='text' placeholder='Title'/>
      <textarea v-model="Text" type='text' placeholder='Text'></textarea>
      <button @click="AddNews">Create</button>
    </div>
  
    <div v-show="ShowUsers" class="ShowUsersBlock">
        <table>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Role</td>
                <td>Delete</td>
            </tr>
            <tr v-for="(user,key) in ArrUser" :key="key">
                <td><label>{{ user.userId }}</label></td>
                <td><label>{{ user.name }}</label></td>
                <td><label>{{ user.email }}</label></td>
                <td><label @click="ChangeRole(key)" class="AdminClick"
                     v-bind:class="{'ThisAdmin': user.role == 'admin', 'ThisNotAdmin': user.role != 'admin'}">
                        {{ user.role == 'admin' ? '&#10003;' : '&#10006;' }}
                    </label></td>
                <td><p @click="DeleteUser(key)" class="AdminClick">&#128465;</p></td>
            </tr>
        </table>

        <table class="NavigationUsers">
            <td @click="GoPageAdmin(-2)"> &lt;&lt; </td>
            <td @click="GoPageAdmin(-1)"> &lt; </td>
            <td>{{ PageUsers }}</td>
            <td @click="GoPageAdmin(1)"> &gt; </td>
            <td @click="GoPageAdmin(2)"> &gt;&gt; </td>
        </table>
    </div>
  
  <AlertMessages ref="AddAlertMess"/>
  </template>
  
  <script>
    import WhoisDataService from '../services/WhoisDataService';
    import AlertMessages from './AlertMessages.vue';
  
  
  export default {
    name: 'AdminComponent',
    components: {
      AlertMessages
  },
    data() {
      return {
        ArrUser: [{}],
        PageUsers: 1,
        CountUser: 0,
        Text: '',
        Title: '',
        ShowAddNews: false,
        ShowUsers: false,
      }
    },
    created() {  
      WhoisDataService.GetCountUsers().then(res => {
        this.CountUser = Math.ceil(res.data[0].name_count / 10);
      }).catch(this.CountUser = 0);
    },
    methods: {
      GoPageAdmin(direction){
        if(direction == 1 && this.PageUsers < this.CountUser) this.PageUsers += 1;
        else if (direction == -1 && this.PageUsers > 1) this.PageUsers -= 1;
        else if (direction == -2) this.PageUsers = 1;
        else if (direction == 2) this.PageUsers = this.CountUser;
        this.ShowUsersClick();
      },
      AddNews(){
        if(this.Text == '' || this.Title == '') {
          this.$refs.AddAlertMess.AddAlertMess({ status: false, message: 'It is necessary to fill in all fields' });
          return;
        }
        WhoisDataService.CreateNews({ title: this.Title, text: this.Text })
          .then(res => {
            if(res.statusText == "OK") 
              this.$refs.AddAlertMess.AddAlertMess({ status: true, message: 'The addition was successful' });
          })
          this.Text = '';
          this.Title = '';
          this.ShowAddNews = false;
      },
      ShowUsersClick(){
        WhoisDataService.GetAllUsers(this.PageUsers)
            .then(res => {
                this.ArrUser = res.data;
            });
      },
      DeleteUser(key){
        WhoisDataService.DeleteUser( { userId: this.ArrUser[key].userId } )
            .then(res => {
                if(res.statusText == 'OK') {
                    this.$refs.AddAlertMess.AddAlertMess({ status: true, message: 'User Delete' });
                }
                else 
                    this.$refs.AddAlertMess.AddAlertMess({ status: false, message: 'ERROR! User dont Delete' });
                this.ShowUsersClick();
                WhoisDataService.GetCountUsers().then(res => {
                    this.CountUser = Math.ceil(res.data[0].name_count / 10);
                }).catch(this.CountUser = 0);
            });
      },
      ChangeRole(key){
        WhoisDataService.ChangeRole( { userId: this.ArrUser[key].userId } )
            .then(res => {
                if(res.statusText == 'OK') {
                    this.$refs.AddAlertMess.AddAlertMess({ status: true, message: 'Change role' });
                }
                else 
                    this.$refs.AddAlertMess.AddAlertMess({ status: false, message: 'ERROR! Dont Change role' });
                this.ShowUsersClick();
            });
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

.AdminClick {
    font-size: 3vw;
}

.AdminClick:hover {
    opacity: 0.5;
}

.AdminClick:active {
    opacity: 0.3;
}

.NavigationUsers{
  margin: 1vw 2vw;
  width: 95%;
  border-collapse: collapse;
  text-align: center;
  font-size: calc(0.5em + 1vw);
}

.NavigationUsers td{
  width: 2vw;
}

.NavigationUsers td:hover{
  opacity: 0.2;
}


.ShowUsersBlock{
    position: absolute;
    top: 7vw;
    width: 90vw;
    z-index: 4;
    background: #e3dad5;
    border-radius: 2vw;
    border: 2px solid #b8937e;
}

.ShowUsersBlock table{
  margin: 0 2vw;
  width: 95%;
  border-collapse: collapse;
  font-size: calc(0.5em + 1vw);
}

.ShowUsersBlock td {
  border-bottom: 1px solid black;
  padding: 9px 8px;
  transition: .3s linear;
}

.ShowUsersBlock p{
  margin: 0;
}

.ThisAdmin{
    color: green;
}

.ThisNotAdmin{
    color: red;
}

  .AddNewsBtn{
    background: #bda496;
    color: #FFF;
    border: none;
    border-radius: 30px;
    width: 7vw;
    height: 3vw;
    font-size: 1vw;
    margin: 1vw;
  }
  .AddNewsBtn:hover{
      opacity: 0.6;
      background: #EEE;
      color: #bda496;
  }
  
  .AddNewsBtn:active{
      opacity: 0.6;
      background: #FFF;
      color: #b8937e;
  }

  .AddNewsBlock{
    position: absolute;
    z-index: 2;
    top: 7vw;
    background: #e3dad5;
    width: 60%;
    height: 30vw;
    border: 2px solid #b8937e;
    border-radius: 2vw;
  }
  .AddNewsBlock input {
    position: absolute;
    top: 1vw;
    left: 1vw;
    padding-left: 20px;
    border-radius: 30px;
    border: 2px solid #b8937e;
    width: 30vw;
    margin-bottom: 2vw;
    height: 3vw;
    font-size: calc(0.2em + 1vw);
  }
  .AddNewsBlock textarea {
    position: absolute;
    left: 1vw;
    padding-left: 20px;
    border-radius: 2vw;
    border: 2px solid #b8937e;
    /* border-color: #b8937e; */
    margin-bottom: 2vw;
    height: 15vw;
    font-size: calc(0.2em + 1vw);
    top: 7vw; 
    width: 50vw;
    resize: none;
  }
  .AddNewsBlock button {
    position: absolute;
    right: 1vw;
    border-radius: 2vw;
    border: 2px solid #b8937e;
    /* border-color: #b8937e; */
    margin-bottom: 2vw;
    height: 3vw;
    font-size: calc(0.2em + 1vw);
    top: 25vw; 
    width: 8vw;
  }
  .AddNewsBlock button:hover{
    opacity: 0.6;
  }
  .AddNewsBlock button:active{
    opacity: 0.4;
  }
  </style>