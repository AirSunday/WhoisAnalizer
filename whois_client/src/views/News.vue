<template>
  <img :src="require(`../components/images/back.png`)" alt="not found" class="imgBack"/>
  <Admin v-if="Role == 'admin'"/>

  <table class="NavigationNews">
    <td @click="GoPageNews(-2)"> &lt;&lt; </td>
    <td @click="GoPageNews(-1)"> &lt; </td>
    <td>{{ PageNews }}</td>
    <td @click="GoPageNews(1)"> &gt; </td>
    <td @click="GoPageNews(2)"> &gt;&gt; </td>
  </table>

  <div class="newsAll">
    <div class="container" v-for="(news,key) in ArrNews" :key="key">
        <div class="card">
            <div class="face face1">
                <div class="content">
                    <h3>{{news.title}}</h3>
                    <h5>{{news.updatedAt.split('T')[0]}}</h5>
                </div>
            </div>
            <div class="face face2">
                <div class="content">
                    <p>{{news.preview}}...</p>
                        <span @click="ReadMore(key)">Read More</span>
                </div>
            </div>
      </div>
    </div>
  </div>

<div v-if="ShowText" class="TextMore">
{{Text}}
</div>

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
    }
  },
  created() {
    this.CheckSessionWhois();

    this.GetCountNews();

    window.addEventListener('resize', this.GetNewsOnPage);
    this.GetNewsOnPage();
  },
  methods: {
    CheckSessionWhois(){
      WhoisDataService.FindSession().then(response => {
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
      WhoisDataService.GetCountNews().then(res => {
        this.CountNews = res.data[0].title_count;
      }).catch(this.CountNews = 0);
    },
    GetNewsOnPage(){
      this.countNewsOnPage = Math.ceil(window.innerWidth / 200) - 1;

      WhoisDataService.GetNews( { count: this.countNewsOnPage, page: this.PageNews} )
        .then(res => {
          this.ArrNews = res.data;
        })
    },
    ReadMore(key) {
      this.ShowText = true;
      WhoisDataService.GetNewsTitle({ news_id: this.ArrNews[key].news_id })
        .then(text => {
          this.Text = text.data.text;
        })
    },
    GoPageNews(direction){
      var maxPage = Math.ceil(this.CountNews / this.countNewsOnPage);
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

.NavigationNews{
  margin: 1vw 2vw;
  width: 95%;
  border-collapse: collapse;
  text-align: center;
  font-size: calc(0.5em + 1vw);
}

.NavigationNews td{
  width: 2vw;
}

.NavigationNews td:hover{
  opacity: 0.2;
}

.TextMore{
  position: absolute;
  z-index: -1;
  top: 260px;
  background: #bda496;
  width: 90%;
  color:#fff;
  border-radius: 20px;
  padding: calc(2vw + 3px);
  font-size: 2vw;
  font-family: "Montserrat", sans-serif;
  height: auto;
  margin: auto;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.37);
}

/* Code CARDS */
.newsAll{
  margin-right: 4vw;
  margin-left: 4vw;
  display: flex;
  font-family: "Montserrat", sans-serif;
}
.container{
  margin: auto;
  position: relative;
  display: flex;
  justify-content: space-between;
}
.container .card{
  position: relative;
  cursor: pointer;
}
.container .card .face{
  width: 150px;
  height: 150px;
  transition: 0.5s;
}
.container .card .face.face1{
  position: relative;
  background: #bda496;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  transform: translateY(0);
  /* transform: translateY(100px); */
}
.container .card:hover .face.face1{
  background: #ead6ca;
  transform: translateY(-5px);
}

.container .card .face.face1 .content{
  opacity: 0.4;
  padding: 10px;
  transition: 0.5s;
}

.container .card:hover .face.face1 .content{
  opacity: 1;
}

.container .card .face.face1 .content h3{
  margin: 10px 0 0;
  padding: 0;
  color: #fff;
  text-align: center;
  font-size: 1em;
}

.container .card .face.face1 .content h5{
  margin: 10px 0 0;
  padding: 0;
  color: #fff;
  text-align: center;
  font-size: 0.7em;
}

.container .card .face.face2{
  position: relative;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.37);
  transform: translateY(-150px);
}

.container .card:hover .face.face2{
  transform: translateY(-15px);
}

.container .card .face.face2 .content p{
  font-size: 0.7em;
  margin: 0;
  padding: 0;
}

.container .card .face.face2 .content span{
  margin: 15px 0 0;
  display:  inline-block;
  text-decoration: none;
  font-weight: 900;
  color: #a28f85;
  padding: 5px;
  border: 1px solid #a28f85;
}

.container .card .face.face2 .content span:hover{
  background: #a28f85;
  color: #fff;
}
/* Code CARDS */

.imgBack{
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
}

.NavigationNews{
  margin: 1vw 2vw;
  width: 95%;
  border-collapse: collapse;
  text-align: center;
  font-size: calc(0.5em + 1vw);
}

.NavigationNews td{
  width: 2vw;
}

.NavigationNews td:hover{
  opacity: 0.2;
}
</style>