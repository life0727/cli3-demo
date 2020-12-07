<template>
    <div class="Table">
        <el-button type="primary" icon="el-icon-refresh" size="mini" style="margin-bottom:10px;" @click="getList" v-if="showRefreshBtn">更新</el-button>
        <div class="table-container">
            <el-table
                    ref="table"
                    :data="tableData"
                    border
                    :max-height="maxHeight"
                    style="width: 100%"
                    :row-class-name="tableRowClassName"
                    @row-click="rowClick"
                    @cell-dblclick="cellDbClick"
                    @select="handleSelectionRow"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        v-if="isIndex"
                        type="index"
                        label="序号"
                        :align="tableHeadData[0].align ? tableHeadData[0].align : 'center'"
                        width="50">
                </el-table-column>
                <el-table-column
                        label-class-name="selectionColumn"
                        v-if="isChecked"
                        type="selection"
                        :align="tableHeadData[0].align ? tableHeadData[0].align : 'center'"
                        width="115">
                </el-table-column>
                
                <el-table-column
                        v-for="(item,index) in tableHeadData"
                        :align="item.align ? item.align : 'center'"
                        :show-overflow-tooltip="!item.operation && true"
                        :key="index"
                        max-width="350"
                        :min-width="item.minWidth"
                        :prop="item.prop"
                        :label="item.label"
                        :fixed="item.fixed"
                >
                    <template #header>
                        <el-tooltip effect="dark" :content="item.label" placement="top">
                            <span>{{item.label}}</span>
                        </el-tooltip>
                    </template>
                    <template slot-scope="scope" >
                        <div v-if="item.operation" >
                            <div v-if="scope.row['operation_list'] && item.operation.length === 0" class="operateBtn">
                                <el-button 
                                    v-for="(oitem, key) in scope.row['operation_list']" 
                                    :key="key"
                                    @click="oitem.clickFun(scope.row,scope.$index,item)"
                                    :style="{width:oitem.width}"
                                    :disabled="oitem.isDisabled"
                                    :type="oitem.colorType" 
                                    size="mini">
                                    {{ oitem.name }}
                    　　　　　　 </el-button>
                            </div>
                            <div v-else class="operateBtn">
                                <el-button 
                                    v-for="(oitem, key) in item.operation" 
                                    :key="key"
                                    @click="oitem.clickFun(scope.row,scope.$index,item)"
                                    :style="{width:oitem.width}"
                                    :disabled="oitem.isDisabled"
                                    :type="oitem.colorType" size="mini">
                                    {{ oitem.name }}
                    　　　　　　 </el-button>
                            </div>
                            
                        </div>
                        <!-- <div v-if="item.type === 'selection'">
                            <span>
                                <el-checkbox v-model="scope.row[item.prop]"></el-checkbox>
                            </span>
                        </div> -->
                        <div v-else>
                            <span v-if="item.isLink"><el-link type="primary" @click="linkTo(scope.row,item)">{{ scope.row[item.content] || scope.row[item.prop] }}</el-link></span>
                            <span v-else>{{ scope.row[item.content] || scope.row[item.prop] }}</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <pagination
                v-if="total > 0"
                :total="total"
                :hidden="pageHidden"
                :page.sync="pageParams.pageNum"
                :limit.sync="pageParams.pageSize"
                @pagination="getList"
        />

    </div>
</template>

<script>
    export default {
        name: 'Table',
        props: {
            tableData: {
                type: Array,
                default: function () {
                    return []
                }
            },
            tableHeadData: {
                type: Array,
                default: function () {
                    return []
                }
            },
            total: {
                type: Number,
                default: 0
            },
            showRefreshBtn:{
                type:Boolean,
                default:false
            },
            tableRowClassName:{
                type:Function,
                default:function({row,rowIndex}){
                    //console.log('tableRowClassName',row)
                }
            },
            isChecked:{
                type:Boolean,
                default:false
            },
            isIndex:{
                type:Boolean,
                default:false
            },
            maxHeight:{
                type:String,
                default:'initial'
            },
            pageHidden:{
                type:Boolean,
                default:false
            }
            // DefaultPageParams: {
            //     type: Object,
            //     default: function () {
            //         return {
            //             'pageNum': 1,
            //             'pageSize': 10
            //         }
            //     }
            // }
        },
        data() {
            return {
                data: [],//table总数居
                pageParams: {
                    'pageNum': 1,
                    'pageSize': 10
                }
            };
        },
        mounted() {
        },
        methods: {
            handleSelectionChange(val){
                this.$emit('handleSelectionChange',val)
            },
            handleSelectionRow(selection,row){
                this.$emit('handleSelectionRow',selection,row)
            },
            cellDbClick(row, column, cell, event){
                this.$emit('cellDbClick',row, column, cell, event)
            },
            rowClick(row, column, event){
                this.$emit('rowClick',row, column, event)
            },
            getList() {
                this.$emit('getList',this.pageParams)
            },
            linkTo(row,column){
                this.$emit('linkTo',row, column)
            }
        }
    };
</script>
<style lang="less">
    .Table {
        margin: auto;
        width: 100%;
        height: 100%;

        .table-container {
            position: relative;
            .el-table__body{
                tbody{
                    td{
                        padding: 5px 0;
                    }
                }
            }
            .operateBtn{
                display:flex;
                flex:1;
                justify-content:space-around;
                .el-button {
                    padding: 7px;
                    width: 40px;
                    span{
                        display: inline-block;
                        width: 100%;
                    }
                }
                    
            }
        }

    }

    .Table .el-table__header th .cell {
        padding: 6px 0;
        white-space: nowrap;
    }
</style>
