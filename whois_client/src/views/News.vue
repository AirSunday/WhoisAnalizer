<template>
  <Admin v-if="Role == 'admin'"/>

  <div class="newsAll">
    <div class="card" v-for="(news,key) in ArrNews" :key="key">
      <div style="display: flex; justify-content: space-between;">
        <h3>{{news.title}}</h3>
        <h5>{{news.updatedAt.split('T')[0]}}</h5>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <p v-if="!ShowText || !(ShowTextKey == key)">{{news.preview}}...</p>
        <span v-if="!ShowText || !(ShowTextKey == key)" @click="ReadMore(key)">Read More</span>
      </div>
      <div v-if="ShowText && ShowTextKey == key" class="TextMore"> {{Text}} </div>
    </div>
  </div>

  <table class="NavigationNews">
    <td @click="GoPageNews(-2)"> &lt;&lt; </td>
    <td @click="GoPageNews(-1)"> &lt; </td>
    <td>{{ PageNews }}</td>
    <td @click="GoPageNews(1)"> &gt; </td>
    <td @click="GoPageNews(2)"> &gt;&gt; </td>
  </table>

  <MainHeader :HeaderPos="'news'"></MainHeader>
  <AlertMessages ref="AddAlertMess"/>
</template>

<script>
  import MainHeader from '../components/MainHeader.vue';
  import WhoisDataService from '../services/WhoisDataService';
import AlertMessages from '../components/AlertMessages.vue';
import Admin from '../components/Admin.vue';


export default {
  name: 'NewsMain',
  components: {
    MainHeader,
    AlertMessages,
    Admin
},
  data() {
    return {
      ArrNews: [],
      PageNews: 1,
      CountNewsInPage: 1,
      CountNews: 0,
      countNewsOnPage: 0,
      Role: 'user',
      Text: '',
      ShowText: false,
      ShowTextKey: 0,
    }
  },
  created() {
    this.CheckSessionWhois();

    this.GetCountNews();

    // window.addEventListener('resize', this.GetNewsOnPage);
    this.GetNewsOnPage();
  },
  methods: {
    CheckSessionWhois(){
      WhoisDataService.FindSession()
        .then(response => {
        if(response && response.data.userId != 0){
          this.authId = response.data.userId;
          WhoisDataService.GetRole({ userId: this.authId })
            .then(role => {
              this.Role = role.data.role.role;
            });
        }
        else{
          this.authId = 0;
        }
      });
    },
    GetCountNews(){
      WhoisDataService.GetCountNews()
        .then(res => {
        this.CountNews = res.data[0].title_count;
      }).catch(this.CountNews = 0);
    },
    GetNewsOnPage(){
      // this.countNewsOnPage = Math.ceil(window.innerWidth / 500);

      WhoisDataService.GetNews( { count: 4, page: this.PageNews} )
        .then(res => {
          this.ArrNews = res.data;
        })
    },
    ReadMore(key) {
      this.ShowText = true;
      this.ShowTextKey = key;
      WhoisDataService.GetNewsTitle({ news_id: this.ArrNews[key].news_id })
        .then(text => {
          this.Text = text.data.text;
        })
    },
    GoPageNews(direction){
      var maxPage = Math.ceil(this.CountNews / 4);
      if(direction == 1 && this.PageNews < maxPage) this.PageNews += 1;
      else if (direction == -1 && this.PageNews > 1) this.PageNews -= 1;
      else if (direction == -2) this.PageNews = 1;
      else if (direction == 2) this.PageNews = maxPage;
      this.GetNewsOnPage();
      this.GetCountNews();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.newsAll{
  margin-top: 6vw;
}

.card{
  width: 70vw;
  height: auto;
  padding: 0.5vw 2vw;
  background: var(--bg);
  margin: 1vw 3vw;
  font-family: "Montserrat", sans-serif;
  box-shadow: 4px 4px 14px rgba(0,0,0,0.25);
  border: 1px solid var(--color-dark);
  border-radius: 20px;
  color: var(--color-dark-font);
}

.card h3{
  margin: 0.5vw;
  font-size: min(2.5vw, 40px);
}

.card h5{
  margin: 0;
  font-size: min(2vw, 30px);
}

.card p{
  font-size: min(2.5vw, 30px);
  margin: 0;
}

.card span{
  font-size: min(1.5vw, 30px);
  border:  var(--color-dark);
  padding: 0.5vw;
  margin: 1vw;
  width: 9vw;
  text-align: center;
}

.card span:hover{
  color:#fff;
  background: var(--color-dark);
}

.NavigationNews{
  margin: 1vw 2vw;
  width: 95%;
  border-collapse: collapse;
  text-align: center;
  font-size: calc(0.5em + 1vw);
}

.NavigationNews td{
  color: var(--color-dark-font);
  width: 2vw;
}

.NavigationNews td:hover{
  opacity: 0.2;
}

.TextMore{
  font-size: 2vw;
}

.NavigationNews td{
  width: 2vw;
}

.NavigationNews td:hover{
  opacity: 0.2;
}
</style>
