<template>
  <div class='csm-order-list'>
    <v-layout
            class="align-center justify-end"
            :class="{ 'hidden' : !this.$store.state.selectedProducts.length > 0 }" >
      <v-flex xs2 text-right>
        <v-btn tile @click="preDeleteProduct" color="error">Удалить выбранное</v-btn>
      </v-flex>
      <v-flex xs2 text-right>
        <v-btn tile @click="clearSelection" color="success">Снять выделение</v-btn>
      </v-flex>
    </v-layout>
    <csm-order-list-item
            v-for="(item, index) in products"
            :product_data="item"
            :selectionStatus="clearAllSelections"
            :key="item.id"
            @decrementQty="decrementQty(index)"
            @incrementQty="incrementQty(index)"
            @productSelection="productSelection"
            @deleteProduct="deleteCurrentProduct(index)"
            @returnProduct="returnProduct(index)"
    />
  </div>
</template>

<script>

    import csmOrderListItem from './csm-order-list-item'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "csm-order-list",
        components: {
            csmOrderListItem
        },
        data() {
            return {
                isControlsVisible: false,
                clearAllSelections: false
            }
        },
        computed: {
            ...mapGetters([
                'products'
            ]),
        },
        methods: {
            preDeleteProduct() {
                this.clearAllSelections = true;
                this.$store.dispatch('preDeleteSelectedProducts');
                this.$store.dispatch('clearSelection');
            },
            deleteSelectedProducts() {
                this.clearAllSelections = true;
                this.$store.dispatch('deleteSelectedProducts');
                this.$store.dispatch('clearSelection');
            },
            clearSelection() {
                this.clearAllSelections = true;
                this.$store.dispatch('clearSelection');
            },
            productSelection(selectedProduct, isSelected) {
                this.clearAllSelections = false;
                this.$store.dispatch('productSelection', {selectedProduct, isSelected})
            },
            ...mapActions([
                'returnProduct',
                'deleteCurrentProduct',
                'decrementQty',
                'incrementQty'
            ]),
        },
        created() {
            this.$store.dispatch('getOrderListFromAPI');
        }
    }
</script>

<style scoped>

</style>