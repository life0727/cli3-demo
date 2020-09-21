import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const state = {//要设置的全局访问的state对象
    testList:[
        {
            'name':'火警',
            'num':119
        },
        {
            'name':'警察',
            'num':110
        }
    ]
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
 
export default store;
