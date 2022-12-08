<template>

    <img v-if="ModView == 'Main'"  :src="require(`./images/${ImgAuthStatus}`)" @click="authForm = !authForm ; CheckSession();" class="btnMainbtn"/>
    <p v-else class="ModChildLogin" @click="authForm = !authForm; CheckSession();">{{ PAuthStatus }}</p>
<div class="AuthFormMain" v-if="authForm">
  <div v-if="authId == 0">
    <table style="width: 90%; margin-left: 40px;">
        <td style="width: 1vw;">
            <p class="LogAndSign" v-bind:class="{ LogOrSign: isLog}" @click="isLog = true">{{ $t('authForm.Log_In') }}</p>
        </td>
        <td style="width: 10vw;">
            <p class="LogAndSign" v-bind:class="{ LogOrSign: !isLog}" @click="isLog = false">{{ $t('authForm.Sign_In') }}</p>
        </td>
        <td style="width: 20%;">
            <div @click="authForm = !authForm" class="cl-btn-7"></div>
        </td>
    </table>

    <div class='AuthFormInput' v-if="authForm">
        <input v-model="Name" type='text' :placeholder='$t("authForm.Name")' class='input-line' v-show="!isLog"/>
        <input v-model="Email" type='email' :placeholder='$t("authForm.Email")' class='input-line'/>
        <input v-model="Password" type='password' :placeholder='$t("authForm.Password")' class='input-line'/>
        <input v-model="RePassword" type='password' :placeholder='$t("authForm.Repeat_Password")' class='input-line' v-show="!isLog"/>
        <button class="LogBtn" v-show="isLog" @click="LogIn">{{ $t('authForm.Log_In') }}</button>
        <button class="LogBtn" v-show="!isLog" @click="SignUp">{{ $t('authForm.Sign_Up') }}</button>
    </div>

  </div>

  <div v-else>
    <table style="width: 90%; margin-left: 40px;">
        <td style="width: 1vw;">
            <p class="LogAndSign" v-bind:class="{ LogOrSign: isLog}" @click="isLog = true">{{ $t('authForm.Profile') }}</p>
        </td>
        <td style="width: 10vw;">
            <p class="LogAndSign" v-bind:class="{ LogOrSign: !isLog}" @click="isLog = false">{{ $t('authForm.Edit') }}</p>
        </td>
        <td style="width: 20%;">
            <div @click="authForm = !authForm" class="cl-btn-7"></div>
        </td>
    </table>

    <div class='AuthFormInput' v-if="!isLog">
        <input v-model="Name" type='text' :placeholder='$t("authForm.Name")' class='input-line'/>
        <input v-model="Email" type='email' :placeholder='$t("authForm.Email")' class='input-line'/>
        <input v-model="Password" type='password' :placeholder='$t("authForm.Password")' class='input-line'/>
        <input v-model="RePassword" type='password' :placeholder='$t("authForm.Repeat_Password")' class='input-line'/>
        <button class="LogBtn" v-show="!isLog" @click="EditProfile">{{ $t('authForm.Edit_Profile') }}</button>
    </div>

    <div v-else class="welcomeUser">
        <p style="font-size: 3vw;">{{ $t('authForm.Welcome') }}, {{ userName }}</p>
        <div v-if="userDomain != ''">
            <p style="font-size: 2vw;">{{ $t('authForm.Track_domain') }}</p>
            <div class="DomainsList" v-for="(domain,key) in userDomain.split(' ')" :key="key">
                <label class="UserDomainElement" @click="$emit('pushDomain', domain)">{{ domain }}</label>
              <p class="UserDomainElement" @click="deleteTrack(key)">&#128465;</p>
            </div>
        </div>
        <button class="SignOutBtn" @click="SignOut">{{ $t('authForm.Sign_Out') }}</button>
    </div>

  </div>

  <label class="label">
    <div class="toggle">
      <input class="toggle-state" type="checkbox" :checked="!isDark" @click="ChangeDarkMode" />
      <div class="indicator"></div>
    </div>
    <div v-if="!isDark" class="label-text">{{ $t('authForm.Dark_Mode') }}</div>
    <div v-else class="label-text">{{ $t('authForm.Light_Mode') }}</div>
  </label>

  <LocaleSwitcher/>

  <AlertMessages ref="AddAlertMess"/>
</div>
</template>

