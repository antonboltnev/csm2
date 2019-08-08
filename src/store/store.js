import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        orderList: [],
        selectedProducts: []
    },
    getters: {
        products(state) {
            return state.orderList[0];
        }
    },
    mutations: {
        getOrderListFromAPI: (state, productData) => {
            state.orderList.push(productData);
        },
        productSelection: (state, {selectedProduct, isSelected}) => {
            let selectedProductIndex = state.orderList[0].map((e) => e.article).indexOf(selectedProduct);
            let selectedProductItem = state.orderList[0][selectedProductIndex];

            if (isSelected) {
                state.selectedProducts.push(selectedProductItem);
            } else {
                state.selectedProducts.splice(state.selectedProducts.map((e) => e.article).indexOf(selectedProduct), 1);
            }
        },
        clearSelection: (state) => {
            state.selectedProducts.splice(0, state.selectedProducts.length);
        },
        decrementQty: (state, product) => {
            if (state.orderList[0][product].qty > 1) {
                state.orderList[0][product].qty--
            }
            return false;
        },
        incrementQty: (state, product) => {
            state.orderList[0][product].qty++
        },
        preDeleteSelectedProducts: (state) => {
            for (let i = 0; i < state.selectedProducts.length; i++) {
                state.orderList[0].map(function (e) {
                    if (e.article === state.selectedProducts[i].article) {
                        Vue.set(state.orderList[0][state.orderList[0].indexOf(e)], 'status', 'hidden');
                    }
                    return false;
                });
            }
        },
        deleteSelectedProducts: (state) => {
            for (let i = 0; i < state.selectedProducts.length; i++) {
                state.orderList[0].map(function (e) {
                    if (e.article === state.selectedProducts[i].article) {
                        state.orderList[0].splice(state.orderList[0].indexOf(e), 1);
                    }
                    return false;
                });
            }
        },
        deleteCurrentProduct: (state, product) => {
            state.orderList[0].splice(product, 1);
        },
        returnProduct: (state, product) => {
                state.orderList[0].map(function (e) {
                    if (e.article === state.orderList[0][product].article) {
                        Vue.set(state.orderList[0][state.orderList[0].indexOf(e)], 'status', '');
                    }
                    return false;
                });
        }
    },
    actions: {
        getOrderListFromAPI({commit}) {
            axios.get('http://localhost:3000/articles')
                    .then(product => {
                        commit('getOrderListFromAPI', product.data);
                    });
        },
        productSelection({commit}, {selectedProduct, isSelected}) {
            commit('productSelection', {selectedProduct, isSelected});
        },
        clearSelection({commit}) {
            commit('clearSelection');
        },
        decrementQty({commit}, product) {
            commit('decrementQty', product);
        },
        incrementQty({commit}, product) {
            commit('incrementQty', product);
        },
        preDeleteSelectedProducts({commit}) {
           commit('preDeleteSelectedProducts');
        },
        deleteSelectedProducts({commit}) {
            commit('deleteSelectedProducts');
        },
        deleteCurrentProduct({commit}, product) {
            commit('deleteCurrentProduct', product);
        },
        returnProduct({commit}, product) {
            commit('returnProduct', product);
        }
    }
});

export default store;