<template>
    <div class="ui-message" :class="color">
        <span class="message-title">
            <slot>

            </slot>
        </span>
    </div>
</template>

<script>
    export default {
        props: {
            color: {
                required: true,
                type: String
            }
        }
    }
</script>

<style>

</style>
