<template>
  <div class="form_login">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="nameOrEmail"
        :rules="nameOrEmailRules"
        label="Name || Email"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        counter
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules"
        :type="showPassword ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 6 characters"
        @click:append="showPassword = !showPassword"
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        :rules="[(v) => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <div class="button_form">
        <div class="button_form_login">
          <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">
            Confirm
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
        </div>
        <div class="button_form_register">
          <v-btn color="primary" class="mr-4" @click="registerFormDialog"> Register </v-btn>
        </div>
      </div>
    </v-form>
    <RegisterViewVue 
      :dialogRegister="dialogRegister"
      @dialogRegisterClose = dialogRegisterClose
    />
  </div>
</template>

<script>
import RegisterViewVue from "./RegisterView.vue";
export default {
  components: {
    RegisterViewVue,
  },
  data() {
    return {
      dialogRegister:false,
      showPassword: false,
      valid: true,
      nameOrEmail: "check01",
      password: "123123",
      error: "",
      // Rules
      nameOrEmailRules: [(v) => !!v || "Name is required"],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "Min 6 characters",
      ],
      checkbox: false,
    };
  },
  methods: {
    async login() {
      const loginData = {
        username: this.nameOrEmail,
        password: this.password,
      };
      try {
        if (this.$refs.form.validate()) {
          await this.axios
            .post("http://localhost:8080/api/auth/signin", loginData)
            .then(async (response) => {
              if (response.data.accessToken) {
                //Store token in localStorage
                localStorage.setItem("accessToken", response.data.accessToken);
                // Redirect to dashboard or perform other actions
                this.$router.push("/");
              } else {
                throw new Error("Invalid username or password");
              }
            });
        } else {
          this.$refs.form.validate();
        }
      } catch (error) {
        console.log(error.response.data);
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    registerFormDialog(){
      this.dialogRegister = true;
    },
    dialogRegisterClose(){
      this.dialogRegister = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.form_login {
  width: 30vw;
  margin: 0 auto;
  .button_form{
    display: flex;
    justify-content: space-between;
  }
}
</style>
