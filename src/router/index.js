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
            component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/home/index.vue'),
            meta: { title: '系统首页' }
            //redirect: '/dashboard',
            //redirect: '/LINK_TrafficVolume'
        },
        {
            path: '/subHome',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/layout/subHome.vue'),
            meta: { title: 'subHome', keepAlive: true },
            children: [
                {
                    path: '/platform/createPage',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/platform/createPage.vue'),
                    meta: { title: 'createPage', dataSetId: '', keepAlive: true }
                },
                {
                    path: '/platform/tttt',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/platform/tttt.vue'),
                    meta: { title: 'tttt', dataSetId: '', keepAlive: true }
                },
                {
                    path: '/platform/tttt111',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/platform/tttt111.vue'),
                    meta: { title: 'ttt1t11', dataSetId: '', keepAlive: true }
                }
            ]
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/layout/Home.vue'),
            meta: { title: 'home' },
            redirect: '/showPicList',
            //redirect: '/LINK_TrafficVolume',
            children: [
                {
                    path: '/showPicList',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/home/showPicList.vue'),
                    meta: { title: '111' }
                }
            ]
        },
        
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
