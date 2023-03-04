<template>
  <div class="rewards">
    <!-- <Buttons
      @_click="click"
      :names="{
        personal: button === 'personal',
        squad: button === 'squad',
        jeecpot: button === 'jeecpot',
        kings: button === 'kings',
      }"
    /> -->
    
        
        <div class="arrow-buttons">
          <button @click="lessDay"><v-icon class="arrow" color="blue">mdi-chevron-left</v-icon
            ></button>
            <button @click="moreDay"><v-icon class="arrow" color="blue"
              >mdi-chevron-right</v-icon
            ></button>
        </div>
            <!-- <div class="prize-wrapper" justify="center" v-show="page==1">
              <p class="prize-type">Roadmap</p>
              <PersonalRewards
                style="margin-top: 10vh;"
                :levels="levels"
                :user_points="currentUser.total_points"
                :user_level="currentUser.level.data.value"
              />
            </div> -->
          
          
            <div class="prize-wrapper" justify="center" v-show="page==1">
              <p class="prize-type">Daily Squad</p>
              <SquadRewards
                style="margin-top: 10vh;"
                :squad="squad"
                :squads_rewards="squads_rewards"
                :squad_points="squad ? squad.daily_points : 0"
              />
            </div>
        
         
            <div class="prize-wrapper" justify="center" v-show="page==2">
              <p class="prize-type">Jeecpot</p>
              <JEECPOTRewards
                style="margin-top: 8vh"
                :jeecpot_rewards="jeecpot_rewards"
              />
            </div>
            <div class="prize-wrapper" justify="center" v-show="page==3">
              <p class="prize-type">Kings</p>
              <KingsRewards
                style="margin-top: 8vh"
                :jeecpot_rewards="jeecpot_rewards"
              />
            </div>
      <!-- <PersonalRewards
        style="margin-top: 15vh"
        v-if="button === 'personal'"
        :levels="levels"
        :user_points="currentUser.total_points"
        :user_level="currentUser.level.data.value"
      />

      <SquadRewards
        style="margin-top: 15vh"
        v-if="button === 'squad'"
        :squads_rewards="squads_rewards"
        :squad_points="squad ? squad.daily_points : 0"
      />

      <JEECPOTRewards
        style="margin-top: 8vh"
        v-if="button === 'jeecpot'"
        :jeecpot_rewards="jeecpot_rewards"
      />

      <KingsRewards
        style="margin-top: 8vh"
        v-if="button === 'kings'"
        :jeecpot_rewards="jeecpot_rewards"
      /> -->
  </div>
</template>

<script>
// import Buttons from "@/components/Buttons.vue";
// import PersonalRewards from "@/components/PersonalRewards.vue";
import SquadRewards from "@/components/SquadRewards.vue";
import JEECPOTRewards from "@/components/JEECPOTRewards.vue";
import KingsRewards from "@/components/KingsRewards.vue";
import UserService from "../services/user.service";

export default {
  name: "Rewards",
  components: {
    // PersonalRewards,
    SquadRewards,
    JEECPOTRewards,
    KingsRewards,
    // Buttons,
  },
  data: function () {
    return {
      levels: [],
      squads_rewards: [],
      jeecpot_rewards: null,
      squad: null,
      button: "personal",
      loading_squad: true,
      loading_levels: true,
      loading_squad_rewards: true,
      loading_jeecpot_rewards: true,
      page:1,
      types: [
        "Roadmap",
        "Daily Squad",
        "Jeecpot",
        "Kings",
      ],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    click(name) {
      if (name !== this.button) {
        this.button = name;
      }
    },
    moreDay(){
      this.page++;
      if(this.page==4){
        this.page=1
      }
    },
    lessDay(){
      this.page--;
      if(this.page==0){
        this.page=3
      }
    }
  },
  created() {
    if (!this.currentUser) {
      this.$router.push("/");
    }

    UserService.getLevels().then(
      (response) => {
        this.levels = response.data.data;
        this.loading_levels = false;
      },
      (error) => {
        console.log(error);
        this.loading_levels = false;
      }
    );

    UserService.getSquadsRewards().then(
      (response) => {
        this.squads_rewards = response.data.data;
        this.loading_squad_rewards = false;
      },
      (error) => {
        console.log(error);
        this.loading_squad_rewards = false;
      }
    );

    UserService.getJEECPOTRewards().then(
      (response) => {
        this.jeecpot_rewards = response.data;
        this.loading_jeecpot_rewards = false;
      },
      (error) => {
        console.log(error);
        this.loading_jeecpot_rewards = false;
      }
    );

    UserService.getUserSquad().then(
      (response) => {
        this.squad = response.data.data;
        this.loading_squad = false;
      },
      (error) => {
        console.log(error);
        this.loading_squad = false;
      }
    );
  },
};
</script>

<style scoped>

.prize-wrapper{
  position:relative;
  top:-15vh;
}
.prize-type{
  position: relative;
  width: 100vw;
  text-align: center;
  top: 13vh;
  padding-bottom:7vh;
  text-transform: uppercase;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  padding-top: 2vh;
  /* identical to box height */

  letter-spacing: 0.01em;

  color: #000000;
}

.rewards {
  background-color: #FFFCF8;
  height: auto;
  margin-top:10vh;
}

.loading {
  text-align: center;
  margin-top: 35vh;
}

.arrow{
  font-size:70px;
  z-index:2;
}

.arrow-buttons{
  display:flex;
  position:absolute;
  top:10vh;
  width:100vw;
  font-size:70px;
  justify-content: space-between;
  align-items: start;
}

@media screen and (min-width: 1100px) {
  .buttons {
    display: flex;
    justify-content: center;
  }
}

</style>