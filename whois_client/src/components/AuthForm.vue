<template>

    <img v-if="ModView == 'Main'"  :src="require(`./images/${ImgAuthStatus}`)" @click="authForm = !authForm ; CheckSession();" class="btnMainbtn"/>
    <p v-else class="ModChildLogin" @click="authForm = !authForm; CheckSession();">{{ PAuthStatus }}</p>
<div class="AuthFormMain" v-if="authForm">
  <div v-if="authId == 0">
    <table style="width: 90%; margin-left: 40px;">
        <td style="width: 1vw;">
            <p class="LogAndSign" v-bind:class="{ LogOrSign: isLog}" @click="isLog = true">Log In</p>
        </td>
        <td style="width: 10vw;">
            <p class="LogAndSign" v-bind:class="{ LogOrSign: !isLog}" @click="isLog = false">Sign Up</p>
        </td>
        <td style="width: 20%;">
            <div @click="authForm = !authForm" class="cl-btn-7"></div>
        </td>
    </table>

    <div class='AuthFormInput' v-if="authForm">
        <input v-model="Name" type='text' placeholder='Name' class='input-line' v-show="!isLog"/>
        <input v-model="Email" type='email' placeholder='E-mail' class='input-line'/>
        <input v-model="Password" type='password' placeholder='Password' class='input-line'/>
        <input v-model="RePassword" type='password' placeholder='Repeat Password' class='input-line' v-show="!isLog"/>
        <button class="LogBtn" v-show="isLog" @click="LogIn">Log In</button>
        <button class="LogBtn" v-show="!isLog" @click="SignUp">Sign Up</button>
    </div>

  </div>

  <div v-else>
    <table style="width: 90%; margin-left: 40px;">
        <td style="width: 1vw;">
            <p class="LogAndSign" v-bind:class="{ LogOrSign: isLog}" @click="isLog = true">Profile</p>
        </td>
        <td style="width: 10vw;">
            <p class="LogAndSign" v-bind:class="{ LogOrSign: !isLog}" @click="isLog = false">Edit</p>
        </td>
        <td style="width: 20%;">
            <div @click="authForm = !authForm" class="cl-btn-7"></div>
        </td>
    </table>

    <div class='AuthFormInput' v-if="!isLog">
        <input v-model="Name" type='text' placeholder='Name' class='input-line'/>
        <input v-model="Email" type='email' placeholder='E-mail' class='input-line'/>
        <input v-model="Password" type='password' placeholder='Password' class='input-line'/>
        <input v-model="RePassword" type='password' placeholder='Repeat Password' class='input-line'/>
        <button class="LogBtn" v-show="!isLog" @click="EditProfile">Edit Profile</button>
    </div>

    <div v-else class="welcomeUser">
        <p style="font-size: 3vw;">Welcome, {{ userName }}</p>
        <div v-if="userDomain != ''">
            <p style="font-size: 2vw;">The domain names you're tracking</p>
            <div class="DomainsList" v-for="(domain,key) in userDomain.split(' ')" :key="key">
                <label class="UserDomainElement" @click="$emit('pushDomain', domain)" style="font-size: 2vw;">{{ domain }}</label>
                <img src="../components/images/trash.png" @click="deleteTrack(key)" class="btnDelete"/>
            </div>
        </div>
        <button class="SignOutBtn" @click="SignOut">Sign Out</button>
    </div>

  </div>
  <AlertMessages ref="AddAlertMess"/>
</div>
</template>

<script>
import WhoisDataService from '../services/WhoisDataService';
import AlertMessages from './AlertMessages.vue';

