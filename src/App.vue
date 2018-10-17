<template>
    <div id="app">
        <div class="wrapper">
            <header>
                <div class="navbar navbar--black">
                    <div class="container">
                        <div class="navbar-content">
                            <router-link to="/">HH</router-link>

                            <div class="button-burger">
                                <span class="line line-1"></span>
                                <span class="line line-2"></span>
                                <span class="line line-3"></span>
                            </div>

                            <div class="navbar-list__wrapper">
                                <ul class="navbar-list">
                                    <router-link to="/">Home</router-link>
                                    <router-link to="/about">About</router-link>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div class="content-wrapper">
                <div class="container">
                    <div class="button button--plain button-primary" @click="addData()">add</div>
                
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



</style>
