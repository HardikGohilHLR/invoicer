import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

// SCSS
import './assets/styles/base.scss';
import 'currency-flags/dist/currency-flags.css';

// Vuelidate
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