export default {
    name: "AuthForm",
    data() {
        return {
            isLog: true,
            Name: "",
            Email: "",
            Password: "",
            RePassword: "",
            authForm: false,
            ImgAuthStatus: "LogIn.png",
            PAuthStatus: "LogIn",
            authId: 0,
            userName: "",
            userDomain: "",
        };
    },
    props: {
        ModView: {
            type: String,
            default: ""
        }
    },
    created() {
        this.CheckSession();
    },
    methods: {
        AddAlert(mess){
            this.$refs.AddAlertMess.AddAlertMess(mess);
        },
        CheckSession() {
            WhoisDataService.FindSession()
                .then(response => {
                if (response && response.data.userId != 0) {
                    this.authId = response.data.userId;
                    this.ImgAuthStatus = "githubAcc.png";
                    this.PAuthStatus = "Profile";
                    WhoisDataService.FindById({ userId: this.authId })
                        .then(res => {
                        this.userName = res.data.name;
                        this.userDomain = res.data.domains;
                    });
                }
                else {
                    this.userName = "";
                    this.userDomain = "";
                    this.authId = 0;
                    this.ImgAuthStatus = "LogIn.png";
                    this.PAuthStatus = "LogIn";
                }
            });
        },
        EditProfile() {
            if (this.Password == this.RePassword || this.Password) {
                WhoisDataService.FindByEmail({ email: this.Email })
                    .then(response => {
                    if (response.data.name) {
                        this.AddAlert({ status: false, message: 'The mail is already registered' });
                        return;
                    }
                    else {
                        var data = {
                            userId: this.authId,
                            name: this.Name,
                            email: this.Email,
                            password: this.Password
                        };
                        WhoisDataService.update(data)
                            .then(res => {
                            if (res.statusText == "OK") {
                                this.AddAlert({ status: true, message: 'The changes were successful' });
                                this.CheckSession();
                                this.Name = "";
                                this.Email = "";
                                this.Password = "";
                                this.RePassword = "";
                            }
                            else {
                                this.AddAlert({ status: false, message: 'The changes were unsuccessful' });
                            }
                        }).catch(() => {
                            this.AddAlert({ status: false, message: 'The changes were unsuccessful' });
                        });
                    }
                });
            }
            else
                this.AddAlert({ status: false, message: "Passwords don't match" });

        },
        SignUp() {
            if (this.Password == this.RePassword) {
                var data = {
                    email: this.Email,
                };
                WhoisDataService.FindByEmail(data)
                    .then(response => {
                    if (response.data.name) {
                        this.AddAlert({ status: false, message: 'The mail is already registered' });
                        return;
                    }
                    else {
                        var newUser = {
                            name: this.Name,
                            email: this.Email,
                            password: this.Password
                        };
                        WhoisDataService.create(newUser)
                            .then(response => {
                            if(response.statusText == "OK"){
                                this.AddAlert({ status: true, message: 'Registration was successful' });
                                this.CheckSession();
                                this.LogIn();
                                this.Name = "";
                                this.Email = "";
                                this.Password = "";
                                this.RePassword = "";
                            }
                            else this.AddAlert({ status: false, message: 'Registration was unsuccessful' });
                        })
                        .catch(() => {
                            this.AddAlert({ status: false, message: 'Registration was unsuccessful' });
                        });
                    }
                });
            }
            else
                this.AddAlert({ status: false, message: "Passwords don't match" });
        },
        LogIn() {
            var user = {
                email: this.Email,
                password: this.Password
            };
            WhoisDataService.signIn(user)
                .then(response => {
                if(response.statusText == "OK"){
                    this.AddAlert({ status: true, message: 'Authorization was successful' });
                    this.CheckSession();
                    this.Name = "";
                    this.Email = "";
                    this.Password = "";
                    this.RePassword = "";
                }
                else 
                    this.AddAlert({ status: false, message: 'Authorization was unsuccessful' });
            }).catch(() => {
                this.AddAlert({ status: false, message: 'Authorization was unsuccessful' });
            });
        },
        SignOut() {
            WhoisDataService.signOut({})
                .then(res => {
                if(res.statusText == "OK"){ 
                    this.AddAlert({ status: true, message: 'You have logged out of your account' });
                    this.CheckSession();
                    this.Name = "";
                    this.Email = "";
                    this.Password = "";
                    this.RePassword = "";
                }
                else 
                    this.AddAlert({ status: false, message: 'Oops... something went wrong' });
            })
            .catch(() => {
                this.AddAlert({ status: false, message: 'Oops... something went wrong' });
            });
        },
        deleteTrack(key) {
            WhoisDataService.DeleteDomain({ userId: this.authId, domainName: this.userDomain.split(" ")[key] })
                .then(response => {
                if(response.statusText == "OK"){
                    this.CheckSession();
                    this.AddAlert({ status: true, message: 'The deletion was successful' });
                }
                else this.AddAlert({ status: false, message: 'Oops... something went wrong' });
            })
            .catch(() => {
                this.AddAlert({ status: false, message: 'Oops... something went wrong' });
            });
        }
    },
    components: { AlertMessages }
}
</script>

