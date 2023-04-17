<template>
  <v-app>
    <div id="app">
      <img alt="Vue logo" src="./assets/logo.png" />
      <router-view />
      <!-- <NavBarCompVue/> -->
    </div>
  </v-app>
</template>

<script>
// import NavBarCompVue from './components/NavBarComp.vue';
export default {
  name: "App",
  components:{
    // NavBarCompVue
  }
};
</script>

<style>
@import "assets/scss/common.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
