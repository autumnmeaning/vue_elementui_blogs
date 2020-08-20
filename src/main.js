// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from  'element-ui'
import Vuex from 'vuex'
import Axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
// 导入markdown编辑器的组件和样式
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import head from './components/header.vue'
import head1 from './components/header1.vue'
import footer from './components/footer.vue'

Vue.config.productionTip = false
Vue.prototype.$axios = Axios

Vue.use(mavonEditor)
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueCookies)
Vue.component('my-head',head);
Vue.component('my-head1',head1);
Vue.component('my-footer',footer);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
