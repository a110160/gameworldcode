// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { i18n } from "./i18n";
import "./vee-validate";



import 'bootstrap';
import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filter/currency';

Vue.use(VueAxios, axios)
// Vue.use(ValidationProvider)

axios.defaults.withCredentials=true;
Vue.config.productionTip = false

Vue.component('Loading',Loading); //讀取效果

Vue.filter('currency',currencyFilter);

/* eslint-disable no-new */




new Vue({
  i18n,
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
})

router.beforeEach((to, from, next) => {
  console.log(to,from,next)
  if(to.meta.requiresAuth){
    const api=`${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      console.log(response.data);
      if(response.data.success){
        next();
      } else {
        next({
          path:'/login'
        })
      }
    })
  } else {
    next();
  }
})
