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
      <v-flex
              class="list-item_discount"
              xs2
              :class="{ 'hidden' : !isProductSelected }"
      >
        <v-btn
                color="#fff"
                @click.stop="dialog = true"
        >
          скидки
        </v-btn>
        <v-dialog
                v-model="dialog"
                max-width="600"
        >
          <v-card>
            <v-card-title class="headline">Скидка на {{product_data.title}}</v-card-title>
            <v-card-text>
              <ul class="discount_modal-text">
                <li>
                  <p class="left-text">Базовая цена</p>
                  <p class="text-value">{{product_data.price}} руб</p>
                </li>
                <li>
                  <p class="left-text">Количество для скидки</p>
                  <p class="text-value">3 шт</p>
                </li>
                <li>
                  <p class="left-text">Скидка</p>
                  <div class="text-value">
                    <csm-multi-select
                            :select_data="discounts"
                            select_label="Выбрать"

                    />
                  </div>
                </li>
                <li>
                  <p class="info-text text-green">Сумма скидки</p>
                  <p class="text-value"> руб</p>
                </li>
                <li>
                  <p class="info-text text-green">Итого со скидкой</p>
                  <p class="info-value"> руб</p>
                </li>
              </ul>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                      color="green darken-1"
                      flat="flat"
                      @click="dialog = false"
              >
                Закрыть
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
      <v-layout column align-center>
        <span class="info_price">${{product_data.price*product_data.qty}}</span>
        <span>
        <v-btn
                :class="{ 'hidden' : !isProductSelected }"
                small
                @click="decrementQty"
                outline
                flat
                fab
        >-
      </v-btn>
        {{product_data.qty}} шт
        <v-btn
                :class="{ 'hidden' : !isProductSelected }"
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

    import csmMultiSelect from '../../components/selects/csm-multi-select'

    export default {
        name: "csm-order-list-item",
        components: {
            csmMultiSelect
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
                    {text: 'За лояльность', value: 10},
                    {text: 'За вредность', value: 15}
                ]
            }
        },
        computed: {
           discountData() {
               for (let discount of this.discounts) {
                   return discount;
               }
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

  .discount_modal-text {
    list-style: none;
    padding-left: 0;
  }

  .discount_modal-text li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>