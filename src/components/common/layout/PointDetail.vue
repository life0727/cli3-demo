<template>
    <div class="point-detail">
        <p class="el-dialog__header"><span>{{title}}</span><span class="el-icon-close" @click="closePanel"></span></p>
        <div class="point-detail-content">
            <ul>
                <li v-for="(value,name) in pointData"  :key="name">
                    <el-tooltip :content="name" placement="top" effect="light" :open-delay="800">
                        <span v-if="['poi_list','poi_start','poi_end'].includes(name)" @click="addPOI({name,value})" class="detail-name poi-name">{{name}}:</span>
                        <span v-else class="detail-name" :style="{width:nameWidth}">{{name}}:</span>
                    </el-tooltip>    
                    <span v-if="name != 'links' && typeof value != 'object'" class="detail-value">
                        {{value}}
                    </span>
                    <span v-if="name != 'links' && typeof value == 'object'" style="overflow-y: auto">
                        <p v-for="(subVal,index) in value" :key="index">
                            <span>{{index}}:</span><span>{{subVal}}</span>
                        </p>
                    </span>
                    <span v-else-if="name == 'links' && value" style="max-height:300px;overflow-y: auto;width:100%;" >
                        <json-view :data="value" :closed="true"/>
                    </span>
                    <!--<span v-else-if="name == 'point_extdata'" style="max-height:300px;" >
                        <json-view :data="value" :closed="true"/>
                    </span>-->
                </li>
            </ul>
            <el-button type="primary" round class="Track-Split-Log-btn" size="mini" v-show="showClearAllLinkBtn" @click="clearAllLink">清除候选LINK</el-button>
        </div>
    </div>
</template>

<script>
import jsonView from 'vue-json-views'
    export default {
        name: 'PointDetail',
        props: {
            pointData: {
                type: Object
            },
            showClearAllLinkBtn:{
                type:Boolean,
                default:false
            },
            title:{
                type:String,
                default:'Point Detail'
            },
            nameWidth:{
                type:String,
                default:'85px'
            }
        },
        components:{
            jsonView
        },
        methods: {
            closePanel() {
                this.$emit('closePanel');
            },
            clearAllLink(){
                this.$emit('clearAllLink');
            },
            addPOI({...params}){
                this.$emit('addPOI',params)
            }
        }
    };
</script>

<style scoped lang="less">
    .point-detail {
        width: 100%;
        box-sizing: border-box;
        .el-dialog__header{
            padding: 0px 5px 5px;
        }
        p {
            overflow: hidden;
            border-bottom: 1px solid #DCDFE6;

            span:first-child {
                float: left;
                margin-right: 10px;
            }

            span:last-child {
                float: right;
                cursor: pointer;
            }
        }
        .point-detail-content{
            cursor: default;
            //position: relative;
            height: 100%;
            ul {
                list-style: none;
                font-size: 12px;
                padding-left: 10px;

                li {
                    display: flex;
                    span {
                        line-height: 25px;
                    }

                    .detail-name {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        width: 85px;
                        min-width: 45px;
                        margin-right: 15px;
                    }

                    .poi-name{
                        cursor: pointer;
                        color: @themeColor;
                    }

                    .detail-value {
                        text-align: left;
                        width: inherit;
                    }
                }
            }

            .Track-Split-Log-btn {
                opacity: .7;
                margin-top: 5px;
            }
        }

        //给不同的jsonLink赋不同的颜色
        /deep/.json-view-container:nth-child(14n+1){
            .json-key,.json-value{
                color:#d81e06 !important;
            }
        }
        /deep/.json-view-container:nth-child(14n+2){
            .json-key,.json-value{
                color:#A20055 !important;
            }
        }
        /deep/.json-view-container:nth-child(14n+3){
            .json-key,.json-value{
                color:#AA7700 !important;
            }
        }
        /deep/.json-view-container:nth-child(14n+4){
            .json-key,.json-value{
                color:#00AA88 !important;
            }
        }
        /deep/.json-view-container:nth-child(14n+5){
            .json-key,.json-value{
                color:#2200AA !important;
            }
        }
        /deep/.json-view-container:nth-child(14n+6){
            .json-key,.json-value{
                color:#FF3EFF !important;
            }
        }
        /deep/.json-view-container:nth-child(14n+7){
            .json-key,.json-value{
                color:#C63300 !important;
            }
        }
        /deep/.json-view-container:nth-child(14n+8){
            .json-key,.json-value{
                color:#00AA00 !important;
            }
        }
        /deep/.json-view-container:nth-child(14n+9){
            .json-key,.json-value{
                color:#66009D !important;
            }
        }
        /deep/.json-view-container:nth-child(14n+10){
            .json-key,.json-value{
                color:#88AA00 !important;
            }
        }
        /deep/.json-view-container:nth-child(14n+11){
            .json-key,.json-value{
                color:#AA0000 !important;
            }
        }
        /deep/.json-view-container:nth-child(14n+12){
            .json-key,.json-value{
                color:#EEEE00 !important;
            }
        }
        /deep/.json-view-container:nth-child(14n+13){
            .json-key,.json-value{
                color:#0088A8 !important;
            }
        }
        /deep/.json-view-container:nth-child(14n+14){
            .json-key,.json-value{
                color:#EE7700 !important;
            }
        }
    }
</style>
