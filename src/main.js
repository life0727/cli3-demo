import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
//import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import Fetch from './http/server/Fetch'
import store from './vuex/store'
//import './components/common/directives'; //注册指令
import 'babel-polyfill';
import VueClipboard from 'vue-clipboard2'
import Pagination from '../src/components/common/Pagination';
import 'xe-utils'//tree-table
import VXETable from 'vxe-table' //tree-table
import 'vxe-table/lib/index.css' //tree-table-js
import { getBaseUrl } from './utils/util'

import 'vx-easyui/dist/themes/default/easyui.css';
import 'vx-easyui/dist/themes/icon.css';
import 'vx-easyui/dist/themes/vue.css';
import EasyUI from 'vx-easyui';

import './utils/drag'

Vue.config.productionTip = false;

Vue.use(ElementUI, {
    size: 'small'
});
Vue.use(VXETable);

Vue.use(EasyUI);

Vue.use(VueClipboard);

Vue.component('Pagination', Pagination);

Vue.prototype.$fetch = Fetch;

Vue.prototype.$baseUrl = getBaseUrl();


//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    // const role = localStorage.getItem('ms_username');
    // if (!role && to.path !== '/login') {
    //     next('/');
    // } else if (to.meta.permission) {
    //     role === 'admin' ? next() : next('/403');
    // } else {
    //     next();
    // }
    //login
    // Fetch({
    //     method:'get',
    //     url:'login',
    //     success:next()
    // })

    next()

});
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
