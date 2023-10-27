<template>
  <div class="login">
    <div class="loading">
      <div class="loading-top">
        <img alt="JEEC logo" src="../assets/jeec_colour_no_edition.svg" />
      </div>
      <div>
        V1.15
      </div>
      <div class="buttons-flex" v-if="!loading">
        
        <!-- <div
          @click.stop="login_student"
          class="button"
          style="background-color: #27ade4"
        >
          <img
            alt="Fenix logo"
            src="../assets/icons/graduation-hat.svg"
            class="icon"
            style="margin-top: 0.5vw"
          />
          Student Login
        </div> -->
        <!-- Botão GOOGLE -->
        <!-- <div @click="onSignIn()" class="g-signin2" data-width="300" data-height="40" data-longtitle="true"></div>  -->
        <!-- <div id="my-signin2"></div> -->
        <!-- <g-signin-button
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError">
          Sign in now with Google
        </g-signin-button> -->
        <!-- <GoogleLogin :params="params" :onSuccess="onSuccess" >NEW LOGIN TEXT</GoogleLogin> -->
        <div ref="googleLoginBtn">That didn't work, soz</div>

        <div
          @click.stop="login_partner"
          class="button"
          style="background-color: #27ade4"
        >
          <img
            alt="Fenix logo"
            src="../assets/icons/businessman.svg"
            class="icon"
          />
          Partner Login
        </div>
        <div
          @click.stop="return_website"
          class="button"
          style="background-color: #e42741"
        >
          <img
            alt="Fenix logo"
            src="../assets/icons/back-arrow.svg"
            class="icon"
          />
          Return to Website
        </div>
      </div>
      <div v-else>
        <v-progress-circular
          indeterminate
          color="#27ade4"
          :size="100"
          :width="10"
          class="loading-bar"
        ></v-progress-circular>
      </div>
      <div class="loading-bottom">
        <img alt="IST logo" src="../assets/tecnico_grey.svg" />
      </div>
    </div>
    
  </div>
  
</template>

<script >
import User from "../models/user";
import GoogleLogin from 'vue-google-login';
import * as parserJwt from '../assets/jwtparser.js';
import axios from 'axios';
import authHeader from "../services/auth-header";

// import UserService from "../services/user.service";

