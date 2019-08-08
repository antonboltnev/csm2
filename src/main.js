import Vue from 'vue'
import App from './App.vue'
import store from './store/store.js'
import router from './router/router.js'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import vuetify from './plugins/vuetify';
import VueTheMask from 'vue-the-mask'

Vue.use(VueTheMask)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  vuetify,
  store
}).$mount('#app')
