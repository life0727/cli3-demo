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
                        :sortable="item.sortable"
                        :sort-method="item.sortMethod"
                        :sort-by="item.sortBy"
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
                                <el-badge v-for="(oitem, key) in scope.row['operation_list']" :key="key" :is-dot="oitem.isDot" value="新" :hidden="!oitem.badge">
                                    <el-button 
                                        @click="oitem.clickFun(scope.row,scope.$index,item)"
                                        :style="{width:oitem.width,padding:oitem.padding}"
                                        :disabled="oitem.isDisabled"
                                        :type="oitem.colorType" 
                                        size="mini">
                                        {{ oitem.name }}
                        　　　　　　 </el-button>
                                </el-badge>
                            </div>
                            <div v-else class="operateBtn">
                                    <el-button 
                                        v-for="(oitem, key) in item.operation" 
                                        :key="key"
                                        @click="oitem.clickFun(scope.row,scope.$index,item)"
                                        :style="{width:oitem.width,padding:oitem.padding}"
                                        :disabled="oitem.isDisabled"
                                        :type="oitem.colorType" size="mini">
                                        {{ oitem.name }}
                        　　　　　　 </el-button>
                            </div>
                            <span v-if="item.hasCustomize" class="operateBtn_customize">
                                <component :is="item.customize" :row="scope.row" :prop1="item.prop1" :prop2="item.prop2" />
                            </span>
                            
                        </div>
                        <!-- <div v-if="item.type === 'selection'">
                            <span>
                                <el-checkbox v-model="scope.row[item.prop]"></el-checkbox>
                            </span>
                        </div> -->
                        <div v-else :style="{whiteSpace:item.iswhiteSpace ? 'normal' : 'nowrap'}">
                            <span v-if="item.isLink"><el-link type="primary" @click="linkTo(scope.row,item)">{{ scope.row[item.content] || scope.row[item.prop] }}</el-link></span>
                            <span v-else-if="item.isCustomize"><component :is="item.customize" :row="scope.row" :prop1="item.prop1" :prop2="item.prop2" /></span>
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
                    //row.table_index = rowIndex //可以获取表格行索引
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
            },
            DefaultPageParams: {
                type: Object,
                default: function () {
                    return {
                        'pageNum': 1,
                        'pageSize': 10
                    }
                }
            }
        },
        data() {
            return {
                data: [],//table总数居
                // pageParams: {
                //     'pageNum': 1,
                //     'pageSize': 20
                // }
            };
        },
        computed: {
            pageParams: {
                get() {
                    return this.DefaultPageParams
                }
            }
        },
        mounted() {
        },
        methods: {
            handleSelectionChange(val){
                console.log('handleSelectionChange',val)
                this.$emit('handleSelection',val)
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
                    tr.current-row>td{
                        background-color: lightskyblue;
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
                .el-badge{
                    .el-badge__content{
                        top: 8px;
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
