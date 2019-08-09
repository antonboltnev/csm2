<template>
    <v-select
            class='csm-single-select'
            v-model="select"
            :items="reasons"
            label="Выберите причину"
            outlined
            clearable
            @change="getSelectValue"
    ></v-select>
</template>

<script>
    export default {
        name: "csm-single-select",
        data() {
            return {
                select: 'Причина 1',
                reasons: [
                    'Причина 1',
                    'Причина 2',
                    'Причина 3',
                    'Причина 4'
                ]
            }
        },
        methods: {
            getSelectValue() {
                this.$emit('selectValue', this.select);
            }
        }
    }
</script>

<style scoped>

</style>