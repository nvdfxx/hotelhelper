<template>
    <div class="posts">
        <div class="row grid-center">
            <add-post class="col-xs-8" />
            <post-list-item class="col-xs-8" :key="`${post.id}`" v-for="post in getPosts" :post="post"></post-list-item>
        </div>
    </div>
</template>

<script>

import postListItem from '../components/postListItem'
import addPost from '../components/addPost'

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
        addPost,
        postListItem
    }
}
</script>

<style scoped>

    .posts .ui-card {
        margin-top: 50px;
    }

</style>

