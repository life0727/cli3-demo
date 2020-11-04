<template>
    <div class="header" v-if="headerShow">
        <!-- 折叠按钮 -->

        <div class="logo" @click="toHome"></div>
        <div :class="$route.path != i.path ? 'name' : 'name active'" v-for="i in sysName" :key="i.path" @click="toRoute(i)">{{i.name}}</div>
        <div class="collapse-btn" @click="collapseChage" v-if="this.$route.path.indexOf('subHome/') == '-1'">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="header-right">
            <div class="header-user-con">

                <div class="toPreVision">
                    <el-link href="/tools" target="_blank" icon="el-icon-bell" :underline="false">前往旧版</el-link>
                </div>
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i :class="fullscreen ? 'exitFullScreen' : 'el-icon-rank'"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <!-- <div class="btn-bell">
                    <el-tooltip
                        effect="dark"
                        :content="message?`有${message}条未读消息`:`消息中心`"
                        placement="bottom"
                    >
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div> -->
                <!-- 用户头像 -->
                <!-- <div class="user-avator">
                    <img src="../../assets/img/img.jpg" />
                </div> -->
                <div class="user-avator">
                    <i class="el-icon-user"></i>
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <!-- <i class="el-icon-caret-bottom"></i> -->
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <!-- <a href="" target="_blank">
                            <el-dropdown-item></el-dropdown-item>
                        </a>
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item> -->
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import bus from '../../../utils/bus';

export default {
    data() {
        return {
            collapse: false,
            fullscreen: false,
            username:'',
            headerShow:true,//header是否显示 
            sysName:[]
            //message: 2
        };
    },
    // computed: {
    //     sysName:{
    //         get:function(){
                
    //         },
    //         set:function(val){

    //         }
    //     }
    // },
    created(){
        this.$fetch({ //获取用户信息
            method:'get',
            url:'login',
            success:this.initAccount
        });
        this.isIniframe();//判断是否再iframe中
        this.initSysName()//生成header数组
        //IDPermiss权限认证
        bus.$on('IDPermiss', msg => {
            console.log('IDPermiss',msg)
            //console.log('sysName',this.sysName);
            if(!msg.hasIDpermiss){
                this.sysName = this.sysName.filter(i => i.path !== '/subHome/idData')
            }
        });

    },
    methods: {

        isIniframe(){
            if (self != top) { //self.frameElement && self.frameElement.tagName == "IFRAME"
            　　console.log('在iframe中---self.frameElement',self)
                this.headerShow = false;
            }else{
                console.log('不再iframe中')
            }
        },
        initSysName(){
            const routePath = this.$route.path;
            const poiArringReg = /^\/subHome\/Arriving\//;
            let res = [
                {
                    name:'台',
                    path:'/LINK_TrafficVolume'
                }
            ];
            switch ( routePath) {
                case '/subHome/callPoint':
                    res = [
                        {
                            name:'注',
                            path:'/subHome/callPoint'
                        }
                    ];
                    break;
                case '/subHome/callCar':
                    res = [
                        {
                            name:'示',
                            path:'/subHome/callCar'
                        }
                    ];
                    break;    
                case '/subHome/Track_Split':
                case '/subHome/Track_Split_Log':
                //case '/subHome/createPage': 
                    res = [
                        {
                            name:'展示',
                            path:'/subHome/Track_Split'
                        },
                        {
                            name:'志',
                            path:'/subHome/Track_Split_Log'
                        },
                        {
                            name:'据展示',
                            path:'/subHome/createPage',
                            isOut: true
                        }
                    ];
                    break;
                case '/subHome/location_map':
                    res = [
                        {
                            name:'化',
                            path:'/subHome/location_map'
                        }
                    ]
                    break;
                case '/subHome/POI':    
                case '/subHome/Arriving':   
                case '/subHome/PoiShowLoc':   
                //case '/subHome/createPage':   
                    res = [
                        {
                            name:'运',
                            path:'/subHome/POI'
                        },
                        {
                            name:'P展示',
                            path:'/subHome/Arriving'
                        },
                        {
                            name:'PO示',
                            path:'/subHome/PoiShowLoc'
                        },
                        {
                            name:'自示',
                            path:'/subHome/createPage',
                            isOut: true
                        }
                    ]
                    break;
                case '/subHome/crowd_select':     
                case '/subHome/crowd_fence':     
                case '/subHome/crowd_behaviour':     
                case '/subHome/heatMap':     
                    res = [
                        {
                            name:'人',
                            path:'/subHome/crowd_select'
                        },
                        {
                            name:'栏',
                            path:'/subHome/crowd_fence'
                        },
                        {
                            name:'为',
                            path:'/subHome/crowd_behaviour'
                        },
                        {
                            name:'图',
                            path:'/subHome/heatMap'
                        }
                    ]
                    break; 
                case '/subHome/idPermission':
                case '/subHome/idData':
                case '/subHome/idTaskList':
                    res = [
                        // {
                        //     name:'请',
                        //     path:'/subHome/idPermission'
                        // },
                        {
                            name:'务',
                            path:'/subHome/idData'
                        },
                        {
                            name:'表',
                            path:'/subHome/idTaskList'
                        }
                    ]    
                    break;
                case '/subHome/createPage':
                    res = [
                        {
                            name:'面',
                            path:'/subHome/createPage'
                        }
                    ]
                    break;    
                case (routePath.match(poiArringReg)) && (routePath.match(poiArringReg)).input:
                    res = [
                        {
                            name:routePath.slice(routePath.lastIndexOf('/') + 1,routePath.length),
                            path:routePath
                        }
                    ]
                    break;     
                default:
                    break;
            }
            //return res;
            this.sysName = res;
        },
        toHome(){
            this.$route.path !== '/LINK_TrafficVolume' && this.$router.push('/');
        },
        initAccount(data){
            localStorage.setItem('accoutInfo',JSON.stringify(data))
            this.username = data.user && data.user.lastName || '未登录';
        },
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            // if (command == 'loginout') {
            //     localStorage.removeItem('ms_username');
            //     this.$router.push('/login');
            // }
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
        toRoute(i){
            //console.log(i)
            if(this.$route.path === i.path) return;
            if(i.isOut){
                const routeData = this.$router.resolve({
                    path: i.path,
                    //query: {data:qs.stringify(this.testList)},
                });
                window.open(routeData.href, '_blank');
            }else{
                this.$router.push(i.path)
            }
        },
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped lang='less'>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 55px;
    font-size: 21px;
    color: #fff;
    background-color: #35363a;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 55px;
}
.collapse-btn:hover{
    background-color: #35363a;
}
.header .logo {
    transform: scale(.6);
    float: left;
    margin:0 -8px 0 10px;
    width: 70px;
    height: 55px;
    line-height: 55px;
    background: url('../../../assets/img/logo/logo.png');
    background-position: -350px -70px;
    cursor: pointer;
}
.header .name {
    float: left;
    margin-left: 15px;
    line-height:55px;
    font-size: 18px;
    cursor: pointer;
    color: #999;
}
.header .active{
    color: white;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 55px;
    align-items: center;
}
.exitFullScreen{
    height: 43px;
    width: 43px;
    display: inline-block;
    transform: scale(.45);
    margin-top: -15px;
    background: url('https://shark2.douyucdn.cn/front-publish/live_player-master/assets/images/fullscreen_exit1_51cb34.webp')
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 36px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}

.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.toPreVision a{
    margin-right: 20px;
    line-height:55px;
    font-size: 14px;
    color: white;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
