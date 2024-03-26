<<<<<<< HEAD
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);
=======
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
>>>>>>> origin/main

new Vue({
  router,
  store,
<<<<<<< HEAD
  render: h => h(App)
}).$mount('#app')
=======
  render: (h) => h(App),
}).$mount("#app");
>>>>>>> origin/main
