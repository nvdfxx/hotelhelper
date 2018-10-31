<template>
    <div class="profile">
        
        <div class="row grid-center">
            <div class="col-xs-5">
                <div class="profile-card">
                    <div class="profile-avatar">
                        <img v-if="getUserPhoto" :src="getUserPhoto">
                        <img v-else src="../assets/nophoto.jpg">
                    </div>
                    <div class="profile-name">
                        <h3 class="ui-title-3">{{getUserName}}</h3>
                    </div>
                    <div class="profile-email">
                        <h4 class="ui-title-4">{{getUserEmail}}</h4>
                    </div>
                </div>
            </div>
            <div class="col-xs-5">
                <div class="update-profile">
                    <h2 class="ui-title-2">Обновить профиль</h2>
                    <div class="ui-alert ui-alert--danger" v-if="fbError != ''"><span class="alert-title">{{fbError}}</span></div>
                    <form @submit.prevent="updateProfile">
                        <div class="form-item" :class="{errorInput: $v.name.$error}">
                            <input type="text" :placeholder="getUserName ? getUserName : 'Имя'" v-model="name" @change="$v.name.$touch()">
                            <div class="error" v-if="!$v.name.minLength">Имя должно содержать не менее 4 символов</div>
                            <div class="error" v-if="!$v.name.required">Поле Имя должно быть заполнено</div>
                        </div>
                        
                        <div class="form-item">
                            <input type="text" :placeholder="getUserPhoto ? getUserPhoto : 'Ссылка на изображение'" v-model="photoUrl">
                        </div>
                        
                        <button class="button button-primary" :class="{'button--disable': this.$v.$invalid}" :disabled="this.$v.$invalid" type="submit">Обновить профиль</button>

                        <div class="buttons-list buttons-list--info">
                            <p class="typo__p" v-if="submitStatus === 'OK'">Спасибо за регистацию!</p>
                            <p class="typo__p" v-if="submitStatus === 'ERROR'">Заполните форму корректно!</p>
                        </div>
                    </form>
                </div>
                <!-- <div class="change-password">
                    <h2 class="ui-title-2">Изменить пароль</h2>
                    <form @submit.prevent="checkOldPassword">
                        <div class="form-item">
                            <input type="text" placeholder="Введите текущий пароль" v-model="oldPassword">
                        </div>
                        <button class="button button-primary">Изменить пароль</button>
                    </form>
                    <form @submit.prevent="changePassword">
                        <div class="form-item" :class="{errorInput: $v.newPassword.$error}">
                            <input type="text" placeholder="Введите новый пароль" v-model="newPassword" @change="$v.newPassword.$touch()">
                            <div class="error" v-if="!$v.newPassword.required">Поле Пароль обязательно для заполнения!</div>
                            <div class="error" v-if="!$v.newPassword.minLength">Пароль должен быть не короче 6 символов!</div>
                        </div>
                        <div class="form-item" :class="{errorInput: $v.repeatNewPassword.$error}">
                            <input type="text" placeholder="Повторите новый пароль" v-model="repeatNewPassword" @change="$v.repeatNewPassword.$touch()">
                            <div class="error" v-if="!$v.repeatNewPassword.sameAsPassword">Пароли не совпадают!</div>
                        </div>
                    </form>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
  import firebase from 'firebase'
  import { minLength, required, sameAs } from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        name: '',
        photoUrl: '',
        // oldPassword:'',
        // newPassword: '',
        // repeatNewPassword: '',
        submitStatus: '',
        fbError: ''
      }
    },
    validations: {
        name: {
            minLength: minLength(4), 
            required
        },
        // newPassword: {
        //     required,
        //     minLength: minLength(6)
        // },
        // repeatNewPassword: {
        //     sameAsPassword: sameAs('password')
        // }
    },
    computed: {
        getUserName() {
            this.name = this.$store.getters.getUserName
            return this.$store.getters.getUserName
        },
        getUserPhoto() {
            if(this.$store.getters.getUserPhoto) {
                this.photoUrl = this.$store.getters.getUserPhoto
                return this.$store.getters.getUserPhoto
            } else this.photoUrl = null
        },
        getUserEmail() { 
            return this.$store.getters.getUserEmail
        }
    },
    methods: {
      updateProfile() {
        this.$v.$touch();
        this.submitStatus = 'PENDING'
        let vm = this
        if (this.$v.$invalid) {
            this.submitStatus = 'ERROR'
        } else {
            let user = firebase.auth().currentUser;
            user.updateProfile({
              displayName: this.name,
              photoURL: this.photoUrl
            }).then(() => {
              this.$store.dispatch('updateUser', {name: vm.name, photoURL:  vm.photoUrl})
              this.$store.dispatch('setInfoMessage', 'Профиль  обновлен')
            }).catch(e => console.log(e))
        }
      },
      changePassword() {
        //   TODO: do it
      },
      checkOldPassword() {
          //TODO: do it
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

    .profile-avatar img {
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 50%;
    }

    .profile-card {
        width: 300px;
        height: 400px;
        margin: auto;
        /* border: 1px solid #222222; */
        border-radius: 8px;
        padding-top: 80px;
        transition: .3s;
        box-shadow: 0 0 400px #fff inset
    }

    .profile-card:hover {
        background: rgba(10, 30, 41, 0.6);
        box-shadow: none
    }

    .ui-title-3, .ui-title-4 {
        transition: .2s
    }

    .profile-card:hover .ui-title-3,
    .profile-card:hover .ui-title-4 {
        color: #ffffff;
    }

    .profile-name {margin-top: 20px;}

</style>

