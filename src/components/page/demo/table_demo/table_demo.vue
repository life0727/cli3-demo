
<template>
    <div class="table_demo">
        <div class="container">
            <div class="table" v-if="this.data.length != 0">
                <Table ref="Table" :tableData="data" :tableHeadData="tableHeadData" @rowClick="rowClick" :tableRowClassName="tableRowClassName"  @getList="getTableList" :total="total"/>
            </div>
            <div class="noData" v-else></div>
        </div>
    </div>
</template>

<script>
import Table from '../../common/table/table';
import { IDMapServer } from './idMap.server'

  export default {
    name:'table_demo',
    props:{},
    data () {
      return {
            data:[],
            tableHeadData:[],
            total:0,
            currentPageParams:{
                'pageNum': 1,
                'pageSize': 10
            },
            //currentTableClick:''
      };
    },
    computed: {},
    components: {
        Table
    },
    watch: {
        'currentPageParams.pageNum':{
            handler(val){
                console.log('form.runType',val)
            }
        }
    },
    mounted() {
        this.iDMapServer =  new IDMapServer(this);
        this.getTableList(this.currentPageParams);
    },
    activated(){
        console.log('activated',this.$route.query);
        this.preRender()
    },
    methods: {
        async getTableList({ pageSize = 10, pageNum = 1 }){
            this.iDMapServer.openLoading('.container');
            const params ={
                pageSize,
                pageNum
            };
            const data = await this.iDMapServer.getTaskList(params);
            //const data = await this.iDMapServer.getTestData('taskList');
            //console.log('data',data)
            this.data = this.fomatData(data.rows);
            this.$refs.idPermissionForm.permissList = data.rows //异步传参 没有递归 _ob_ 。 idPermissionForm是子组件
            this.total = data.total;
            this.tableHeadData = this.createTableHeadData(data.rows[0]);
            //this.$nextTick(_ => this.$refs.Table.doLayout()); //重绘表格 数据变动后表格头错乱
        },
        fomatData(data){
            if(!data.length){
                return [];
            };

            return data.map(item => {
                const obj = {};
                if(item.runType === 0){
                    obj.runType_show = '单次运行'
                }else if(item.runType === 1){
                    obj.runType_show = '天级例行'
                }else if(item.runType === 2){
                    obj.runType_show = '周级例行'
                }else{
                    obj.runType_show = '月级例行'
                }
                
                if(item.taskStatus === 0){
                    item.taskStatus_show = '未发布'
                    item.operation_list = [
                        {name: '运行', colorType:'primary',clickFun: this.run},
                        {name: '配置', colorType:'primary', clickFun: this.editRow},
                        {name: '删除', colorType:'danger', clickFun: this.deleteRow}
                    ]
                }else if(item.taskStatus === 1){
                    item.taskStatus_show = '运行中'
                }

                return {
                    ...item,
                    ...obj,
                    checkStatus_show : item.checkStatus === 0 ? '测试未通过' : '测试通过'
                }
            })
        },
        createTableHeadData(data){
            const tableHeadData = [];
            for(let i in data){
                let obj = {};
                switch ( i ) {
                    case 'checkStatus':
                        obj.prop = i;
                        obj.label = '检查状态'
                        obj.minWidth = '150';
                        obj.tableOrder = 13
                        break 
                    case 'runType':
                        obj.prop = 'runType_show';
                        obj.label = '运行方式'
                        obj.tableOrder = 16
                        obj.minWidth = '50'
                        break 
                    case 'taskStatus':
                        obj.prop = 'taskStatus_show';
                        obj.label = '任务状态'
                        obj.tableOrder = 19
                        obj.minWidth = '40'
                        break  
                    default:
                        continue;
                        break;
                }
                tableHeadData.push(obj);
            }
            tableHeadData.push({
                prop:'operate',
                label:'操作',
                tableOrder : 25,
                minWidth:'100',
                operation:[
                    //{name: '查看', colorType:'info', clickFun: this.detailRow},
                    // {name: '配置', colorType:'primary', clickFun: this.editRow},
                    // {name: '删除', colorType:'danger', clickFun: this.deleteRow}
            　　]
            });
            tableHeadData.sort((a,b) => a.tableOrder - b.tableOrder);
            return Object.freeze(tableHeadData) 
        },
        preRender(){
            const { action, data } = this.$route.query;
            if(action === 'add'){
                //const { inputIdName, outputIdName, dataSourceType} = JSON.parse(data);
            }else{
                //this.formPanelVisible = false
            }
        },
        rowClick(row){
            this.currentTableClick = row.id;
        },
        tableRowClassName ({row, rowIndex}) { // 点击行获取table的行索引
            row._index = rowIndex;
            if (row.id === this.currentTableClick) {
                return 'current-row';
            }
        },
    }
  }

</script>
<style lang='less' scoped>
.table_demo{
    .el-table__body tr.current-row>td{
        background-color: lightskyblue;
    }
}
</style>
