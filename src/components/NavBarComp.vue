<template>
  <div>
    <v-card class="d-flex">
      <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-title>John Leider</v-list-item-title>

          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            @click="getAction(item)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class="main_content"><router-view /></v-main>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home-city", action: this.homePage },
        { title: "My Account", icon: "mdi-account", action: this.MyAccount },
        { title: "Users", icon: "mdi-account-group-outline", action: this.UserPage},
        {
          title: "Logout",
          icon: "mdi-arrow-right-bold-box",
          action: this.logOut,
        },
      ],
      mini: true,
    };
  },
  methods: {
    logOut() {
      localStorage.removeItem("accessToken");
      this.$router.push("/login");
    },
    homePage() {
      this.$router.push("/");
    },
    MyAccount() {
      this.$router.push("/myaccount");
    },
    UserPage(){
      this.$router.push("/users");
    },
    getAction(item) {
      return item.action ? item.action() : () => {};
    },
  },
};
</script>

<style lang="scss" scoped>
.main_content {
  height: 100%;
}
</style>
