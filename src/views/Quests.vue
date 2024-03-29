<template>
  <div class="quests">
    <Buttons
      @_click="click"
      :names="{ daily: button === 'daily', special: button === 'special' }"
    />

    <div class="daily" v-if="!loading_quests" v-show="button === 'daily'">
      <div class="activities-wrapper">
        <Activity
          v-for="quest in quests"
          :key="quest.name + quest.type"
          :activity="quest"
        />
      </div>

      <div class="quests-warning">
        <p class="searching" v-if="!quests || quests.length === 0"></p>
        <span class="warning-msg">For more quests go to</span>
        <router-link to="/activities" class="warning-msg activities-link">
          Activities</router-link
        >
      </div>
    </div>
    <div v-else class="loading">
      <v-progress-circular
        indeterminate
        color="#27ade4"
        :size="100"
        :width="10"
        class="loading-bar"
      ></v-progress-circular>
    </div>

    <div class="special" v-show="button === 'special'">
      <Quest
        :image="require('../assets/icons/cv.svg')"
        :description="cv_description"
        :points="reward_cv"
        :done="currentUser.uploaded_cv"
      />
      <Quest
        :image="require('../assets/icons/linkedin.svg')"
        :description="linkedin_description"
        :points="reward_linkedin"
        :done="has_linkedin"
      />
      <Quest
        v-for="date in currentUser.login_dates"
        :key="date"
        :image="require('../assets/icons/login.svg')"
        :description="'<b>Logged in on ' + date.substring(0, 6) + '</b>'"
        :points="reward_login"
        :done="true"
      />
    </div>
  </div>
</template>

<script>
import Buttons from "@/components/Buttons.vue";
import Activity from "@/components/Activity.vue";
import Quest from "@/components/Quest.vue";
import UserService from "../services/user.service";

export default {
  name: "Quests",
  components: {
    Activity,
    Quest,
    Buttons
  },
  data: function() {
    return {
      button: "daily",
      quests: [],
      cv_description:
        "<b>Add your CV to your <a href=" +
        '"/profile"' +
        ' style="color:#27ade4;text-decoration:none;">Profile</a></b>',
      linkedin_description:
        "<b>Add your linkedin to your <a href=" +
        '"/profile"' +
        ' style="color:#27ade4;text-decoration:none;">Profile</a></b>',
      loading_quests: true,
      reward_cv: process.env.VUE_APP_REWARD_CV,
      reward_linkedin: process.env.VUE_APP_REWARD_LINKEDIN,
      reward_login: process.env.VUE_APP_REWARD_LOGIN
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    has_linkedin() {
      if (this.$store.state.auth.user.linkedin_url) {
        return true;
      }
      return false;
    }
  },
  methods: {
    click(name) {
      if (name !== this.button) {
        this.button = name;
      }
    }
  },
  created() {
    if (!this.currentUser) {
      this.$router.push("/");
    }

    UserService.getQuests().then(
      response => {
        this.quests = response.data.data;
        this.loading_quests = false;
      },
      error => {
        console.log(error);
        this.loading_quests = false;
      }
    );
  }
};
</script>

<style scoped>
.quests {
  background-color: #e6e6e6;
}

.daily,
.special {
  margin-top: 8vh;
}

.daily,
.special {
  height: 82vh;
  overflow-y: auto;
}

.no-activities-warning {
  margin-top: 16vh;
}

.quests-warning {
  padding-top: 3vh;
  text-align: center;
  margin-bottom: 3vh;
}

.searching {
  font-size: 3vh;
  font-weight: 600;
}

.warning-msg {
  font-size: 2.7vh;
  font-weight: 500;
}

.activities-link {
  color: #27ade4;
  font-weight: 600;
  text-decoration: none;
}

.loading {
  text-align: center;
  margin-top: 35vh;
}

</style>
