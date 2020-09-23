/**
 * 路由起名规则'name_body';
 * 'name'对应util里的changeIconFromRoutePath方法的case
 */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/index',
            component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Index.vue'),
            meta: { title: '系统首页' }
            //redirect: '/dashboard',
            //redirect: '/LINK_TrafficVolume'
        },
        {
            path: '/subHome',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Layout/subHome.vue'),
            meta: { title: 'subHome', keepAlive: true },
            children: [
                {
                    path: '/subHome/createPage',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/createPage/createPage.vue'),
                    meta: { title: '创建页面', dataSetId: '', keepAlive: true }
                }
            ]
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Layout/Home.vue'),
            meta: { title: 'home' },
            //redirect: '/index',
            redirect: '/LINK_TrafficVolume',
            children: [
                {
                    path: '/showPicList',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BadCase/showPicList.vue'),
                    meta: { title: '示例图片维表展示' }
                }
            ]
        },
        
        {
            path: '*',
            redirect: '/404'
        }
    ]
});