<script>
import WhoisDataService from '../services/WhoisDataService';
import AlertMessages from './AlertMessages.vue';
import { useToggle, useDark } from '@vueuse/core';
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default {
    name: "AuthForm",
    setup() {
      const isDark = useDark()
      const toggleDark = useToggle(isDark)
      return {toggleDark, isDark}
    },
    data() {
        return {
            isLog: true,
            Name: "",
            Email: "",
            Password: "",
            RePassword: "",
            authForm: false,
            ImgAuthStatus: "LogIn.png",
            PAuthStatus: this.$t("authForm.Log_In"),
            authId: 0,
            userName: "",
            userDomain: "vk.com google.ru",
            userDarkMode: "Light",
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
        ChangeDarkMode() {
          this.toggleDark();
          if(!this.isLog){
            WhoisDataService.update({
              userId: this.authId,
              name: "",
              email: "",
              password: "",
              darkmode: this.isDark ? "Dark" : "Light",
            })
          }
        },
        AddAlert(mess){
            this.$refs.AddAlertMess.AddAlertMess(mess);
        },
        CheckSession() {
            WhoisDataService.FindSession()
                .then(response => {
                if (response && response.data.userId != 0) {
                    this.authId = response.data.userId;
                    this.ImgAuthStatus = "githubAcc.png";
                    this.PAuthStatus = this.$t("authForm.Profile");
                    WhoisDataService.FindById({ userId: this.authId })
                        .then(res => {
                        this.userName = res.data.name;
                        this.userDomain = res.data.domains;
                        this.userDarkMode = res.data.darkmode;
                    });
                }
                else {
                    this.userName = "";
                    this.userDomain = "";
                    this.authId = 0;
                    this.ImgAuthStatus = "LogIn.png";
                    this.PAuthStatus = this.$t("authForm.Log_In");
                }
            });
        },
        EditProfile() {
            if (this.Password == this.RePassword || this.Password) {
                WhoisDataService.FindByEmail({ email: this.Email })
                    .then(response => {
                    if (response.data.name) {
                        this.AddAlert({ status: false, message: this.$t("alert.f_Mail_Is_Reg") });
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
                                this.AddAlert({ status: true, message: this.$t("alert.t_Change_Successful") });
                                this.CheckSession();
                                this.Name = "";
                                this.Email = "";
                                this.Password = "";
                                this.RePassword = "";
                                this.authForm = false;
                            }
                            else {
                                this.AddAlert({ status: false, message: this.$t("alert.f_Change_Not_Successful") });
                            }
                        }).catch(() => {
                            this.AddAlert({ status: false, message: this.$t("alert.f_Change_Not_Successful") });
                        });
                    }
                });
            }
            else
                this.AddAlert({ status: false, message: this.$t("alert.f_Password_Not_Match") });

        },
        SignUp() {
            if (this.Password == this.RePassword) {
                var data = {
                    email: this.Email,
                };
                WhoisDataService.FindByEmail(data)
                    .then(response => {
                    if (response.data.name) {
                        this.AddAlert({ status: false, message: this.$t("alert.f_Mail_Is_Reg") });
                        return;
                    }
                    else {
                        var newUser = {
                            name: this.Name,
                            email: this.Email,
                            password: this.Password,
                            darkmode: 'Light',
                        };
                        if(this.isDark) newUser.darkmode = 'Dark';
                        WhoisDataService.create(newUser)
                            .then(response => {
                            if(response.statusText == "OK"){
                                this.AddAlert({ status: true, message: this.$t("alert.t_Reg_Successful") });
                                this.CheckSession();
                                this.LogIn();
                                this.Name = "";
                                this.Email = "";
                                this.Password = "";
                                this.RePassword = "";
                                this.authForm = false;
                            }
                            else this.AddAlert({ status: false, message: this.$t("alert.t_Reg_Not_Successful") });
                        })
                        .catch(() => {
                            this.AddAlert({ status: false, message: this.$t("alert.t_Reg_Not_Successful") });
                        });
                    }
                });
            }
            else
                this.AddAlert({ status: false, message: this.$t("alert.f_Password_Not_Match") });
        },
        LogIn() {
            var user = {
                email: this.Email,
                password: this.Password
            };
            WhoisDataService.signIn(user)
                .then(response => {
                if(response.statusText == "OK"){
                    this.AddAlert({ status: true, message: this.$t("alert.t_Auth_Successful") });
                    this.CheckSession();
                    this.Name = "";
                    this.Email = "";
                    this.Password = "";
                    this.RePassword = "";
                    this.authForm = false;
                }
                else
                    this.AddAlert({ status: false, message: this.$t("alert.f_Auth_Not_Successful") });
            }).catch(() => {
                this.AddAlert({ status: false, message: this.$t("alert.f_Auth_Not_Successful") });
            });
        },
        SignOut() {
            WhoisDataService.signOut({})
                .then(res => {
                if(res.statusText == "OK"){
                    this.AddAlert({ status: true, message: this.$t("alert.t_Have_Logged_Acc") });
                    this.CheckSession();
                    this.Name = "";
                    this.Email = "";
                    this.Password = "";
                    this.RePassword = "";
                    this.authForm = false;
                }
                else
                    this.AddAlert({ status: false, message: this.$t("alert.f_Oops") });
            })
            .catch(() => {
                this.AddAlert({ status: false, message: this.$t("alert.f_Oops") });
            });
        },
        deleteTrack(key) {
            WhoisDataService.DeleteDomain({ userId: this.authId, domainName: this.userDomain.split(" ")[key] })
                .then(response => {
                if(response.statusText == "OK"){
                    this.CheckSession();
                    this.AddAlert({ status: true, message: this.$t("alert.t_Delete_Successful") });
                }
                else this.AddAlert({ status: false, message: this.$t("alert.f_Oops") });
            })
            .catch(() => {
                this.AddAlert({ status: false, message: this.$t("alert.f_Oops") });
            });
        }
    },
    components: {LocaleSwitcher, AlertMessages }
}
</script>

