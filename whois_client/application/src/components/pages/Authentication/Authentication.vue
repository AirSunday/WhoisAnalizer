<template>
  <div>
      <img src="../images/back.png" id="authImg">
      <button class="btnAuth" @click="pushCreateOrLogin">{{createOrLogin}}</button>
    <div class="l-auth" v-if="loginVisible">
      <v-form v-model="validLogin">
        <v-text-field label="Username"
                      v-model="credentials.username"
                      :rules="rules"
                      required>
        </v-text-field>

        <v-text-field label="Password"
                      v-model="credentials.password"
                      :rules="rules"
                      :type="loginPasswordVisible ? 'text' : 'password'"
                      required>
        </v-text-field>

        <button class="btnAuth" @click="submitAuthentication">Login</button>
      </v-form>
    </div>

    <div class="l-signup" v-if="signUpVisible">
      <v-form v-model="validSignUp">
        <v-text-field label="Username"
                      v-model="newUser.username"
                      :rules="rules"
                      required>
        </v-text-field>

        <v-text-field label="Password"
                      v-model="newUser.password"
                      :rules="rules"
                      :type="signUpPasswordVisible ? 'text' : 'password'"
                      required>
        </v-text-field>

        <button class="btnAuth" block @click="submitSignUp">Sign Up</button>
      </v-form>
    </div>

    <v-snackbar timeout="6000"
                bottom="bottom"
                v-model="snackbar">
      {{ message }}
    </v-snackbar>
  </div>
</template>
<script>
import Authentication from '@/components/pages/Authentication'
export default {
  data () {
    return {
      createOrLogin: 'Create account',
      snackbar: false,
      validLogin: false,
      validSignUp: false,
      loginVisible: true,
      signUpVisible: false,
      loginPasswordVisible: false,
      signUpPasswordVisible: false,
      rules: [ (value) => !!value || 'This field is required' ],
      credentials: {
        username: '',
        password: ''
      },
      newUser: {
        username: '',
        password: ''
      },
      message: ''
    }
  },
  methods: {
    pushCreateOrLogin () {
      this.signUpVisible = !this.signUpVisible
      this.loginVisible = !this.loginVisible
      if (this.signUpVisible) { this.createOrLogin = 'Login' } else { this.createOrLogin = 'Create account' }
    },
    submitAuthentication () {
      Authentication.authenticate(this, this.credentials, '/')
    },

    submitSignUp () {
      Authentication.signup(this, this.newUser, '/')
    }
  }
}
</script>
<style>
body{
    background-color: #BC986A;
}
#authImg{
  left: 0;
  max-width: 100%;
  height: auto;
  position:fixed;
  bottom:0;
}

.btnAuth {

    background: #323232;
    color: #e9deb5;
    border: none;
    border-radius: 20px;
    width: 200px;
    height: 63px;
}

.btnAuth:hover{
    background: #c9bf9e;
    color: #323232;
}

</style>
