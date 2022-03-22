<template>
  <div class="lootbox-wrapper" v-if="lootboxes && student_lootboxes">
    <center class="rewards-wrapper">
      <div>
        <div class="king-rewards">
          <div class="king-reward">
            <div style="width:95%;">
              <div class="lootbox-title">
                <p>Your lootboxes </p>
                <img
                  src="../assets/icons/icons8-info.svg"
                  alt=""
                  class="info_icon"
                />
              </div>
              <div class="your-lootboxes">
                <div v-for="(student_lootbox, i) in student_lootboxes" :key="i" >
                  <div v-if="student_lootbox.opened" style="margin-left:2vh; margin-right:2vh;" v-on:click="click($event)" :id="student_lootbox.lootbox+' '+student_lootbox.opened">
                    <div class="your-lootboxes-images"
                      :style="
                        'background-image:' +
                        'url(' +
                        jeec_brain_url +
                        student_lootbox.icon +
                        ')'
                      ">
                    </div>
                    <div class="your-lootboxes-title">{{student_lootbox.lootbox}} lootbox opened</div>
                  </div>
                  <div v-if="!student_lootbox.opened" v-on:click="click($event)" :id="student_lootbox.lootbox+' '+student_lootbox.opened">
                    <div class="your-lootboxes-images"
                      :style="
                        'background-image:' +
                        'url(' +
                        jeec_brain_url +
                        student_lootbox.icon +
                        ')'
                      ">
                    </div>
                    <div class="your-lootboxes-title">{{student_lootbox.lootbox}} lootbox</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-for="(lootbox, i) in lootboxes" :key="i">
        <div class="king-rewards">
          <div class="king-reward" >
            <div>
              <div class="lootbox-title">
                <p>{{lootbox.name}} lootbox </p>
                <img
                  src="../assets/icons/icons8-info.svg"
                  alt=""
                  class="info_icon"
                />
                <div class="lootbox-image" :style="
                  'background-image:' +
                  'url(' +
                  jeec_brain_url +
                  lootbox.icon +
                  ')'
                "
                ></div>
              </div>
              <div class="lootbox-rewards">
                <div v-for="(reward, i) in lootbox.rewards.data" :key="i">
                  <div
                    class="lootbox-rewards-image"
                    :class="lootbox.name"
                    :style="
                      'background-image:' +
                      'url(' +
                      jeec_brain_url +
                      reward.reward.image +
                      ')'
                    "
                  ></div>
                  <div class="lootbox-rewards-title">{{reward.reward.name}}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
    </center>
  </div>
</template>

<script>
export default {
  name: "LOOTBOXRewards",
  props: {
    lootboxes: Array,
    student_lootboxes: Array,
  },
  data() {
    return {
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
    };
  },
  computed: {},
  methods: {
    click: function(event) {
      let targetId = event.currentTarget.id;
      console.log(targetId); // returns 'foo'
      alert(targetId);
    }
  },
};
</script>

<style scoped>
.lootbox-wrapper {
  font-weight: 600;
  height: 90vh;
  overflow-y: auto;
}

.rewards-wrapper > div > div {
  background-color: #f1f1f1;
  padding-top: 1vh;
}

.rewards-wrapper > div:not(:first-of-type) {
  margin-top: 1vh;
}

._title {
  font-size: 2.7vh;
  margin-bottom: 2vh;
}

.lootbox-rewards {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding-left:2vh;
}

.lootbox-rewards-image {
  position: relative;
  width: 28vw;
  height: 28vw;
  border-radius: 50%;
  border: 0.5vh solid #27ade4;
  box-shadow: 0 0 2.5vh 0.7vh #27ade4;
  margin-top: 4vh;
  margin-left: 1vw;
  margin-right: 1vw;
  background-color: white;
  background-size: 85%;
  background-repeat: no-repeat;
  background-position: center;
}

.lootbox-rewards-title{
  position: relative;
  font-size: 1.1vw;
  margin-top: 1vh;
  margin-bottom: 1vh;
}

.lootbox-image {
  position: relative;
  width: 6vh;
  height: 6vh;
  margin-top: 0vh;
  margin-left: 1vh;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.your-lootboxes {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding-left:2vh;
}

.your-lootboxes-images {
  position: relative;
  width: 7.5vw;
  height: 7.5vw;
  margin-top: 1vh;
  margin-left: 2vw;
  margin-right: 2vw;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.your-lootboxes-title{
  position: relative;
  font-size: 1.1vw;
  margin-bottom: 1vh;
}

.lootbox-title{
  position: relative;
  display: flex;
  width: 100%;
  align-items: left;
  margin-left: 3vh;
  font-size: 4vh;
}

.Gold{
  border: 0.5vh solid #FFC02E !important;
  box-shadow: 0 0 2.5vh 0.7vh #FFC02E !important;
}

.Silver{
  border: 0.5vh solid #BCBCBC !important;
  box-shadow: 0 0 2.5vh 0.7vh #BCBCBC !important;
}

.Bronze{
  border: 0.5vh solid #DC8A26 !important;
  box-shadow: 0 0 2.5vh 0.7vh #DC8A26 !important;
}

.lootbox-title .info_icon {
  position: relative;
  width: 3vh;
  top: 0;
  margin-top: -1.5vh;
  margin-left: 1vh;
}

.king-rewards {
  padding-bottom: 3vh;
}

.king-reward {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 3vh;
  font-size: 3vh;
}


@media screen and (max-width: 1100px) {
  .lootbox-wrapper {
    height: 82vh;
  }
}

@media screen and (min-width: 1100px) {
  ._title {
    font-size: 3.5vh;
  }

  .lootbox-rewards-image {
    width: 9vw;
    height: 9vw;
  }
}
</style>
