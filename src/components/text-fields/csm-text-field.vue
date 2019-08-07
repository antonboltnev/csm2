<template>
    <v-text-field
            class="csm-text-field"
            v-model="value"
            label="Введите значение"
            single-line
            type="number"
            clearable
            prefix="%"
            :rules="[rules.counter]"
            @blur="setDiscountValue"
    ></v-text-field>
</template>

<script>
    export default {
        name: "csm-text-field",
        data() {
            return {
                value: 0,
                rules: {
                    counter: value => value.length <= 3 || 'Очень много цыфр! Не больше 3!',
                },
            }
        },
        methods: {
            setDiscountValue() {
                this.$emit('setDiscount',this.value);
            }
        }
    }
</script>

<style scoped>

</style>