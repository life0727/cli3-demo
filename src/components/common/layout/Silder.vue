<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#35363a"
            text-color="#fff"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else-if="subItem.isOut"
                                :key="subItem.index"
                            >
                                <span>
                                    <router-link v-if="!subItem.originUrl" :to="subItem.index" target="_blank">{{ subItem.title }}</router-link>
                                    <el-link v-else :href="getBaseUrl() + subItem.originUrl" :underline="false" target="_blank">{{ subItem.title }}</el-link>
                                </span>
                            </el-menu-item>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item v-if="item.isOut"  :key="item.index">
                        <i :class="item.icon" @click="jumpLink(item)"></i>
                        <span><router-link :to="item.index" target="_blank">{{ item.title }}</router-link></span>
                    </el-menu-item>

                    <el-menu-item v-else :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../../../utils/bus';
import { mapState , mapGetters , mapMutations , mapActions } from 'vuex'
import { getBaseUrl } from '../../../utils/util'
import qs from 'qs'

export default {
    data() {
        return {
            collapse: false,
            getBaseUrl,
            items: [
                // {
                //     icon: 'el-icon-lx-home',
                //     index: 'dashboard',
                //     title: '系统首页'
                // },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '1',
                    title: 'LIN信息',
                    subs: [
                        {
                            index: 'LI_TrafficVolume',
                            title: 'LIK信息-量'
                        },
                        {
                            index: 'LI_Trajectory',
                            title: 'LIK信息-信息'
                        },
                        {
                            index: 'LINK_Attribute',
                            title: 'LINK信息-LINK属性'
                        }
                    ]
                },
                {
                    icon: 'el-icon-truck',
                    index: '8',
                    title: '轨迹',
                    subs: [
                        {
                            index: '/subHome/Track_Split',
                            title: '展示',
                            isOut: true
                        },
                        {
                            index: '/subHome/Track_Split_Log',
                            title: '日志',
                            isOut: true
                        },
                        {
                            index: 'BadCase_Trajectory',
                            title: 'Case'
                        },
                    ]
                },
                {
                    icon: 'el-icon-document-add',
                    index: '11',
                    title: '自定义页面',
                    subs: [
                        {
                            index: '/subHome/createPage',
                            title: '创建页面',
                            isOut: true
                        },
                    ]
                },
                {
                    icon: 'el-icon-star-off',
                    index: '12',
                    title: '共行',
                    subs: [
                        {
                            index: '/subHome/callPoint',
                            title: '上标注',
                            isOut: true
                        }
                    ]
                },
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        },
        ...mapState(['testList'])
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        //console.log('getBaseUrl',getBaseUrl())
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    },
    methods:{
        jumpLink(item){
            
            const routeData = this.$router.resolve({
                path: item.index,
                //query: {data:qs.stringify(this.testList)},
            });
            window.open(routeData.href, '_blank');

            // console.log('baseUrl',this.$baseUrl);
            // const sendMsg = this.testList;
            // console.log('sendMsg',sendMsg);
            // pop.postMessage({event:'initData',data:this.sendMsg},'*');
        }
    }
};
</script>

<style scoped lang='less'>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 55px;
    bottom: 0;
    height: 100vh;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 190px;
    }
    > ul {
        height: 100%;
    }

    /deep/.el-submenu__title:hover{
        span,i{
            color: @themeColor;
        }
    }

    .el-menu-item:hover{
        color: @themeColor !important;
        a{
            color: @themeColor !important;
        }
        i{
            color: @themeColor;
        }
    }

    .el-menu-item{
        span a{
           color: #fff;
        }
    }

}

</style>
