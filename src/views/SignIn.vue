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
            <div class="forgot-password">
                <p class="ui-text-small">Забыли пароль? <button @click="showResetPassword = !showResetPassword" class="button button-default">Восстановить пароль</button></p>
                <transition name="fade">
                    <form v-if="showResetPassword" @submit.prevent="resetPassword">
                        <div class="form-item">
                            <label>Введите адрес почты, к которой привязан аккаунт, на него прийдет сообщение с дальнейшими инструкциями</label>
                            <input placeholder="Введите E-mail" type="email" v-model="resetPasswordEmail" >
                            <!-- <div class="error" v-if="!$v.resetPasswordEmail.required">Поле E-mail обязательно для заполнения!</div>
                            <div class="error" v-if="!$v.resetPasswordEmail.email">Заполните поле E-mail корректно!</div> -->
                        </div>
                        <button class="button button-warning" type="submit">Отправить письмо</button>
                    </form>
                </transition>
            </div>
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
            fbError: '',
            resetPasswordEmail: '',
            showResetPassword: false
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
        // resetPasswordEmail: {
        //     required,
        //     email
        // }
        
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
        },
        resetPassword() {
            let vm = this
            firebase.auth().sendPasswordResetEmail(vm.resetPasswordEmail)
            .then(() => {
                this.submitStatus = 'OK'    
                this.$store.dispatch('setInfoMessage', 'Письмо отправлено на почтовый ящик ' + vm.resetPasswordEmail)
            })
            .catch(function(error) {
                vm.fbError = error.message
            });
        }
    } 
}
</script>

<style scoped>

    .forgot-password {
        margin-top: 30px;
        color: #ffffff;
    }

    .forgot-password p {
        color: #ffffff;
    }

    .forgot-password button {
        margin-left: 10px;
    }

    .forgot-password form {
        margin-top: 20px;
    }

    .forgot-password form .form-item label {
        font-size: 12px;
    }

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
