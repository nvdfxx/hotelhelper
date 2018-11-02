<template>
    <div id="app">
        <transition name="fade">
            <div id="app-loader" v-if="getAppLoading">
                <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="64px" height="64px" viewBox="0 0 128 128" xml:space="preserve"><g><path d="M75.4 126.63a11.43 11.43 0 0 1-2.1-22.65 40.9 40.9 0 0 0 30.5-30.6 11.4 11.4 0 1 1 22.27 4.87h.02a63.77 63.77 0 0 1-47.8 48.05v-.02a11.38 11.38 0 0 1-2.93.37z" fill="#ffffff" fill-opacity="1"/><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="2000ms" repeatCount="indefinite"></animateTransform></g></svg>
            </div>
        </transition>
        <header>
            <div class="navbar navbar--black">
                <div class="container">
                    <div class="navbar-content">
                        <router-link class="header-logo" to="/">HH</router-link>

                        <div class="button-burger">
                            <span class="line line-1"></span>
                            <span class="line line-2"></span>
                            <span class="line line-3"></span>
                        </div>

                        <div class="navbar-list__wrapper">
                            <ul class="navbar-list">
                                <li class="navbar-item" :key="route.name" v-for="route in navRoutes">
                                    <router-link class="navbar-link" :to="route.path">{{route.title}}</router-link>
                                </li>    
                                <li v-if="getUserNavLink" class="navbar-item">
                                    <router-link class="navbar-link" to="/profile">{{getUserNavLink}}<img v-if="getUserPhoto" class="user-avatar" :src="getUserPhoto"></router-link>
                                </li>    
                                <li v-if="getUser" class="navbar-item">
                                    <a class="navbar-link" @click="logout">Выйти</a>
                                </li>      
                                             
                            </ul>
                        </div>
                        <transition name="fadedown">
                            <info-message v-if="getInfoMessage.text" :color="getInfoMessage.color">{{getInfoMessage.text}}</info-message>
                        </transition>
                    </div>
                </div>
            </div>
        </header>
        <div class="wrapper">
            <div class="content-wrapper">
                <div class="container">
                    <transition name="fade" mode="out-in">
                        <router-view/>
                    </transition>
                </div>
            </div>
        </div>             
    </div>
</template>

<script>

import firebase from 'firebase'
import infoMessage from '@/components/infoMessage.vue'

export default {
    
    data() {
        return {
            
        }
    },
    methods: {
        logout() {
            firebase.auth().signOut()
            .then(() => {
                this.$router.push('/signin')
            }).catch(e => console.log(e))
        }
    },
    computed: {
        getUser() {
            return this.$store.getters.getUser
        },
        getUserName() {
            return this.$store.getters.getUserName
        },
        getUserEmail() {
            return this.$store.getters.getUserEmail
        },
        getUserNavLink() {
            return this.getUserName ? this.getUserName : this.getUserEmail
        },
        getUserPhoto() {
            return this.$store.getters.getUserPhoto
        },
        navRoutes() {
            if(this.getUser !== null) {
                return this.$router.options.routes.filter(route => route.access && route.name !== 'profile');
            }
            return this.$router.options.routes.filter(route => !route.access);
        },
        getInfoMessage() {
            return this.$store.getters.getInfoMessage
        },
        getAppLoading() {
            return this.$store.getters.getAppLoading
        }
    },
    components: {
      infoMessage
    }
}

</script>


<style>

#app {
   font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: url('./assets/signin-bg.jpg') no-repeat center / cover;
  background-attachment: fixed;
}

#app-loader {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    z-index: 999;
}

#app-loader svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.faded-enter-active, .faded-leave-active {
  transition: opacity .5s;
}
.faded-enter, .faded-leave-to {
  opacity: 0;
}

.fadedown-enter-active, .fadedown-leave-active {
  transition: .5s;
}
.fadedown-enter, .fadedown-leave-to {
  top: 0;
  opacity: 0;
  transition: .5s;
}

.navbar-content a {color: #ffffff;}

.ui-message {
    display: block;
}

.user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 30px;
    object-fit: cover
}

.navbar-list {
    align-items: baseline;
}

.navbar-list__wrapper .navbar-item {
    padding: 0;
    height: 100%;
    margin-right: 30px;
}

.navbar-list__wrapper .navbar-item:last-child {
    margin-right: 0;
}

.navbar-list__wrapper .navbar-item a {
    padding: 0;
}

form input:focus,
form textarea:focus{
    background: rgba(0,0,0,.3);
    border-color: transparent;
    color: #fff;
}

form input:focus::placeholder,
form textarea:focus::placeholder {
    color: #fff;
}

</style>
