<template>
    <div class="row grid-center">
        <div class="col-xs-6">
            <h2 class="ui-title-2">Войти</h2>
            <div class="ui-alert ui-alert--danger" v-if="fbError != ''"><span class="alert-title">{{fbError}}</span></div>
            <form @submit.prevent="signUp">
                <input type="text" placeholder="E-mail" v-model="user.email">
                <input type="password" placeholder="Password" v-model="user.password">
                <button class="button button-primary" type="submit">Войти</button>
            </form>
        </div>
    </div>
    
</template>

<script>

import firebase from 'firebase'

export default {
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            fbError: ''
        }
    },
    methods: {
        signUp() {
            let vm = this;
            firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
            .then(user => {
                console.log(user);
                this.$router.push('/')    
            })
            .catch(function(error) {
                vm.fbError = error.message
            });
        }
    }
}
</script>

<style scoped>

    .row {
        margin-top: 150px;
    }

    button {
        border: none;
    }

</style>
