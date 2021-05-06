import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerComponents } from '@/components/Layout/register-component/registerComponent'
Vue.config.productionTip = false
    // import bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css';
// import firebase
import firebase from 'firebase/app';
import 'firebase/firestore';
// import vee-validate
import {
    ValidationObserver,
    ValidationProvider,
    extend,
    localize,

} from "vee-validate";
import Toast from "vue-toastification"; // import vue-toastification
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

//  vee-validate configuration
import env from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";
Object.keys(rules).forEach((rule) => {
    extend(rule, rules[rule]);
});
localize("en", env);
// config for firebase
import config from '../config.json'
firebase.initializeApp(config.firebase);

// Register vee-validate component
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.use(BootstrapVue)
Vue.use(Toast);
Vue.use(IconsPlugin) // Optionally install the BootstrapVue icon components plugin
registerComponents(Vue); // import global registration component file

export const db = firebase.firestore(); // firestore configuration
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')