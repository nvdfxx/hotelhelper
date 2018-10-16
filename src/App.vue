<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> | 
            <router-link to="/about">About</router-link>
            {{users}}
        </div>
        <button @click="addData()">add</button>
        <router-view/>
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

        addData() {
            
            db.ref('users/' + this.uCounter).set({
                username: 'name',
                email: 'email',
                profile_picture : 'imageUrl'
            });
            this.uCounter++
        }     
    }
}

</script>


<style>

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

</style>
