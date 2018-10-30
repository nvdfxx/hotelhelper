<template>
    <div class="row grid-center">
        <div class="col-xs-6">
            <h2 class="ui-title-2">Войти</h2>
            <div class="ui-alert ui-alert--danger" v-if="fbError != ''"><span class="alert-title">{{fbError}}</span></div>
            <form @submit.prevent="signUp">
                <div class="form-item" :class="{errorInput: $v.email.$error}">
                    <input type="text" placeholder="E-mail" v-model="email" @change="$v.email.$touch()">
                    <div class="error" v-if="!$v.email.required">Поле E-mail обязательно для заполнения!</div>
                    <div class="error" v-if="!$v.email.email">Введен некорректный E-mail!</div>
                </div>
                
                <div class="form-item" :class="{errorInput: $v.password.$error}">
                    <input type="password" placeholder="Password" v-model="password" @change="$v.password.$touch()">
                    <div class="error" v-if="!$v.password.required">Поле Пароль обязательно для заполнения!</div>
                </div>
                
                <button class="button button-primary" type="submit">Войти</button>
            </form>
        </div>
    </div>
    
</template>

<script>

import firebase from 'firebase'
import { required, email } from 'vuelidate/lib/validators'

export default {
    data() {
        return {    
            email: '',
            password: '',
            fbError: ''
        }
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required
        }
    },
    methods: {
        signUp() {
            this.$v.$touch();
            this.submitStatus = 'PENDING'
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
            } else {
                let vm = this;
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(user => {
                    this.submitStatus = 'OK'
                    this.$router.push('/')    
                })
                .catch(function(error) {
                    vm.fbError = error.message
                });
            }
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

    .alert-title {
        font-size: 14px;
    }

    .form-item .error {
        display: none;
        margin-bottom: 8px;
        font-size: 13px;
        color: #fc5c65;
        text-align: left;
    }

    .form-item input {
        margin-bottom: 8px;
    }

    .form-item.errorInput input {
        border-color: #fc5c65
    }

    .form-item.errorInput .error {display: block;}


</style>
