<template>
    <div class="row grid-center">
        <div class="col-xs-6">
            <h2 class="ui-title-2">Зарегистрироваться</h2>
            <div class="ui-alert ui-alert--danger" v-if="fbError != ''"><span class="alert-title">{{fbError}}</span></div>
            <form @submit.prevent="signIn">
                <input type="text" placeholder="E-mail" v-model="user.email">
                <input type="password" placeholder="Password" v-model="user.password">
                <input type="password" placeholder="Repeat password" v-model="user.repeatPassword">
                <button class="button button-primary" type="submit">Зарегистрироваться</button>
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
                password: '',
                repeatPassword: ''
            },
            fbError: ''
        }
    },
    methods: {
        signIn() {
            let vm = this;
            firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
            .then(user => {
                console.log(user.user.uid)
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
