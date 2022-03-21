<template>
  <div class="qrcode">
    <h1 style="text-align: center; margin-bottom: 2vh;">Show this code to companies in the Job Fair!</h1>
    <center>
      <qrcode-vue :size="qrcode_size" :value="currentUser.ist_id"></qrcode-vue>
    </center>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  name: "QRCode",
  components: {
    QrcodeVue,
  },
  data: function () {
    return {
      qrcode_size: 100,
    };
  },
  methods: {
    resize() {
      console.log("here")
      if (window.innerWidth < 600) {
        this.qrcode_size = window.screen.width * 0.8;
      }
      else {
        this.qrcode_size = window.screen.width * 0.4;
      }
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }
    this.resize();
    window.addEventListener("resize", this.resize);
  },
};
</script>

<style scoped>
.qrcode {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 90vh;
}
</style>
