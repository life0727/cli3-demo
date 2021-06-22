<template>
    <div class="Tools">
        <el-button-group>
            <el-tooltip v-for="(item,index) in options" :key="index" :content="item.tooltip" :disabled="item.tooltip.length == 0" placement="bottom" effect="light">
                    <el-button @click.stop="handlerEvent(item.name)" :icon="item.icon" :plain="Boolean(!item.plain)" round type="primary">{{item.label}}</el-button>
                    <el-dropdown @command="styleHandel" trigger="click"  v-if="item.name == 'switchstyle'">
                        <el-button @click.stop="handlerEvent(item.name)" :icon="item.icon" :plain="Boolean(!item.plain)" round type="primary">{{item.label}}</el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="oitem in item.options" :key="oitem" :command="oitem">{{oitem}}</el-dropdown-item>
                        </el-dropdown-menu>
                </el-dropdown>
            </el-tooltip>
        </el-button-group>

        <simplePanel class="pointTable_container" :simplePanelVisible.sync="isShowTrackList" title="框选列表" mini left="5%" top="5%" height="400px" width="600px"> 
            <template #content>
                <el-table
                    :data="showTrackList"
                    @row-click="rowClick"
                    :row-class-name="tableRowClassName"
                    border
                    stripe
                    show-overflow-tooltip
                    style="width: 100%">
                    <el-table-column
                        :show-overflow-tooltip="true"
                        align='center'
                        v-for="item in trackTableHeaderList"
                        :min-width="item.minWidth"
                        :max-width="280"
                        :key="item.prop"
                        :label="item.label"
                        :prop="item.prop">
                            <template #header>
                                <el-tooltip effect="dark" :content="item.label" placement="top">
                                    <span>{{item.label}}</span>
                                </el-tooltip>
                            </template>
                    </el-table-column>
                </el-table>
            </template>
        </simplePanel>

    </div>
</template>

<script>
import simplePanel from '../layout/simplePanel'
    export default {
        name: 'Tools',
        props: {
            toolsOptions: { 
                type: Array,
                required: true
            },
            base: {
                type: Object,
                //required: true
            }
        },
        data() {
            return {
                showTrackList:[],//展示的点
                trackTableHeaderList:[],//展示的点table头部
                isShowTrackList:false,//是否展示点弹框
                //isShowPointDetail:false,//是否展示点详情
                clickPoint:{},//点详情数据
                points:[],//测量点数组
                loading:'',
                currentTableClick:''//当前表格点击标识
            };
        },
        components: {
            //PointDetail,
            simplePanel
        },
        created(){
           // bus.$on('PointSimplifier', ({name,data})=> {
           // });
        },
        mounted(){
     
            //缓存Style
            const styleIndex = this.options.findIndex(item => item.label === '肤')
            if(this.options[styleIndex].defaultStyle){
                setTimeout((_ => this.styleHandel(this.options[styleIndex].defaultStyle)),200)
            } 
        },
        computed:{
            options: {
                get() {
                    return this.toolsOptions
                },
                set(val) {
                    this.$emit('update:toolsOptions', val)
                }
            }
        },
        methods: {
            clearPoints(){
            },
            handlerEvent(name){
                switch(name){
                    case 'getDistance':
                        this.getDistance(name);
                        break;
                    case 'getTrackPoints':
                        this.getTrackPoints(name);
                        break;    
                    case 'getPositionInfo':
                        this.getPositionInfo(name);
                        break;     
                    case 'switchstyle':
                        this.switchstyle(name);
                        break;     
                    default:
                        break;
                }
            },
            switchStyle(name){
                this.options.forEach((item,index) => {
                    const _item = item;
                    _item.plain = item.name == name ? true : false;
                    this.$set(this.options,index,_item)
                })
            },
    async   getTrackPointsList(){
                await this.loadingMouseTool();
                 //const massMarksData = [].concat(...massMarks.map(item => item.getData()));
                
            },
            createTrackTableHeaderList(_showTrackList){//轨迹点tableHeader
            },
            getTrackPoints(name){

            },

            switchstyle(name){
                this.switchStyle(name)
            },
            rowClick(row){//表格某一行被点击
            },
            tableRowClassName({ row }){//表格行默认样式
            if ((row.lnglat+ (row.tm || row.time || '')).toString() === this.currentTableClick.toString()) {
                    return 'current-row';
                }
            },

        }
    };
</script>
<style scoped lang='less'>
.Tools {
    position: absolute;
    z-index: 100;
    left:100px;
    top: 20px;
    .el-button-group{
        opacity: .85;
        >.el-dropdown{
            margin-left: 0;
            float: left;
        }
        .el-button--primary.is-plain{
            border-color: @themeColor;
        }
    }
    /deep/.pointTable_container{
        .simplePanel-content{
            .el-table__body tr.current-row>td{
                background-color: lightskyblue;
            }
            .el-table{
                .el-table__header th .cell {
                    padding: 5px 0;
                    white-space: nowrap;
                }
            }
        }
    }
    .point_detail{
        top:0px;
        width:260px;
        height:300px;
        position: absolute;
        background-color: white;
        font-size: 14px;
        z-index: 1000;
        padding: 5px 10px;
        border-radius: 10px;
        color: #72767b;
        overflow-y: scroll;
    }
}
</style>
