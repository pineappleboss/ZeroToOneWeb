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
  if(store.state.user.username && to.path.startsWith("/admin")){
    //查询菜单使用路由传参放入vuex
    initAdminMenu(router, store);
  }
  // 已登录状态下访问 login 页面直接跳转到后台首页
  if (store.state.user.username && to.path.startsWith('/login')) {
    next({
      path: 'admin/dashboard'
    })
  }
  //登录验证
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

});
const initAdminMenu=(router,store)=>{
  axios.post("/menu",store.state.user).then(resp=>{
    debugger
    if(resp.data.statusCode===200){
      var fmtRoutes=formatRoutes(resp.data.data);
      debugger
      router.addRoutes(fmtRoutes);
      debugger
      store.commit('initAdminMenu', fmtRoutes);
    }
  })
}

const formatRoutes=(routes)=>{
  let fmtRoutes = []
  debugger
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }

    let fmtRoute = {
      path: route.path,
      component: resolve => {
        require(['./components/admin/' + route.component + '.vue'], resolve)
      },
      name: route.name,
      nameZh: route.nameZh,
      iconCls: route.iconCls,
      children: route.children
    }
    fmtRoutes.push(fmtRoute)
  })
  return  
}