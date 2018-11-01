<template>
    <div class="forgot-password">
        <p class="ui-text-small">Забыли пароль? <button @click="showResetPassword = !showResetPassword" class="button button-default" :class="{'button--plain': showResetPassword }">Восстановить пароль</button></p>
        <transition name="fade">
            <form v-if="showResetPassword" @submit.prevent="resetPassword">
                <div class="form-item" >
                    <label>Введите адрес почты, к которой привязан аккаунт, на него прийдет сообщение с дальнейшими инструкциями</label>
                    <input placeholder="Введите E-mail" type="text" v-model="resetPasswordEmail">
                    <!-- <div class="error" v-if="!this.$v.resetPasswordEmail.required">Поле E-mail обязательно для заполнения!</div>
                    <div class="error" v-if="!this.$v.resetPasswordEmail.email">Заполните поле E-mail корректно!</div> -->
                </div>
                <button class="button button-warning" type="submit">Отправить письмо</button>
            </form>
        </transition>
    </div>
</template>

<script>
import firebase from 'firebase'
import { required, email } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            showResetPassword: false,
            resetPasswordEmail: '',
            submitStatus: ''
        }
    },   
    // validations: {
    //     resetPasswordEmail: {
    //         required, email
    //     }
    // },
    methods: {
        resetPassword() {
            // this.$v.$touch();
            // this.submitStatus = 'PENDING'
            // if (this.$v.$invalid) {
            //     this.submitStatus = 'ERROR'
            // } else {
                let vm = this;
                firebase.auth().sendPasswordResetEmail(vm.resetPasswordEmail)
                .then(() => {
                    //vm.submitStatus = 'OK'    
                    vm.$store.dispatch('setInfoMessage', {text: 'Письмо отправлено на почтовый ящик ' + vm.resetPasswordEmail, color: 'primary'}) //uimini colors
                })
                .catch(function(error) {
                    vm.$store.dispatch('setInfoMessage', {text: error.message, color: 'danger'})
                });
            //} TODO: do it
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

    .forgot-password button {
        border: none
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
