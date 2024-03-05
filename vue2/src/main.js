import Vue from 'vue'
import ElementUI from './plugins/elementUi';

import App from './App.vue'
import './style/index.scss'

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
