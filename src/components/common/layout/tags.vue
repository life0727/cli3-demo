<template>
    <div class="tags" v-if="showTags">
        <!-- <ul>
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
                <router-link :to="item.path" class="tags-li-title">
                    {{item.title}}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
            </li>
        </ul> -->
        <el-tabs v-model="activeRoute" type="card" closable @tab-click="routeTo" @tab-remove="handleTabsEdit">
            <el-tab-pane
                :key="item.path"
                v-for="(item) in tagsList"
                :label="item.title"
                :name="item.path"
            >
            </el-tab-pane>
        </el-tabs>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import bus from '../../../utils/bus';
    export default {
        data() {
            return {
                tagsList: []
            }
        },
        methods: {
            routeTo(tab,ev){ //跳转
                 this.$route.path != tab.paneName && this.$router.push(tab.paneName);
            },
            handleTabsEdit(targetName){
                const index = this.tagsList.findIndex(item => item.path == targetName);
                this.closeTags(index);
                console.log(targetName)
            },
            isActive(path) {
                return path === this.$route.fullPath;
            },
            // 关闭单个标签
            closeTags(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push(item.path);
                }else{
                    this.$router.push('/');
                }
            },
            // 关闭全部标签
            closeAll(){
                this.tagsList = [];
                this.$router.push('/');
            },
            // 关闭其他标签
            closeOther(){
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.fullPath;
                })
                this.tagsList = curItem;
            },
            // 设置标签
            setTags(route){
                const isExist = this.tagsList.some(item => {
                    return item.path === route.fullPath;
                })
                if(!isExist){
                    if(this.tagsList.length >= 8){
                        this.tagsList.shift();
                    }
                    this.tagsList.push({
                        title: route.meta.title,
                        path: route.fullPath,
                        name: route.matched[1].components.default.name
                    })
                }
                bus.$emit('tags', this.tagsList);
            },
            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            },
            activeRoute: {
                get () {
                    return this.$route.fullPath
                },
                set () {
                }
            }
        },
        watch:{
            $route(newValue, oldValue){
                this.setTags(newValue);
            }
        },
        created(){
            this.setTags(this.$route);
            //console.log('this.tagsList',this.tagsList)
            // 监听关闭当前页面的标签页
            bus.$on('close_current_tags', () => {
                for (let i = 0, len = this.tagsList.length; i < len; i++) {
                    const item = this.tagsList[i];
                    if(item.path === this.$route.fullPath){
                        if(i < len - 1){
                            this.$router.push(this.tagsList[i+1].path);
                        }else if(i > 0){
                            this.$router.push(this.tagsList[i-1].path);
                        }else{
                            this.$router.push('/');
                        }
                        this.tagsList.splice(i, 1);
                        break;
                    }
                }
            })
        }
    }

</script>


<style>
    .tags {
        margin-bottom: 10px;
        position: relative;
        height: 45px;
        overflow: hidden;
        background: #fff;
        padding-right: 85px;
        box-shadow: 0 3px 5px #bbb1b1;
        background:linear-gradient(to right,#fff,#eae7e7,#dedada);
    }

    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

    .tags-li {
        float: left;
        margin: 10px 5px 2px 3px;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 23px;
        line-height: 23px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 5px;
        vertical-align: middle;
        color: #333;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    .tags-li.active {
        color: #fff;

    }

    .tags-li-title {
        float: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }

    .tags-li.active .tags-li-title {
        color: #fff;
    }

    .tags-close-box {
        position: absolute;
        right: 5px;
        top: 7px;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        height: 30px;
        z-index: 10;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
        border-bottom-width: 0px;
    }
    .el-tabs--card>.el-tabs__header {
        border-bottom: 0px solid #E4E7ED;
    }
    .el-tabs__header{
        margin: 2px 0 15px 2px;
    }
</style>
