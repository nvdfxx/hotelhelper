<template>
    <div class="row grid-center">
        <div class="col-xs-6">
            <h2 class="ui-title-2">Обновить профиль</h2>
            <div class="ui-alert ui-alert--danger" v-if="fbError != ''"><span class="alert-title">{{fbError}}</span></div>
            <form @submit.prevent="updateProfile">
                <div class="form-item" :class="{errorInput: $v.name.$error}">
                    <input type="text" placeholder="User Name" v-model="name" @change="$v.name.$touch()">
                    <div class="error" v-if="!$v.name.minLength">Имя должно содержать не менее 4 символов</div>
                    <div class="error" v-if="!$v.name.required">Поле Имя должно быть заполнено</div>
                </div>
                
                <div class="form-item">
                    <input type="password" placeholder="Profile photo URL" v-model="photoUrl">
                </div>
                
                <button class="button button-primary" :class="{'button--disable': this.$v.$invalid}" :disabled="this.$v.$invalid" type="submit">Обновить профиль</button>

                <div class="buttons-list buttons-list--info">
                    <p class="typo__p" v-if="submitStatus === 'OK'">Спасибо за регистацию!</p>
                    <p class="typo__p" v-if="submitStatus === 'ERROR'">Заполните форму корректно!</p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  import firebase from 'firebase'
  import { minLength, required } from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        name: '',
        photoUrl: '',
        submitStatus: '',
        fbError: ''
      }
    },
    validations: {
      name: {minLength: minLength(4), required},
    },
    methods: {
      updateProfile() {
        this.$v.$touch();
        this.submitStatus = 'PENDING'
        if (this.$v.$invalid) {
            this.submitStatus = 'ERROR'
        } else {
            let user = firebase.auth().currentUser;
            user.updateProfile({
              displayName: this.name
            }).then(() => {
              this.$store.dispatch('updateUserName', this.name)
              this.$router.push('/')
              this.$store.dispatch('setInfoMessage', 'Профиль  обновлен')
            }).catch(e => console.log(e))
        }
      }
    }
  }
</script>

<style scoped>
  button {
    border: none
  }

  .row {
    margin-top: 150px;
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

