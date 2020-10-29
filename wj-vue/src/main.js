import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from "./vuex/vuex"


var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8088/api'
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user.username) {
      axios.get("/authentication").then(resp=>{
       if (resp) next()
      })
      
    } else {
      next({
        path: 'login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }

})