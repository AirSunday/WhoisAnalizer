<!-- <template>
    <div class="UserDomainsMain">
        <button @click="updatedDomains">Domain</button>
        <div v-show="userDomainsShow" class="BackDomainsList">
            <table class="DomainsList">
                <tr v-for="(domain,key) in domains" :key="key">
                    <td class="UserDomainElement" @click="$emit('pushDomain', domain)">{{ domain }}</td>
                    <td>
                        <img src="./images/trash.png" @click="deleteTrack(key)" class="btnDelete"/>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import WhoisDataService from '../services/WhoisDataService';

export default {
  name: 'UserDomains',
  props: {
    userEmail: {
      type: String,
      default: null
    },
  },
  data() {
    return {
        userDomainsShow: true,
        domains: [],
    };
  },
  methods: {
    deleteTrack (key) {
      WhoisDataService.GetDomain( { Email: this.userEmail } )
      .then(response => {
        WhoisDataService.DeleteDomain(this.domains[key], { Email: this.userEmail, Domains: response.data.Domains } )
        .then(response => {
            this.domains.splice(key, 1)
            console.log(response)
          });
          });
    },
    updatedDomains() {
      this.userDomainsShow = !this.userDomainsShow
      WhoisDataService.GetDomain( { Email: this.userEmail } )
          .then(response => {
            this.domains = response.data.Domains.split(' ');
            this.domains.pop();
          });
    },
  },
  created() {
    this.updatedDomains();
  }
}
</script>

<style scoped>
.UserDomainsMain{
    margin: 0;
}

.BackDomainsList{
    padding: 1vw;
    background: #BBB;
    border-radius: 30px;
    width: calc(1em + 15vw);
}

.UserDomainElement{
  color: #222;
}

.UserDomainsMain button{
    background: #000;
    color: #DDD;
    border: none;
    border-radius: 30px;
    width: calc(3em + 5vw);
    height: calc(1em + 2vw);
    max-width: 150px;
    max-height: 60px;
    font-size: calc(0.7em + 0.6vw);
    opacity: 0.9;
}

@media only screen and (max-width: 330px)  {
  .UserDomainsMain button{
    width: 300%;
  }
  .UserDomainsMain{
    right: 30%;
  }
  .BackDomainsList{
    right: -100px;
    width: 300%;
    border-radius: 0;
  }
}

@media only screen and (max-width: 1100px)  {
  .BackDomainsList{
    width: calc(1em + 20vw);
  }
}

.DomainsList {
    width: 100%;
    margin-left: 10px;
    top: calc(1em + 2vw);
    font-size: 2vw;
}

.btnDelete{
    width: 1.5vw;
}

.btnDelete:hover{
  opacity: 0.3;
}

.UserDomainElement:hover {
  opacity: 0.3;
}
</style> -->
