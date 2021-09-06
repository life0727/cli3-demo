<template>
  <div class="tablePro">
        <el-popover
            placement="bottom"
            popper-class="crowd_table_operate_popper"
            trigger="click">
            <el-button size="mini" type="warning" @click="openWhitelistPanelVisible">2</el-button>
            <el-button type="danger" size="mini" @click="deleteRow(row)">3</el-button>
            <el-button type="success" size="mini" @click="changeWorkspace(row)">12</el-button>
            <span slot="reference" style="cursor: pointer;font-size:18px">...</span>
        </el-popover>

  </div>
</template>

<script>

  export default {
    name:'tablePro',
    props:{
        row:{
            type:Object,
            default(){
                return {}
            }
        },
        prop1:{
            type:Object,
            default(){
                return {}
            }
        },
        prop2:{
            type:String,
            default:''
        }
    },
    data () {
      return {
          currentRuleData:{
              ruleId:'',
              ruleName:'',
              whiteList:[{
                  value:'1'
              },{
                  value:'2'
              }]
          },
          whitelistPanelVisible:false,
          workSpaceConfimVisible:false
      };
    },
    computed: {},
    components: {
        simplePanel,
        workSpaceConfim
    },
    watch: {},
    mounted() {
    },
    methods: {
        deleteRow(row){
             this.prop1.removeTips(row.ruleName,async(res)=>{
                if(res){
                    await this.prop1.deleteCrowdSelect(row.id);
                    this.$message.info('删除成功')
                    bus.$emit('getCrowdSelectTableList')
                }
            });
        },
        changeWorkspace(row){
            this.workSpaceConfimVisible = true
        },
        openWhitelistPanelVisible(){
    
    
        },
    }
  }

</script>
<style lang='less' scoped>
.tablePro{
    width: 50px;
    .formPanel{
        .el-form{
            padding: 15px 15px 0 0;
            .whiltList{
                .operate{
                    position:absolute;
                    right: -50px;
                    i:hover{
                        color: red;
                    }
                    .el-icon-close{
                        margin-left: 5px;
                    }
                }
            }
        }
    }
}
</style>
