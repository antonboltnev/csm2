<template>
    <v-text-field
            class="csm-text-field"
            v-model="value"
            label="Введите значение"
            type="tel"
            single-line
            clearable
            @input="setDiscountValue"
            min="0"
            maxlength="2"
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
            setDiscountValue() {
                this.$emit('setDiscount',this.value);
            },
            clearTextField() {
                this.value = ''
            }
        }
    }
</script>

<style scoped>

</style>