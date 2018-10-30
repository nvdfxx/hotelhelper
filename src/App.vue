<template>
    <div id="app">
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
                                <li v-if="getUser" class="navbar-item">
                                    <a class="navbar-link" @click="logout">Выйти</a>
                                </li>      
                                <li v-if="getUserNavLink" class="navbar-item">
                                    <a class="navbar-link">{{getUserNavLink}}</a>
                                </li>                 
                            </ul>
                        </div>
                        <transition name="fade"><info-message v-if="getInfoMessage">{{getInfoMessage}}</info-message></transition>
                    </div>
                </div>
            </div>
        </header>
        <div class="wrapper">
            <div class="content-wrapper">
                <div class="container">
                    <transition name="faded" mode="out-in">
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
            infoMessage: null
        }
    },
    methods: {
        logout() {
            firebase.auth().signOut()
            .then(() => {
                //this.$store.dispatch('setUser', null) //TODO: check for work it
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
        navRoutes() {
            if(this.getUser !== null) {
                return this.$router.options.routes.filter(route => route.access);
            }
            return this.$router.options.routes.filter(route => !route.access);
        },
        getInfoMessage() {
            return this.$store.getters.getInfoMessage
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
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.faded-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.faded-enter, .fade-leave-to {
  opacity: 0;
}

.navbar-content a {color: #ffffff;}

.ui-message {
    display: block;
}

</style>
