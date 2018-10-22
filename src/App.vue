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
                                <li class="navbar-item" :key="route.name" v-for="route in this.$router.options.routes">
                                    <router-link class="navbar-link" :to="route.path">{{route.title}}</router-link>
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
                    <router-view/>
                </div>
            </div>

        </div>             
    </div>
</template>

<script>

import firebase from 'firebase' 

let config = {
    apiKey: "AIzaSyAg9Ti63dbIs9eNFUXIZNbqoGQEq-yjIrE",
    authDomain: "hotelhelper-d8b27.firebaseapp.com",
    databaseURL: "https://hotelhelper-d8b27.firebaseio.com",
    projectId: "hotelhelper-d8b27",
    storageBucket: "hotelhelper-d8b27.appspot.com",
    messagingSenderId: "36450160781"
};

let app = firebase.initializeApp(config);
let db = app.database();
let users = db.ref('users')

export default {
    firebase: {
        users: users
    },
    data() {
        return {
            uCounter: 1
        }
    },
    methods: {

    },
    computed: {
        navRoutes() {
            this.$router.options.routes.forEach(route => {
                return route.title
            });
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

.navbar-content a {color: #ffffff;}

</style>
