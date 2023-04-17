import Vue from 'vue'
import Router from 'vue-router'
import HomeComp from "../components/HomeComp.vue";
import Login from "../view/LoginView.vue"
import MyAccount from "../components/MyAccountComp.vue"
import User from "../components/UserComp.vue";
import Register from "../view/RegisterView.vue"
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeComp,
      children: [
        {
          path: '/myaccount',
          name: 'MyAccount',
          component: MyAccount
        },
        {
          path: '/users',
          name: 'User',
          component: User
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    // nếu không sẽ chuyển đến trang home
    { path: '*', redirect: '/' }
  ]
});
router.beforeEach((to, from, next) => {
  // chuyển đến trang login nếu chưa được login
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('accessToken');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})
export default router;