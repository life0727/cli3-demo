<template>
  <div class="runType">
      <simplePanel class="formPanel" :simplePanelVisible.sync="_formPanelVisible" height="70vh" width="700px" top="50px" left="calc(50% - 250px)" position="fixed" title="投放日期设置" >
          <template #content>

          </template>      
          <template #footer>
                <el-button type="primary" size="mini" @click="done" >确定</el-button>
                <el-button type="info" size="mini" @click="_ => _formPanelVisible = false">取消</el-button>
            </template> 
      </simplePanel>
  </div>
</template>

<script>
import simplePanel from '../../../common/panel/simplePanel'
  export default {
    name:'runType',
    props:{
        runTypeFormPanelVisible:{
            type:Boolean,
            default:false
        },
    },
    data () {
      return {
      };
    },
    computed: {
        _formPanelVisible: {
            get() {
                return this.runTypeFormPanelVisible
            },
            set(val) {
                this.$emit('update:runTypeFormPanelVisible', val);
                this.$refs['deployForm'].resetFields();
            }
        },
    },
    components: {
        simplePanel
    },
    watch: {},
    mounted() {},
    methods: {
        done(){
            
        }
    }
  }

</script>
<style lang='less' scoped>
.runType{

}
</style>
