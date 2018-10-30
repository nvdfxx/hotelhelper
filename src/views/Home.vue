<template>
    <div class="home">
        <div class="user">{{getUser}}</div>
    </div>
</template>

<script>

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
        
    },
    computed: {
        getUser() {
            return this.$store.getters.getUser
        }
    }
}
</script>