<style scoped>


.label {
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: var(--color-dark-font);
}

.label-text {
  margin-left: 16px;
}

.toggle {
  isolation: isolate;
  position: relative;
  height: 30px;
  width: 60px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow:
      -8px -4px 8px 0px var(--bg),
      8px 4px 12px 0px var(--bg-light),
      4px 4px 4px 0px var(--bg-light) inset,
      -4px -4px 4px 0px var(--bg) inset;
}

.toggle-state {
  display: none;
}

.indicator {
  height: 100%;
  width: 200%;
  background: var(--color-dark-font);
  border-radius: 15px;
  transform: translate3d(-75%, 0, 0);
  transition: transform 0.4s cubic-bezier(0.85, 0.05, 0.18, 1.35);
  box-shadow:
      -8px -4px 8px 0px var(--bg),
      8px 4px 12px 0px var(--bg-light);
}

.toggle-state:checked ~ .indicator {
  transform: translate3d(25%, 0, 0);
}

.toggle-switch label {
  position: absolute;
  bottom: 5vw;
  right: 0;
  width: 30%;
  height: 6vw;
  background-color: var(--color-dark-font);
  border-radius: 50px;
  cursor: pointer;
}

.toggle-switch input {
  position: absolute;
  display: none;
}

.slider {
  position: absolute;
  width: 100%;
  height: 6vw;
  border-radius: 50px;
  transition: 0.3s;
}

input:checked ~ .slider {
  background-color: var(--color-dark-font);
}

.slider::before {
  content: "";
  position: absolute;
  top: 0.5vw;
  left: 1vw;
  width: 5vw;
  height: 5vw;
  border-radius: 50%;
  box-shadow: inset 2vw -0.1vw 0px 0px var(--color-light-font);
  background-color: var(--color-dark-font);
  transition: 0.3s;
}

input:checked ~ .slider::before {
  transform: translateX(8.5vw);
  background-color: var(--color-light-font);
  box-shadow: none;
}

.ModChildLogin{
  text-align: center;
  font-size: min(2vw, 25px);
  font-family: "Montserrat", sans-serif;
  width: 8vw;
}
.ModChildLogin:hover{
  color: #fee8da;
}
.SignOutBtn{
    margin-left: 7vw;
    background: var(--color-dark);
    color: var(--color-light);
    border: none;
    border-radius: 30px;
    width: calc(70% + 1.5vw);
    height: calc(1em + 1vw);
    font-size: min(4vw, 30px);
}
.SignOutBtn:hover{
    opacity: 0.6;
    background: #EEE;
    color: var(--color-dark);;
}
.DomainsList{
    width: 80%;
    display: flex;
    justify-content: space-between;
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
  font-size: 3vw;
  font-family: "Montserrat", Impact;
  color: var(--color-dark-font);
  margin: 0;
}
.UserDomainElement:hover {
  opacity: 0.3;
}
.welcomeUser p{
    font-family: "Montserrat", Impact;
    color: var(--color-dark-font);
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
    background: var(--bg);
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
.AuthFormInput input {
  background: var(--bg);
  color: var(--color-dark-font);
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
  background: var(--color-dark);
  color: var(--color-light);
  border: none;
  border-radius: 30px;
  width: calc(70% + 1.5vw);
  height: calc(1em + 1vw);
  font-size: min(4vw, 30px);
}
.LogBtn:hover{
    opacity: 0.6;
    background: #EEE;
    color: var(--color-dark);
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
