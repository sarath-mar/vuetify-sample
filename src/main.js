import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import userRole from '../src/utils/userRole'
Vue.config.productionTip = false
Vue.mixin({

  methods:{
  isAdmin(){
      return userRole.isAdmin()     
      
    }
  }
})
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
