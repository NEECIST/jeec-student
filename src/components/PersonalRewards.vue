<template>
  <!-- Property of Duarte Santos -->
  <div class="personal-reward" >
    <div style="overflow: scroll; height:  auto;">
      <img src="../assets/roadmap.svg" style="width: 85vw; display: block; position: relative; left: 5vw; padding-top: 8vh; padding-bottom: 8vh;"/>
      <div class="prizes" style="position: absolute; top: 9%; left: 8%" v-if="levels[0]">
        <img  :class="[{current_prize_img: currentLevel(1)}, {prize_img: !currentLevel(1)}]" 
              :src="jeec_brain_url + levels[0].reward.image"/>
        <div class="prize-name-box">
          <p :class="[{current_prize_name: currentLevel(1)}, {prize_name: !currentLevel(1)}]">{{ '1. ' + levels[0].reward.name }}</p>
        </div>
      </div>
      <div class="prizes" style="position: absolute; top: 17%; left: 58%" v-if="levels[1]">
        <img :class="[{current_prize_img: currentLevel(2)}, {prize_img: !currentLevel(2)}]" 
             :src="jeec_brain_url + levels[1].reward.image"/>
        <div class="prize-name-box">
          <p :class="[{current_prize_name: currentLevel(2)}, {prize_name: !currentLevel(2)}]">{{ '2. ' + levels[1].reward.name }}</p>
        </div>
      </div>
      <div class="prizes" style="position: absolute; top: 24%; left: 15%" v-if="levels[2]">
        <img :class="[{current_prize_img: currentLevel(3)}, {prize_img: !currentLevel(3)}]"
             :src="jeec_brain_url + levels[2].reward.image"/>
        <p :class="[{current_prize_name: currentLevel(3)}, {prize_name: !currentLevel(3)}]">{{ '3. ' + levels[2].reward.name }}</p>
      </div>
      <div class="prizes" style="position: absolute; top: 32%; left: 52%" v-if="levels[3]">
        <img :class="[{current_prize_img: currentLevel(4)}, {prize_img: !currentLevel(4)}]"
             :src="jeec_brain_url + levels[3].reward.image"/>
        <p :class="[{current_prize_name: currentLevel(4)}, {prize_name: !currentLevel(4)}]">{{ '4. ' + levels[3].reward.name }}</p>
      </div>
      <div class="prizes" style="position: absolute; top: 47%; left: 59%" v-if="levels[4]">
        <img :class="[{current_prize_img: currentLevel(5)}, {prize_img: !currentLevel(5)}]"
             :src="jeec_brain_url + levels[4].reward.image"/>
        <p :class="[{current_prize_name: currentLevel(5)}, {prize_name: !currentLevel(5)}]">{{ '5. ' + levels[4].reward.name }}</p>
      </div>
      <div class="prizes" style="position: absolute; top: 48%; left: 10%" v-if="levels[5]">
        <img :class="[{current_prize_img: currentLevel(6)}, {prize_img: !currentLevel(6)}]"
             :src="jeec_brain_url + levels[5].reward.image"/>
        <p :class="[{current_prize_name: currentLevel(6)}, {prize_name: !currentLevel(6)}]">{{ '6. ' + levels[5].reward.name }}</p>
      </div>
      <div class="prizes" style="position: absolute; top: 60%; left: 40%" v-if="levels[6]">
        <img :class="[{current_prize_img: currentLevel(7)}, {prize_img: !currentLevel(7)}]"
             :src="jeec_brain_url + levels[6].reward.image"/>
        <p :class="[{current_prize_name: currentLevel(7)}, {prize_name: !currentLevel(7)}]">{{ '7. ' + levels[6].reward.name }}</p>
      </div>
      <div class="prizes" style="position: absolute; top: 73%; left: 59%" v-if="levels[7]">
        <img :class="[{current_prize_img: currentLevel(8)}, {prize_img: !currentLevel(8)}]"
             :src="jeec_brain_url + levels[7].reward.image"/>
        <p :class="[{current_prize_name: currentLevel(8)}, {prize_name: !currentLevel(8)}]">{{ '8. ' + levels[7].reward.name }}</p>
      </div>
      <div class="prizes" style="position: absolute; top: 75%; left: 10%" v-if="levels[8]">
        <img :class="[{current_prize_img: currentLevel(9)}, {prize_img: !currentLevel(9)}]"
             :src="jeec_brain_url + levels[8].reward.image"/>
        <p :class="[{current_prize_name: currentLevel(9)}, {prize_name: !currentLevel(9)}]">{{ '9. ' + levels[8].reward.name }}</p>
      </div>
      <div class="prizes" style="flex-direction: row; align-items: center; position: absolute; top: 87%; left: 34%" v-if="levels[9]">
        <img :class="[{current_prize_img: currentLevel(10)}, {prize_img: !currentLevel(10)}]"
             :src="jeec_brain_url + levels[9].reward.image" style="width: 15vh; height: 15vh;"/>
        <p :class="[{current_prize_name: currentLevel(10)}, {prize_name: !currentLevel(10)}]">{{ '10. ' + levels[9].reward.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// import Expbar from "@/components/Expbar.vue";

export default {
  name: "PersonalRewards",
  components: {
    // Expbar,
  },
  props: {
    levels: Array,
    user_points: Number,
    user_level: Number,
  },
  data() {
    return {
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      xpbar_width: "65vw",
      height: 30,
    };
  },
  methods: {
    currentLevel(level){
      if(level == this.user_level){
        return true;
      }
      return false;
    },
    image_index(i) {
      return (i + this.levels.length) % this.levels.length;
    },
    resize() {
      if (window.innerWidth < 1100) {
        this.xpbar_width = "65vw";
      } else {
        this.xpbar_width = "40vw";
      }

      if (window.innerWidth < 600) {
        this.height = 30;
      } else if (window.innerWidth < 1100) {
        this.height = 35;
      } else if (window.innerWidth < 1500) {
        this.height = 45;
      } else {
        this.height = 60;
      }
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
  created() {
    window.addEventListener("resize", this.resize);

    this.resize();
  },
};
</script>

<style scoped>
.personal-reward {
  font-weight: 600;
  height: auto;
  width: 100vw;
  overflow-y: visible;
}

.prizes{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.prize_img{
  z-index: 1;
  border-radius: 50%;

  position: relative;
  width: 10vh;
  height: 10vh;

  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border:  3px solid #1A9CD8;
}

.current_prize_img{
  z-index: 1;
  border-radius: 50%;

  position: relative;
  width: 10vh;
  height: 10vh;

  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border:  3px solid #D9D004;
}

.prize-name-box{
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: center;
}

.prize_name{
  padding: 5px;
  color: #1A9CD8;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.01em;
  background-color: #DDEDF3;
  border: 3px solid #1A9CD8;
  border-radius: 35px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.current_prize_name{
  padding: 5px;
  color: #D9D004;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.01em;
  background-color: #F7F3C7;
  border: 3px solid #D9D004;
  border-radius: 35px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

@media screen and (max-width: 1100px) {
  .first,
  .third,
  .rect,
  .other-points,
  .browser {
    display: none;
  }
}
</style>
