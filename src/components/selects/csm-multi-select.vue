<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class='csm-multi-select'>
    <v-select
            v-model="selectedItems"
            :items="select_data"
            :menu-props="{maxHeight: '400'}"
            :label="select_label"
            multiple
            single-line
            item-text="text"
            item-value="value"
            @change="selectChange"
    >
      <template v-slot:selection="{ item, index }">
        <v-chip v-if="index === 0">
          <span>{{ item.text }}</span>
        </v-chip>
        <span
                v-if="index === 1"
                class="grey--text caption"
        >( + еще {{selectedItems.length -1}})</span>
      </template>
    </v-select>
  </div>
</template>

<script>
    export default {
        name: "csm-multi-select",
        props: {
            select_data: {
                type: Array,
                default() {
                    return []
                }
            },
            select_label: {
                type: String,
                default(){
                    return ''
                }
            }
        },
        data() {
            return {
                selectedItems: null,
            }
        },
        methods: {
            selectChange() {
                this.$emit('selectChange', this.selectedItems);
            },
            clearSelect() {
                this.selectedItems = null;
            }
        }
    }
</script>

<style>
</style>