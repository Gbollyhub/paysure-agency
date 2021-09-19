<template>
  <div>
    <Loader v-show="loader" />
    <div class="login-block">
      <div class="row">
        <div class="col-lg-5">
          <router-link to="/">
            <img class="img-abs" src="../assets/paysure_White.png" />
          </router-link>

          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-ride="carousel"
          >
            <carousel :autoplay="true" :nav="true" :items="1">
              <img src="../assets/pic.png" style="height:100vh !important" />
            </carousel>
          </div>
        </div>
        <div
          class="col-lg-7 d-flex justify-content-center align-items-center  "
          style="overflow:auto;height:100vh"
        >
         <img src="../assets/step2.png" class="otp-stepper"/>
          <form @submit.prevent="submitForm">
            <div class="container">
              <div class="success-container d-flex flex-column">
                <span class="icon"><i class="fas fa-check"></i></span>
          
                <h2 v-if="notResetOtp" class="col-lg-8 mt-4 text-center" style="color:#5323D7">
                  Verify your Phone Number
                </h2> 
                <h2 v-else class="col-lg-8 mt-4 text-center" style="color:#5323D7">
                  Resend OTP
                </h2> 


                <p v-if="notResetOtp" class="col-lg-8 mt-4" style="text-align:center;">
                  Fill in your Phone Number and the 6-digit code sent to your phone. Enter to verify
                  your account.
                </p>             
                <p v-else class="col-lg-8 mt-4" style="text-align:center;">
                  Fill in your Phone Number below to continue
                </p>         
             

                <br/><br/>
 <input
                        type="text"
                        class="form-control"
                        id="formGroupExampleInput"
                        placeholder="Phone Number"
                        v-model="phoneNumber"
                        required
                         autocomplete="off"
                         style="width:45%"
                         v-if="notResetOtp"
                      />
                       <input
                       v-else
                        type="text"
                        class="form-control"
                        id="formGroupExampleInput"
                        placeholder="Phone Number"
                        v-model="phoneNumber"
                        required
                         autocomplete="off"
                         style="width:100%"
                      />
                <div class="pin-code mt-5" id="pincode" v-on="handlers" v-show="notResetOtp">
                  <input
                    type="number"
                    maxlength="1"
                    autofocus
                    v-model="first"
                  />
                  <input type="number" maxlength="1" v-model="second" required/>
                  <input type="number" maxlength="1" v-model="third" required/>
                  <input type="number" maxlength="1" v-model="fourth" required/>
                  <input type="number" maxlength="1" v-model="fifth" required/>
                  <input type="number" maxlength="1" v-model="sixth" required/>
                </div>
                <br/>
                <div v-if="notResetOtp" @click="notResetOtp = false" class="resend-otp">Resend Otp</div>
                <div v-else @click="notResetOtp = true" class="resend-otp">Already have an Otp</div>
              </div>
              <br/>
              <div class="d-flex justify-content-center" v-if="notResetOtp">
                <button
                  class="btn-login col-lg-6 mt-5"
                  type="submit"
                  >Submit</button
                >
              </div>
                            <div class="d-flex justify-content-center" v-else>
                <button
                  class="btn-login col-lg-6 mt-5"
                  @click="resendOTP"
                  >Resend OTP</button
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/loader.vue";
export default {
  name: "TokenPage",
  components: {
    Loader,
  },
  data() {
    const vm = this;
    return {
      phoneNumber: "",
      loader: false,
      baseurl:process.env.VUE_APP_BASE_URL,
      handlers: {
        keyup: vm.keyUp,
        keydown: vm.keyDown,
      },
      first: "",
      second: "",
      third: "",
      fourth: "",
      fifth: "",
      sixth: "",
      notResetOtp:true
    };
  },

  methods: {
    keyUp(event) {
      // var pinContainer = document.getElementById('pincode').getElementsByTagName('Input');
      //  var pinContainer = document.querySelector(".pin-code");

      const target = event.srcElement;

      var maxLength = parseInt(target.attributes["maxlength"].value, 10);
      var myLength = target.value.length;

      if (myLength >= maxLength) {
        let next = target;

        while ((next = next.nextElementSibling)) {
          if (next === null) break;
          if (next.tagName.toLowerCase() == "input") {
            next.focus();
            break;
          }
        }
      }

      if (myLength === 0) {
        var next = target;
        while ((next = next.previousElementSibling)) {
          if (next === null) break;
          if (next.tagName.toLowerCase() == "input") {
            next.focus();
            break;
          }
        }
      }
    },
    keyDown(event) {
      var target = event.srcElement;

      target.value = "";
    },

    async resendOTP(){
            try {
        this.loader = true;
        const user = await this.axios.post(
          `${this.baseurl}/users/resendOtp?phoneNumber=${this.phoneNumber}`, 
        );
        if (user.data.data.responseCode === 0) { 
          this.loader = false;   
           this.$toast.open({
            message: `<p style="color:white;">${user.data.data.responseMessage}</p>`,
            type: "success",
            duration: 5000,
            dismissible: true,
            position: "top-right",
          });
          this.notResetOtp = true
           this.$router.push("/phone-token");
          // const currentUser = JSON.parse(user.data.data)
          
       
        } else {
          this.loader = false;
          this.$toast.open({
            message: `<p style="color:white;">${user.data.data.responseMessage}</p>`,
            type: "error",
            duration: 5000,
            dismissible: true,
            position: "top-right",
          });
        }
      } catch (e) {
        this.loader = false;
        this.$toast.open({
          message: `<p style="color:white;">${e}</p>`,
          type: "error",
          duration: 5000,
          dismissible: true,
          position: "top-right",
        });
        console.log(e);
      }
    },

    async submitForm() {
      const formInput =
        this.first +
        this.second +
        this.third +
        this.fourth +
        this.fifth +
        this.sixth;
      console.log(formInput, "formInput");
      
      try {
        this.loader = true;
        const user = await this.axios.post(
          `${this.baseurl}/users/verifycodewithphone?phoneNumber=${this.phoneNumber}?OTP=${formInput}`, 
        );
        if (user.data.data.responseCode === 0) {
         
           this.first= "";
      this.second= "";
      this.third= "";
      this.fourth= "";
      this.fifth= "";
      this.sixth="";
      
           this.$toast.open({
            message: `<p style="color:white;">${user.data.data.responseMessage}</p>`,
            type: "success",
            duration: 5000,
            dismissible: true,
            position: "top-right",
          });
           this.$router.push("/verifysuccess");
          // const currentUser = JSON.parse(user.data.data)
          this.loader = false;
       
        } else {
          this.loader = false;
          this.$toast.open({
            message: `<p style="color:white;">${user.data.data.responseMessage}</p>`,
            type: "error",
            duration: 5000,
            dismissible: true,
            position: "top-right",
          });
        }
      } catch (e) {
        this.loader = false;
        this.$toast.open({
          message: `<p style="color:white;">${e}</p>`,
          type: "error",
          duration: 5000,
          dismissible: true,
          position: "top-right",
        });
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.otp-stepper{
  position: absolute;
  top:5%;
  right: 5%;
  height: 30px !important;
}
.resend-otp{
  cursor: pointer;
  color: #5323d7;
  font-size: 14px;
  text-decoration: underline;
}
.pin-code {
  padding: 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.pin-code input {
  border: none;
  text-align: center;
  width: 48px;
  height: 48px;
  font-size: 36px;
  background-color: #f3f3f3;
  margin-right: 5px;
  color: #5323d7;
}

.pin-code input:focus {
  border: 1px solid #573d8b;
  outline: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
<style scoped>
.icon {
  height: 100px;
  width: 100px;
  border-radius: 25px;
  color: #fff;
  background-color: #5323d7;
  font-size: 40px;
}
.success-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-block {
  height: auto;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  max-width: 100%;

  background: var(--body-color);
}
.title {
  color: var(--primary-color);
}
.title-2 {
  font-size: var(--normal-font);
  color: var(--text-color);
  font-size: var(--smaller-font-size);
}

/* padding: 50px 0;
}

.carousel-height{
  height: auto;
}


.carousel-inner {
	border-radius: 0 10px 10px 0;
}

.carousel-caption {
	text-align: left;
	left: 5%;
}*/
.form-info {
  padding: 20px;
  border: 1px solid grey;
  margin-top: 1rem;
  background-color: var(--body-color);
}
.resize {
  margin-top: 1rem;
  padding: 2rem;
}
.carousel-indicators {
  position: absolute;
  right: 0;

  left: 0;
  bottom: 158px;
  z-index: 15;

  margin-right: auto;
  margin-left: auto;
  list-style: none;
}
.pull-right {
  display: flex;
  justify-content: space-between;
}

@media screen and (max-width: 992px) {
  .login-block {
    overflow: auto;
  }
  .carousel-indicators {
    bottom: 0;
  }
  .carousel {
    display: none;
  }
}

.btn-login {
  padding: 10px 10px;
  background-color: var(--primary-color);
  color: var(--white-color);
  border-radius: 4px;
  width: 400px;
  height: 52px;

  cursor: pointer;
  -moz-transition: box-shadow 1s;
  -o-transition: box-shadow 1s;
  -webkit-transition: box-shadow 1s;
  transition: box-shadow 1s;
}

.banner-sec {
  display: flex;
  align-items: center;
  /* justify-content: center; */
}
.img-abs {
  position: absolute;
  max-width: 100% !important;
  z-index: 2;
  height: 30px !important;
  margin: 20px;
  top: 0px;
}
.carousel-indicators li {
  width: 30px !important;
  height: 10px !important;
  border-radius: 50% !important;
}
.carousel-indicators {
  width: 40px !important;
  height: 15px;
  border-radius: 50% !important;
}
/* .carousel-inner {
  background-image: url(../../assets/images/Overlay.svg);
} */
.btn-prev {
  background: var(--body-color);
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  /* padding: 10px 10px; */
  border-radius: 4px;
  width: 100%;
  height: 52px;
  cursor: pointer;
  -moz-transition: box-shadow 1s;
  -o-transition: box-shadow 1s;
  -webkit-transition: box-shadow 1s;
  transition: box-shadow 1s;
}
</style>
