import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import SignIn from './views/SignIn.vue'
import SignUp from './views/SignUp.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      title: 'Главная',
      component: Home
    },
    {
      path: '/profile',
      name: 'profile',
      title: 'Мой кабинет',
      component: Profile
    },
    {
      path: '/signin',
      name: 'signin',
      title: 'Зарегистрироваться',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      title: 'Войти',
      component: SignUp
    }
  ]
})
