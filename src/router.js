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
      component: Profile,
      beforeEnter: authGuard
    },
    {
      path: '/signup',
      name: 'signup',
      title: 'Зарегистрироваться',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'signin',
      title: 'Войти',
      component: SignIn
    }
  ]
})

function authGuard(from, to, next) {
    console.log(from)
    console.log(to)
    console.log(next)
}
