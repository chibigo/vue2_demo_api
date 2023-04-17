<template>
  <v-app>
    <v-dialog
      :value="dialogRegister"
      persistent
      max-width="600px"
      min-width="360px"
    >
      <div>
        <v-tabs
          show-arrows
          background-color="deep-purple accent-4"
          icons-and-text
          dark
          grow
        >
          <v-tabs-slider color="purple darken-4"></v-tabs-slider>
          <v-tab>
            <v-icon large>{{ tab.icon }}</v-icon>
            <div class="caption py-1">{{ tab.name }}</div>
          </v-tab>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <v-form ref="registerForm" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="username"
                        :rules="[rules.required]"
                        label="Username"
                        maxlength="20"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 6 characters"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        block
                        v-model="verify"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, passwordMatch]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Confirm Password"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="12" md="3">
                      <v-btn
                        large
                        block
                        :disabled="!valid"
                        color="deep-purple"
                        @click="registerUser"
                        >Register
                      </v-btn>
                    </v-col>
                    <v-col class="ml-auto" cols="12" md="3">
                      <v-btn
                        large
                        block
                        :disabled="!valid"
                        color="blue-grey lighten-3"
                        @click="registerUserClose"
                        >Close
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  props: {
    dialogRegister: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tab: {
        name: "Register",
        icon: "mdi-account-outline",
      },
      valid: true,

      username: "",
      email: "",
      password: "",
      verify: "",
      loginEmail: "",
      loginEmailRules: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      emailRules: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],

      show1: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => (v && v.length >= 6) || "Min 6 characters",
      },
    };
  },
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
  },
  methods: {
    async registerUser() {
      const registerData = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      try {
        if (this.$refs.registerForm.validate()) {
          await this.axios
            .post("http://localhost:8080/api/auth/signup", registerData)
            .then(async (response) => {
            //   await this.getdata();
            //   this.messageAlert = response.data;
                console.log(response);
            });
        } else {
          this.$refs.registerForm.validate();
        }
      } catch (error) {
        console.log(error.response.data);
      }
    },
    reset() {
      this.$refs.registerForm.reset();
    },
    resetValidation() {
      this.$refs.registerForm.resetValidation();
    },
    registerUserClose() {
      this.$emit("dialogRegisterClose");
    },
  },
};
</script>

<style lang="scss" scoped></style>
