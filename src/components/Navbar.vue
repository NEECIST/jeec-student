<template>
  <div class="navbar" v-if="page !== 'Login'">
    <div class="top">
      <img
        @click="page !== 'Home' ? $router.push('/home') : ''"
        alt="jeec logo"
        src="../assets/jeec_logo_mobile.svg"
        class="top-image"
        width="20vw"
        style="width: auto; height: 7.5vh; position: absolute;"
      />
      <div class="top-name" style="width: 50vw;">
        <p>{{ $route.name }}</p>
      </div>
      <button>
        <img
          @click.stop="display_menu = !display_menu"
          alt="menu icon"
          src="../assets/icons/menu_azul.svg"
          class="top-start"
        />
      </button>
    </div>
    <v-navigation-drawer
      style="height: 100vh; width:70vw"
      v-model="display_menu"
      fixed
      dark
      color="#C5E4F0"
      right
      temporary
      :width="width * 0.82"
  
    >
      <NavbarMenu />
    </v-navigation-drawer>
  </div>
</template>

<script>
import LogService from "../services/log.service";
import NavbarMenu from "./NavbarMenu.vue";

export default {
  name: "Navbar",
  components: {
    NavbarMenu,
  },
  data: function () {
    return {
      page: this.$route.name,
      display_menu: false,
      width: window.innerWidth,
    };
  },
  methods: {
    redirect(target) {
      if (target !== this.page) this.$router.push({ name: target });
    },
    resize() {
      this.width = window.innerWidth;
    },
  },
  watch: {
    //or $route(to, from)
    async $route(to) {
      if (to.name !== "Login") {
        LogService.postLog(to.fullPath);
      }
      
      this.page = to.name;
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    nameArray() {
      var names = this.$store.state.auth.user.name.split(" ");

      if (names.length > 1) return names;
      else return [this.$store.state.auth.user.name, ""];
    },
  },
};
</script>

<style scoped>
.navbar {
  color: #FFFCF8;
  padding-bottom:5vh;
}

.top {
  width: 100vw;
  background-color: #FFFCF8;
  height: 10vh;
  position: fixed;
  z-index: 3;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.top-start {
  position: absolute;
  right: 5px;
  top: 50%;
  height: 10vh;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.top-image {
  position: absolute;
  left: 5%;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.top-name{
  position: absolute;
  left: calc(50vw - 25vw);
  top: calc(5vh - 17px);
  text-align: center;
  text-transform: uppercase;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 34px;

  color: #D93046;
}
</style>
