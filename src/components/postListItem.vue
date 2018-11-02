<template>
    <div class="ui-card">
        <p class="ui-title-1 center">{{post.title}}</p>
        <p class="ui-title-3">{{post.description}}</p>
        <span>{{post.body}}</span>
    </div>
</template>

<script>
export default {
    props: {
        'post': {
            required: true,
            type: Object
        }
    }
}
</script>

<style scoped> 

</style>
