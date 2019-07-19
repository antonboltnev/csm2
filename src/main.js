import Vue from 'vue'
import App from './App.vue'
import store from './store/store.js'
import router from './router/router.js'
import Vuetify from 'vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'


Vue.use(Vuetify, {
    iconfont: 'md'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
    router,
    store
}).$mount('#app')
