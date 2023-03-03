<template>
  <div class="squad-creation">
    <div class="squad-create">
      <div>
        <input
        type="text"
        placeholder="New Squad"
        v-model="name"
        class="squad-input"
        :class="{ input_exists: name.length }"
      />
      <br>
      <input
        type="text"
        placeholder="Motto"
        v-model="cry"
        class="squad-input"
        :class="{ input_exists: cry.length }"
      />
      </div>
     
        <div
          v-show="!image_uploaded"
          class="image-input disabled"
          @click.stop="input_click"
        >
          <p>Add<br />Photo</p>
        </div>
        <input
          type="file"
          accept="image/*"
          ref="image_input"
          @change="input_file"
          style="display: none"
        />
        <img
          v-show="image_uploaded"
          @click.stop="input_click"
          class="squad-image"
          src=""
          alt="uploaded-image"
          ref="uploaded_image"
        />
     
     

      
    </div>
   
        <button @click.stop="create_squad" class="button" v-if="!loading">
          <span class="plus-symbol">⊕</span> Create squad
        </button>
        
        <v-progress-circular
          v-else
          style="margin-top: 3vh"
          indeterminate
          color="#27ade4"
          :size="80"
          :width="8"
          class="loading-bar"
        ></v-progress-circular>
     

      <p class="error-msg">{{ error }}</p>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "SquadCreation",
  data: function () {
    return {
      files: [],
      image_uploaded: false,
      name: "",
      cry: "",
      error: "",
      loading: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    locked() {
      return this.image_uploaded && this.name.length && this.cry.length;
    },
  },
  methods: {
    input_click() {
      this.$refs.image_input.click();
    },
    input_file(event) {
      this.files = event.target.files;

      if (this.files.length == 1) {
        var reader = new FileReader();
        var img = this.$refs.uploaded_image;

        reader.onload = function (_event) {
          img.src = _event.target.result;
        };

        reader.readAsDataURL(this.files[0]);
        this.image_uploaded = true;
      }
    },
    create_squad() {
      if (!this.locked){
        this.error = "Invalid information for new squad"
        return;
      } 
      this.loading = true;
      var image = this.$refs.image_input;

      UserService.createSquad(image.files[0], this.name, this.cry)
        .then((response) => {
          this.$emit("create", response.data.data);
          this.error = "";
          this.$emit("notification", "Squad created successfully", "success");
          this.loading = false;
        })
        .catch((error) => {
          this.error = error.response.data.error;
          console.log(error);
          this.$emit("notification", "Failed to create squad", "error");
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
/* .squad-creation {

} */

.squad-creation-title{
  text-align:center;
  font-size:8vw;
  font-weight: 600;
}

.n-squad-header {
  background-color: #FFFCF8;
  padding: 2vh;
  text-align: center;
  font-size: 2.5vh;
  font-weight: 600;
  margin-bottom: 0.5vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.n-squad-header p {
  margin: 0;
  padding-top: 0.8vh;
  padding-bottom: 0.8vh;
}

.squad-create {
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 5vw;
  padding-right: 5vw;
  display:flex;
  justify-content: space-around;
  align-items: center;
}

.image-input {
  background-color: white;
  border-radius: 50%;
  border: 5px solid #03618C;
  height: 13vh;
  width: 13vh;
  position: relative;
  cursor: pointer;
}

.image-input p {
  text-align: center;
  vertical-align: middle;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5vh;
  font-weight: 600;
}

.squad-image {
  height: 13vh;
  width: 13vh;
  border-radius: 50%;
  border: 5px solid #03618C;
  cursor: pointer;
}

.squad-input {
  font-size: 2.5vh;
  font-weight: 600;
  margin-top:2vh;
  margin-bottom:2vh;
  padding-left: 2vw;
  width: 30vw;
  min-width:200px;
  height: 6vh;
  background: rgba(26, 156, 216, 0.15);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  border-left: 13px solid #1A9CD8
}

.input_exists {
  border: 0.1vh solid #27ade4 !important;
  box-shadow: 0 0.3vh 1.5vh 0.1vh #27ade4 !important;
}

.button {
  font-size: 4vh;
  font-weight: 600;
  width: auto;
  height: auto;
  padding-top: 1vh;
  padding-bottom: 1vh;
  margin-left: 10vw;
  margin-right: 1vw;
  margin-top: 4vh;
}

.plus-symbol{
  color:  #03618C;

}

.error-msg {
  text-align: center;
  font-size: 4vh;
  font-weight: 700;
  color: red;
  margin-top: 2vh;
}
</style>
