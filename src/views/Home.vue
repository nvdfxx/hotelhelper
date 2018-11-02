<template>
    <div class="posts">
        <div class="row grid-center">
            <button class="button col-xs-8" @click="consolePosts">console</button>
            <post-list-item class="col-xs-8" :key="`${post.id}`" v-for="post in getPosts" :post="post"></post-list-item>
        </div>
    </div>
</template>

<script>

import Vue from 'vue'
import postListItem from '../components/postListItem'
import firebase from 'firebase'


export default {
    name: 'home',
    data() {
        return {
            homepage: 'This is home page',
            user: null,
            newUser: ''
        }
    },
    methods: {
        consolePosts() {
            Vue.$db.collection('posts').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(`${doc.id} => ${doc.data()}`); //TODO: FIX IT, NOT WORKING
                });
            })
            .catch(e => console.log(e))
        }
    },
    computed: {
        getUser() {
            return this.$store.getters.getUser
        },
        getPosts() {
            return this.$store.getters.getPosts
        }
    },
    components: {
        postListItem
    }
}
</script>

<style scoped>

    .posts .ui-card {
        margin-top: 50px;
    }

</style>

