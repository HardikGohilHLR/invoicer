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

// Vue HTML to Paper
import VueHtmlToPaper from 'vue-html-to-paper';
const options = {
	name: '_blank',
	specs: [
		'titlebar=no',
		'scrollbars=no'
	],
	styles: [
		'https://invoice-builder.netlify.app/css/app.css',
		'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap'
	]
}
Vue.use(VueHtmlToPaper, options);

new Vue({
	router,
	render: h => h(App)
}).$mount('#app');
