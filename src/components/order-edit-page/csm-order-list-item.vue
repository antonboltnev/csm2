<template>
  <v-layout>
    <v-layout class='csm-order-list-item justify-space-around align-center' v-if="product_data.status !== 'hidden' ">
      <v-flex xs1>
        <v-checkbox
                v-model="isProductSelected"
                @change="productSelection"
                color="#000"
        ></v-checkbox>
      </v-flex>
      <v-flex class="list-item_img" xs2>
        <!--<img src="" alt="Product Img 100x120">-->
        <v-icon color="#000">photo</v-icon>
      </v-flex>
      <v-flex class="list-item_info" column xs5>
        <span class="info_title">{{product_data.title}}</span>
        <span>Артикул: {{product_data.article}}</span>
        <span>Цвет: <span class="underlined">{{product_data.color}}</span></span>
        <span>Размер: <span class="underlined">{{product_data.size}}</span></span>
        <span>Цена за ед: ${{product_data.price}}</span>
      </v-flex>
      <v-layout column align-center>
        <span class="info_price">${{product_data.price*product_data.qty}}</span>
        <span :class="{ 'hidden' : !isProductSelected }">
        <v-btn
                small
                @click="decrementQty"
                outline
                flat
                fab
        >-
      </v-btn>
        {{product_data.qty}} шт
        <v-btn
                small
                @click="incrementQty"
                outline
                flat
                fab
        >+
        </v-btn>
      </span>
      </v-layout>
    </v-layout>
    <v-layout v-if="product_data.status === 'hidden' " class="justify-end align-center">
        <span><span class="info_title">{{product_data.title}}</span> был удален из заказа.</span>
        <v-btn @click="returnProduct" color="success">Вернуть</v-btn>
        <v-btn @click="deleteProduct" color="error">Удалить</v-btn>
    </v-layout>
  </v-layout>
</template>

<script>
    export default {
        name: "csm-order-list-item",
        props: {
            product_data: {
                type: Object,
                default() {
                    return {}
                }
            },
            selectionStatus: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            isProductDeleted: {
                type: Boolean,
                default() {
                    return false;
                }
            }
        },
        data() {
            return {
                isProductSelected: false
            }
        },
        methods: {
            productSelection() {
                    this.$emit('productSelection', this.product_data.article, this.isProductSelected);
            },
            incrementQty() {
                this.$emit('incrementQty');
            },
            decrementQty() {
                this.$emit('decrementQty');
            },
            deleteProduct() {
                this.$emit('deleteProduct');
            },
            returnProduct() {
                this.$emit('returnProduct');
            }
        },
        watch: {
            selectionStatus() {
                if (this.selectionStatus){
                    this.isProductSelected = false;
                }
            }
        }
    }
</script>

<style>

  .csm-order-list-item {
    border: solid 1px #aeaeae;
    padding: 10px 5px;
    border-left: 0;
    border-right: 0;
    margin-top: -1px;
  }

  .list-item_img .v-icon {
    font-size: 10em;
  }

  .list-item_info {
    display: flex;
    flex-direction: column;
  }

  .underlined {
    text-decoration: underline;
  }

  .info_title, .info_price {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .hidden {
    opacity: 0;
    pointer-events: none;
  }

  .v-input--selection-controls {
    justify-content: center;
  }
</style>