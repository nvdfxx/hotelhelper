import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'
import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import SignIn from './views/SignIn.vue'
import SignUp from './views/SignUp.vue'
import AddPost from './views/addPost.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      title: 'Главная',
      component: Home,
      access: true
    },
    {
      path: '/addpost',
      name: 'addpost',
      title: 'Добавить пост',
      component: AddPost,
      access: true,
      beforeEnter(from, to, next) {
        if(store.getters.getUser !== null) {
          next()
        } else {
          next('/signin')
        }
      }
    },
    {
      path: '/profile',
      name: 'profile',
      title: 'Мой кабинет',
      component: Profile,
      access: true,
      beforeEnter(from, to, next) {
        if(store.getters.getUser !== null) {
          next()
        } else {
          next('/signin')
        }
      }
    },
    {
      path: '/signup',
      name: 'signup',
      title: 'Зарегистрироваться',
      component: SignUp,
      access: false
    },
    {
      path: '/signin',
      name: 'signin',
      title: 'Войти',
      component: SignIn,
      access: false
    }
  ]
})
