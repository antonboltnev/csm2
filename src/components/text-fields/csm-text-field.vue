<template>
    <v-text-field
            class="csm-text-field"
            v-model="value"
            label="Введите значение"
            placeholder="Например: не хватает денег :)"
            outlined
            clearable
            @input="setValue"
    ></v-text-field>
</template>

<script>
    export default {
        name: "csm-text-field",
        data() {
            return {
                value: '',
            }
        },
        methods: {
            setValue() {
                this.$emit('setValue',this.value);
            },
            clearTextField() {
                this.value = ''
            }
        }
    }
</script>

<style scoped>

</style>