export default {
  components: {
    GoogleLogin
  },

  name: "Login",
  id_token: "",
  gapi:"",
  onSuccess:"",
  onFailure:"",
  data: function () {
   
    return {
      params: {
        client_id: '286554998545-hsatr3tkmeskks4r3r4eb7vcfsbv25h7.apps.googleusercontent.com'
      },
      user: new User(),
      message: "",
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      loading: this.$route.query.token ? true : false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted(){    
    const gClientId = ["286554998545-hsatr3tkmeskks4r3r4eb7vcfsbv25h7.apps.googleusercontent.com"]
      window.google.accounts.id.initialize({
        client_id: gClientId,
        callback: this.handleCredentialResponse,
        auto_select: true
      })
      window.google.accounts.id.renderButton(
        this.$refs.googleLoginBtn, {
          text: 'Sign in with Google', // or 'signup_with' | 'continue_with' | 'signin'
          size: 'large', // or 'small' | 'medium'
          width: '366', // max width 400
          theme: 'outline', // or 'filled_black' |  'filled_blue'
          logo_alignment: 'left' // or 'center'
        }
      )
  },

  methods: {
   
    async handleCredentialResponse(resposta) {
        console.log(resposta) 
        console.log("***********m*****e*******r******d*******a***************");
        console.log(parserJwt.parseJwt(resposta.credential))
        console.log(parserJwt.parseJwt(resposta.credential).given_name)
        // Put your backend code in here

        // const visitor = new FormData();
        // visitor.append('name', parserJwt.parseJwt(response.credential).name)
        // visitor.append('email', parserJwt.parseJwt(response.credential).email)
        // visitor.append('email_validation', parserJwt.parseJwt(response.credential).email_verified)
        // visitor.append('picture', parserJwt.parseJwt(response.credential).picture)
        
        axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/student/redirecturigoogle", parserJwt.parseJwt(resposta.credential),
          { headers: authHeader() }
        ).then(response => {this.backend_response = response.data;
                            if (backend_response != ''){
                              window.location.replace(process.env.STUDENT_APP_URL + "?token=" + backend_response);
                              console.log('merda boa')
                            }else{
                              window.location.replace(process.env.STUDENT_APP_URL)
                              console.log('merda má')
                            }
                            })
                            
      },
    
    decrypt(code) {
      var master_key = "12345678901234561234567890123456";
      var rawData = atob(code.split("_").join("+"));

      var iv = rawData.substring(0, 16);
      var crypttext = rawData.substring(16);

      crypttext = this.CryptoJS.enc.Latin1.parse(crypttext);
      iv = this.CryptoJS.enc.Latin1.parse(iv);
      var key = this.CryptoJS.enc.Utf8.parse(master_key);

      var plaintextArray = this.CryptoJS.AES.decrypt(
        { ciphertext: crypttext },
        key,
        {
          iv: iv,
          mode: this.CryptoJS.mode.CBC,
          padding: this.CryptoJS.pad.Pkcs7,
        }
      );

      var output_plaintext = this.CryptoJS.enc.Latin1.stringify(plaintextArray);

      return output_plaintext;
    },
    login_student() {
      window.location.replace(process.env.VUE_APP_FENIX_LOGIN_URL);
    },
    login_partner() {
      window.location.replace("https://brain.jeec.ist/companies/");
    },
    return_website() {
      window.location.replace("https://jeec.ist/");
    },
    onSuccess(googleUser) {
      console.log(googleUser);
      console.log("***************************************************+");

      // This only gets the user information: id, name, imageUrl and email
      var profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId()); // Don't send this directly to your server!
      console.log('Full Name: ' + profile.getName());
      console.log('Given Name: ' + profile.getGivenName());
      console.log('Family Name: ' + profile.getFamilyName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    },
    
    
    
    // onSignIn(googleUser) {
    //   console.log("teste")
    //   console.log(id_token)
    //   var id_token = googleUser.getAuthResponse().id_token;
     
    //   axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + '/student/login_google', 
    //   {id_token: id_token})
    //      .then((response) => {
    //       console.log(response.data) // 
    //     });       
   
    // },
    //  onSuccess(googleUser) {
    //   console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    // },
    //  onFailure(error) {
    //   console.log(error);
    // },
    //  renderButton() {
    //   gapi.signin2.render('my-signin2', {
    //     'scope': 'profile email',
    //     'width': 240,
    //     'height': 50,
    //     'longtitle': true,
    //     'theme': 'dark',
    //     'onsuccess': onSuccess,
    //     'onfailure': onFailure
    //   });
    // }
    
  },
  created() {
    if (this.$route.query.token) {
      this.$store
        .dispatch("auth/login", [
          this.user,
          this.decrypt(this.$route.query.token),
        ])
        .then(
          () => {
            this.$router.push("/home");
          },
          () => {
            this.$store.dispatch("auth/logout");
          }
        );
    } else if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
};
</script>

<style scoped>
.login {
  height: 100vh;
  width: 100vw;
  transform: translateY(-10vh);
}

.loading {
  background-color: #f1f1f1;
  height: 100vh;
  width: 100vw;
  position: relative;
}

.loading-top {
  width: 75vw;
  position: absolute;
  top: 20%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.loading-bar {
  position: absolute;
  top: 55%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.buttons-flex {
  width: 100%;
  padding: 10vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 55%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.button {
  height: 13vw;
  display: flex;
  align-items: center;
  border-radius: 6vw;
  padding: 5vw;
  margin: 2vw;
  color: #ffffff;
  font-size: 4.5vw;
  font-weight: 650;
  cursor: pointer;
}

.icon {
  padding-right: 5vw;
  height: 7vw;
}

.loading-bottom {
  width: 32vw;
  position: absolute;
  top: 90%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

@media screen and (min-width: 550px) {
  .loading-top {
    width: 56vh;
  }

  .buttons-flex {
    padding: 0vh;
  }

  .button {
    height: 9.5vh;
    border-radius: 6vh;
    padding: 4vh;
    margin: 2vh;
    font-size: 3.4vh;
  }

  .icon {
    padding-right: 5vh;
    height: 5vh;
  }

  .loading-bottom {
    width: 24vh;
  }
}
#customBtn {
  display: inline-block;
  background: white;
  color: #444;
  width: 190px;
  border-radius: 5px;
  border: thin solid #888;
  box-shadow: 1px 1px 1px grey;
  white-space: nowrap;
}
#customBtn:hover {
  cursor: pointer;
}
span.label {
  font-family: serif;
  font-weight: normal;
}
span.icon {
  background: url('/identity/sign-in/g-normal.png') transparent 5px 50% no-repeat;
  display: inline-block;
  vertical-align: middle;
  width: 42px;
  height: 42px;
}
span.buttonText {
  display: inline-block;
  vertical-align: middle;
  padding-left: 42px;
  padding-right: 42px;
  font-size: 14px;
  font-weight: bold;
  /* Use the Roboto font that is loaded in the <head> */
  font-family: 'Roboto', sans-serif;
}
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>
