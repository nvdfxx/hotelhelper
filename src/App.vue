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
                            </ul>
                        </div>
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

export default {
    
    data() {
        return {
            uCounter: 1
        }
    },
    methods: {
        logout() {
            firebase.auth().signOut()
            .then(() => {
                this.$store.dispatch('setUser', null) 
                this.$router.push('/signin')
            }).catch(e => console.log(e))
        }
    },
    computed: {
        getUser() {
            return this.$store.getters.getUser
        },
        navRoutes() {
            if(this.getUser !== null) {
                return this.$router.options.routes.filter(route => route.access);
            }
            return this.$router.options.routes.filter(route => !route.access);
        }
    }
}

</script>


<style>

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

.navbar-content a {color: #ffffff;}

</style>
