<template>
    <div class="addpost">
        <form>
            <div class="form-item">
                <input type="text" placeholder="Заголовок">
            </div>
            <div class="form-item">
                <input type="text" placeholder="Краткое описание">
            </div>
            <div class="form-item">
                <input type="text" placeholder="Текст поста">
            </div>
            <button type="submit" class="button button-primary">Добавить пост</button>
        </form>
    </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

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
    }

}
</script>

<style scoped>

    button {
        border: none
    }

</style>
