<template>
    <div class="addpost">
        <div class="row grid-center">
            <div class="editor col-xs-8">
                <div class="editor-title">
                    <p class="ui-title-2">Добавить пост</p>
                </div>
                <form @submit.prevent="addPost">
                    <div class="form-item">
                        <input type="text" placeholder="Заголовок, не менее 8 символов" v-model="title">
                    </div>
                    <div class="form-item">
                        <input type="text" placeholder="Краткое описание, не менее 20 символов" v-model="description">
                    </div>
                    <div class="form-item">
                        <textarea placeholder="Текст поста (html-теги разрешены), не менее 100 символов" v-model="body"></textarea>
                    </div>
                    <button type="submit" class="button button-primary">Добавить пост</button>
                </form>
            </div>
        </div>

        <div class="row">
            <div class="preview col-xs-12">
                <div class="preview-title">
                    <h2 class="ui-title-2">Предпросмотр</h2>
                </div>
                <div class="preview-body">
                    <h2 class="ui-title-2">{{title}}</h2>
                    <h4 class="ui-title-4">{{description}}</h4>
                    <div class="post-body ui-text-regular" v-html="body"></div>  
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import Vue from 'vue'
import { required, minLength } from 'vuelidate/lib/validators'
import firebase from 'firebase'

export default {
    data() {
        return {
            title: '',
            description: '',
            body: ''
        }
    },
    validations: {
        title: {
            required,
            minLength: minLength(8)
        },
        description: {
            required,
            minLength: minLength(20)
        },
        body: {
            required,
            minLength: minLength(100)
        }
    },
    methods: {
        addPost() {
            this.$v.$touch();         
            if (this.$v.$invalid) {
                
            } else {
                let vm = this;
                this.$store.dispatch('onAppLoading');
                Vue.$db.collection('posts').add({
                    title: vm.title,
                    description: vm.description,
                    body: vm.body
                })
                .then((docRef) => {
                    vm.$router.push('/');
                    vm.$store.dispatch('offAppLoading');
                    vm.$store.dispatch('setInfoMessage', {text: 'Пост размещен!', color: 'success'}) //TODO: FIX IT, NOT WORKING
                    console.log(docRef)
                })
                .catch(function(error) {
                    vm.$store.dispatch('offAppLoading');
                    vm.$store.dispatch('setInfoMessage', {text: error.message, color: 'danger'})
                });
            }
                
        }
    }

}
</script>

<style scoped>

    button {
        border: none
    }

    .addpost {
        margin-top: 50px;
    }

    .preview {
        margin-top: 30px;
    }

    .preview .preview-body {
        text-align: left;
        min-height: 400px;
        background: #ffffff;
        border-radius: 8px;
        padding: 10px;
    }

    .preview .preview-body h2 {
        text-transform: capitalize;
    }

</style>