<style scoped>

.ModChildLogin{
  text-align: center;
  font-size: min(2vw, 25px);
  font-family: "Montserrat", sans-serif;
  width: 5vw;
}

.ModChildLogin:hover{
  color: #fee8da;
}
.SignOutBtn{
    margin-left: 7vw;
    background: #bda496;
    color: #FFF;
    border: none;
    border-radius: 30px;
    width: calc(70% + 1.5vw);
    height: calc(1em + 1vw);
    font-size: min(4vw, 30px);
}
.SignOutBtn:hover{
    opacity: 0.6;
    background: #EEE;
    color: #bda496;
}

.LoSignOutBtngBtn:active{
    opacity: 0.6;
    background: #FFF;
    color: #b8937e;
}

.DomainsList{
    width: 80%;
    display: flex;
    margin: 1vw 3vw;
    text-decoration: none;
    border-bottom: 0.2vw solid #927564;
    padding-bottom: 0.2vw;
}


.btnDelete{
    width: 2vw;
}

.btnDelete:hover{
  opacity: 0.3;
}

.UserDomainElement{
    font-family: "Montserrat", Impact;
    color: #927564;
    margin: 0;
    width: 40vw;
}

.UserDomainElement:hover {
  opacity: 0.3;
}

.welcomeUser p{
    font-family: "Montserrat", Impact;
    color: #bda496;
    text-align: center;
}

.btnMainbtn{
      width: 9vw;
      height: auto;
      max-width: 70px;
      position: fixed;
      right: 9vw;
      top: 2vw;
      opacity: 0.8;
    }
    
    .btnMainbtn:hover{
      opacity: 0.5;
    }


.AuthFormMain{
    position: fixed;
    z-index: 4;
    right: 0;
    top: 0;
    height: 100%;
    width: 50%;
    background: #FFF;
    box-shadow: -7px 0px 24px -12px #000000;
}

.cl-btn-7 {
    width: 3vw;
    height: 3vw;
    border-radius: 40px;
    position: relative;
    z-index: 3;
    margin: 20px auto;
    cursor: pointer;
    right: 30%;
}
.cl-btn-7:before {
    content: '+';
    color: #bda496;
    position: absolute;
    z-index: 4;
    transform: rotate(45deg);
    font-size: 5vw;
    line-height: 1;
    top: -1vw;
    left: 0.2vw;
    transition: all 0.3s cubic-bezier(0.77, 0, 0.2, 0.85);
}
.cl-btn-7:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background: #bda496;
    z-index: 3;
    transition: all 0.3s cubic-bezier(0.77, 0, 0.2, 0.85);
    transform: scale(0.01);
}
.cl-btn-7:hover:after {
    transform: scale(1);
}
.cl-btn-7:hover:before {
    transform: scale(0.8) rotate(45deg);
    color: #fff;
}

.LogAndSign{
    font-family: "Montserrat", Impact;
    color: #524741;
    font-size: min(4vw, 30px);
}

.LogOrSign{
    color: #bda496;
    text-decoration: underline #bda496;
    text-underline-offset: 1.5vw;
}

.LogAndSign:hover {
    color: rgb(230, 208, 197);
}
.LogOrSign:hover{
    color: rgb(230, 208, 197);
    text-decoration: underline rgb(230, 208, 197);
}

.AuthFormInput{
    margin-left: 7vw;
    top: 10vw;
    position: absolute;
}
.input-line{
    padding-left: 20px;
    border-radius: 30px;
    border-color: #b8937e;
    width: 70%;
    margin-bottom: 2vw;
    height: calc(1em + 1vw);
    font-size: calc(0.6em + 1vw);
}

.LogBtn{
    background: #bda496;
    color: #FFF;
    border: none;
    border-radius: 30px;
    width: calc(70% + 1.5vw);
    height: calc(1em + 1vw);
    font-size: min(4vw, 30px);
}
.LogBtn:hover{
    opacity: 0.6;
    background: #EEE;
    color: #bda496;
}

.LogBtn:active{
    opacity: 0.6;
    background: #FFF;
    color: #b8937e;
}

@media only screen and (max-width: 800px)  {
  .AuthFormInput{
    margin-left: 7vw;
    top: max(15vh, 15vw);
    position: absolute;
  }
}

</style>
