<template>
  <v-layout>
    <v-layout class='csm-order-list-item justify-space-around align-start' v-if="product_data.status !== 'hidden' ">
      <v-flex xs1>
        <v-checkbox
                v-model="isProductSelected"
                @change="productSelection"
                color="#000"
        ></v-checkbox>
      </v-flex>
      <v-flex class="list-item_img" xs2>
        <v-img :src=product_data.image></v-img>
      </v-flex>
      <v-flex class="list-item_info" column xs3>
        <span class="info_title">{{product_data.description}}</span>
        <span>Артикул: {{product_data.article}}</span>
        <span>Цвет: <span class="underlined">{{product_data.color}}</span></span>
        <span>Размер: <span class="underlined">{{product_data.size}}</span></span>
        <span>Базовая цена: <span class="green--text">{{product_data.articleBasePrice}} &#8381;</span></span>
      </v-flex>
      <v-flex class="item_lines pl-0 pr-0" xs7 v-if="product_data.orderLines.length">
        <v-layout class="column">
          <v-layout class="order-line_header font-weight-medium pt-2 pb-2">
            <v-flex xs1>
            </v-flex>
            <v-flex xs3>
              <span>Кол-во</span>
            </v-flex>
            <v-flex xs2>
              <span>&#8381; / шт</span>
            </v-flex>
            <v-flex xs3>
              <span>Скидка &#8381;</span>
            </v-flex>
            <v-flex xs2>
              <span>Итого &#8381;</span>
            </v-flex>
          </v-layout>
          <v-flex class="lines_item pr-0 pl-0">
            <csm-order-line
                    v-for="(item, index) in product_data.orderLines"
                    :product="product_data"
                    :line_data="item"
                    :key="item.id"
                    @decrementQty="decrementQty(index)"
                    @incrementQty="incrementQty(index)"
                    @removeLine="removeLine(index)"
            />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout v-if="product_data.status === 'hidden' " class="justify-end align-center">
      <v-flex xs4>
        <span><span class="info_title">{{product_data.title}}</span> был удален из заказа.</span>
      </v-flex>
      <v-flex xs2 class="text-right mr-2">
        <v-btn tile @click="returnProduct" color="success">Вернуть</v-btn>
      </v-flex>
      <v-flex xs1 class="text-right">
        <v-btn tile @click="deleteProduct" color="error">Удалить</v-btn>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>

    import csmMultiSelect from '../../selects/csm-multi-select'
    import csmTextField from '../../text-fields/csm-text-field'
    import csmOrderLine from './csm-order-line'

    export default {
        name: "csm-order-list-item",
        components: {
            csmMultiSelect,
            csmTextField,
            csmOrderLine
        },
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
                isProductSelected: false,
                dialog: false,
                discounts: [
                    {text: 'За лояльность, 10%', value: 10},
                    {text: 'За вредность, 15%', value: 15}
                ],
                discountsSumm: 0,
                correction: 0
            }
        },
        computed: {
            totalPriceWithDiscounts() {
                let summ = this.product_data.articleBasePrice * this.product_data.qty;
                return  summ - ((summ * (this.discountsSumm+this.correction)) / 100);
            }
        },
        methods: {
            removeLine(line) {
                this.product_data.orderLines.splice(line, 1);
            },
            handCorrection(value) {
               this.correction = Number(value);
            },
            discountCounter(discounts) {
                if (discounts.length) {
                    let result = discounts.reduce(function (sum, el) {
                        return sum + el;
                    });
                    return this.discountsSumm = result;
                } else {
                    this.discountsSumm = 0
                }
            },
            clearDiscounts() {
                this.discountsSumm = 0;
                this.correction = 0;
                this.$refs.value.clearTextField();
                this.$refs.selectedItems.clearSelect();
                this.dialog = false;
            },
            productSelection() {
                    this.$emit('productSelection', this.product_data.moniker, this.isProductSelected);
            },
            incrementQty(index) {
                this.product_data.orderLines[index].quantity++;
            },
            decrementQty(index) {
                if (this.product_data.orderLines[index].quantity >1) {
                    this.product_data.orderLines[index].quantity--;
                } else {
                    return false;
                }
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
    border: solid 1px #e6e6e6;
    padding: 10px 0;
    border-left: 0;
    border-right: 0;
    margin-top: -1px;
  }

  .csm-order-list-item .flex {
    border-right: solid 1px #e6e6e6;
    padding: 0 10px;
    height: 100%;
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

  .discount_modal-text {
    list-style: none;
    padding-left: 0;
  }

  .discount_modal-text li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .order-line_header {
    background: #e6e6e6;
  }
</style>