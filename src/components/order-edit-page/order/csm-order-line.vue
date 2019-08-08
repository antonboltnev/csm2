<template>
  <v-flex class='csm-order-line mt-2 mb-2 pl-0 pr-0'>
    <v-layout class="order-line_content">
      <v-flex
              class="list-item_discount"
              xs1
      >
        <v-btn
                @click.stop="dialog = true"
                :color="applyDiscount ?  'success' : '' "
        >
          <span class="headline">%</span>
        </v-btn>
        <v-dialog
                v-model="dialog"
                max-width="600"
        >
          <v-card>
            <v-card-title class="headline">Скидка на {{product.title}}</v-card-title>
            <v-card-text>
              <ul class="discount_modal-text">
                <li>
                  <p class="left-text">Базовая цена</p>
                  <p class="text-value">{{line_data.price}} руб</p>
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
                  <p class="info-value font-weight-bold display-1 green--text">{{(totalPriceWithDiscounts).toFixed(0)}} &#8381;</p>
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
      <v-flex xs3>
        <span>
        <v-btn
                x-small
                text
                @click="decrementQty"
        >-
      </v-btn>
          {{line_data.quantity}}
        <v-btn
                x-small
                text
                @click="incrementQty"
        >+
        </v-btn>
      </span>
      </v-flex>
      <v-flex class="line_price" xs2>
        <span>{{line_data.price - getAppliedDiscounts}}</span>
      </v-flex>
      <v-flex class="line_discount" xs3>
        <span>{{getAppliedDiscounts + ( ((this.line_data.price - this.getAppliedDiscounts)  * (this.discountsSumm + this.correction) ) / 100)}}</span>
      </v-flex>
      <v-flex xs2>
        <span v-if="getAppliedDiscounts > 0">{{totalPriceWithDiscounts.toFixed(0)}}</span>
        <span v-else>{{line_data.price*line_data.quantity}}</span>
      </v-flex>
      <v-flex class="line_remove" xs1>
        <v-btn
                @click="removeLine"
                x-small
                text
        >
          <v-icon>delete</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
    import csmMultiSelect from '../../selects/csm-multi-select'
    import csmTextField from '../../text-fields/csm-text-field'

    export default {
        name: "csm-order-line",
        components: {
            csmMultiSelect,
            csmTextField
        },
        props: {
            line_data: {
                type: Object,
                default() {
                    return {}
                }
            },
            product: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                dialog: false,
                discounts: [
                    {text: 'За лояльность, 10%', value: 10},
                    {text: 'За вредность, 15%', value: 15}
                ],
                discountsSumm: 0,
                correction: 0,
            }
        },
        computed: {
            getAppliedDiscounts() {
               for (let item of this.line_data.appliedDiscounts) {
                       return item.summa;
               }
            },
            totalPriceWithDiscounts() {
                let discnt = (this.line_data.price - this.getAppliedDiscounts) * this.line_data.quantity;
                return  discnt - ( discnt * (this.discountsSumm + this.correction) ) / 100;
            },
            applyDiscount() {
                if (!this.dialog) {
                    return (this.discountsSumm || this.correction) !== 0;
                }
            }
        },
        methods: {
            removeLine() {
               this.$emit('removeLine');
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
            incrementQty() {
                this.$emit('incrementQty');
            },
            decrementQty() {
                this.$emit('decrementQty');
            },
        }
    }
</script>

<style>
  .csm-order-list-item .item_lines .flex {
    border: none;
    text-align: center;
  }
</style>