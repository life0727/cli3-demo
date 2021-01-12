<template>
  <div class="idTaskTable">
      <span style="color:green">{{row[prop1]}}</span> <el-link type="primary" @click="linkTo(row)">{{ row[prop2]}}</el-link>
  </div>
</template>

<script>

  export default {
    name:'idTaskTable',
    props:{
        row:{
            type:Object,
            default(){
                return {}
            }
        },
        prop1:{
            type:String,
            default:''
        },
        prop2:{
            type:String,
            default:''
        }
    },
    data () {
      return {
      };
    },
    computed: {},
    components: {},
    watch: {},
    mounted() {},
    methods: {
        linkTo(row){
            console.log('linkTo',row)
        }
    }
  }

</script>
<style lang='less' scoped>

</style>
