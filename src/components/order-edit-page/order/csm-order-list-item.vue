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
        <v-img :src=product_data.img></v-img>
      </v-flex>
      <v-flex class="list-item_info" column xs3>
        <span class="info_title">{{product_data.title}}</span>
        <span>Артикул: {{product_data.article}}</span>
        <span>Цвет: <span class="underlined">{{product_data.color}}</span></span>
        <span>Размер: <span class="underlined">{{product_data.size}}</span></span>
        <span>Цена за ед: {{product_data.price}} &#8381;</span>
      </v-flex>
      <v-flex xs2>
        <span>
        <v-btn
                text
                @click="decrementQty"
        ><v-icon dark>remove</v-icon>
      </v-btn>
        {{product_data.qty}} шт
        <v-btn
                text
                @click="incrementQty"
        ><v-icon dark>add</v-icon>
        </v-btn>
      </span>
      </v-flex>
      <v-flex
              class="list-item_discount"
              xs2
      >
        <v-btn
                color="#fff"
                @click.stop="dialog = true"
        >
          <span class="headline">%</span>
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
                  <v-flex>
                    <p class="left-text">Скидка</p>
                  </v-flex>
                  <v-flex xs6>
                    <div class="text-value">
                      <csm-multi-select
                              ref="selectedItems"
                              :select_data="discounts"
                              select_label="Выбрать"
                              @selectChange="discountCounter"
                      />
                    </div>
                  </v-flex>
                </li>
                <li>
                  <v-flex>
                    <p class="left-text">Ручная корректировка</p>
                  </v-flex>
                  <v-flex xs6>
                    <div class="text-value">
                      <csm-text-field
                              ref="value"
                              @setDiscount="handCorrection"
                      />
                    </div>
                  </v-flex>
                </li>
                <li>
                  <p class="info-text">Суммарная скидка</p>
                  <p class="text-value">{{discountsSumm + correction}} %</p>
                </li>
                <li>
                  <p class="info-text display-1">Итого со скидкой</p>
                  <p class="info-value font-weight-bold display-1 green--text">{{totalPriceWithDiscounts}} &#8381;</p>
                </li>
              </ul>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                      color="darken-1"
                      text
                      @click="dialog = false"
              >
                Применить
              </v-btn>
              <v-btn
                      color="red"
                      text
                      @click="clearDiscounts"
              >
                Отменить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
      <v-layout column align-center>
        <span class="info_price" v-if="discountsSumm > 0">{{totalPriceWithDiscounts}} &#8381; <span class="green--text body-1">(-{{discountsSumm + correction}} %)</span></span>
        <span class="info_price" v-else>{{product_data.price*product_data.qty}} &#8381;</span>
      </v-layout>
    </v-layout>
    <v-layout v-if="product_data.status === 'hidden' " class="justify-end align-center">
      <v-flex xs4>
        <span><span class="info_title">{{product_data.title}}</span> был удален из заказа.</span>
      </v-flex>
      <v-flex xs2>
        <v-btn @click="returnProduct" color="success">Вернуть</v-btn>
      </v-flex>
      <v-flex xs2>
        <v-btn @click="deleteProduct" color="error">Удалить</v-btn>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>

    import csmMultiSelect from '../../selects/csm-multi-select'
    import csmTextField from '../../text-fields/csm-text-field'

    export default {
        name: "csm-order-list-item",
        components: {
            csmMultiSelect,
            csmTextField
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
                return  (this.product_data.price * this.product_data.qty) - ((this.product_data.price * this.product_data.qty * (this.discountsSumm+this.correction)) / 100);
            }
        },
        methods: {
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
    border: solid 1px #e6e6e6;
    padding: 10px 5px;
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
</style>