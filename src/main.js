import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex';
import store from './store';
import VueCryptojs from 'vue-cryptojs';
// import GSignInButton from 'vue-google-signin-button'
// Vue.use(GSignInButton)
import GoogleLogin from 'vue-google-login';
import  LoaderPlugin  from 'vue-google-login';


Vue.use(VueCryptojs)
Vue.config.productionTip = false
Vue.use(LoaderPlugin, {
  client_id: '286554998545-hsatr3tkmeskks4r3r4eb7vcfsbv25h7.apps.googleusercontent.com'
});


new Vue({
  router,
  vuetify,
  Vuex,
  store,
  render: h => h(App)
}).$mount('#app')
