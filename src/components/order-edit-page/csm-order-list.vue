<template>
  <div class='csm-order-list'>
    <v-layout :class="{ 'hidden' : !this.$store.state.selectedProducts.length > 0 }">
      <v-flex xs2>
        <v-btn @click="preDeleteProduct">Удалить выбранное</v-btn>
      </v-flex>
      <v-flex xs2>
        <v-btn @click="clearSelection">Снять выделение</v-btn>
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

    import csmOrderListItem from '../../components/order-edit-page/csm-order-list-item'
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
            deleteCurrentProduct(product) {

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