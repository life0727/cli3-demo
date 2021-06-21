<template>
    <div class="dynamic_form">
        <el-row v-for="(i,index) in formData" :key="index">
            <el-col  :span="22" v-if="type == 'select'">
                <el-form-item :label="index > 0 ? '或' : label" :class="index > 0 ? 'name_' : 'name'">
                    <el-select v-model="i.value" :placeholder="label" :multiple="multiple" :filterable="filterable" :popper-append-to-body="false" @change="selectChange">
                        <el-option v-for="(item,oindex) in selectOptions" :key="oindex" :label="item.name" :value="item.id">
                            <hr style="margin:0;border-color:#ddd" v-show="(oindex == selectOptions.length - 1) && isSelectAdd">
                            <span style="float: left"><i v-show="(oindex == selectOptions.length - 1) && isSelectAdd" class="el-icon-plus"></i> {{ item.name }}</span>
                            <span @click.stop="edit(item)" style="float: right; color: #8492a6; font-size: 13px;margin-right:20px"><i  v-if="isSelectAdd ? isSelectEdit && (oindex != selectOptions.length - 1) : isSelectEdit" class="el-icon-view"></i></span>
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col  :span="22" v-if="type == 'daterange' || type == 'datetimerange'">
                <el-form-item :label="index > 0 ? '或' : label" :class="index > 0 ? 'name_' : 'name'">
                    <el-date-picker
                        v-model="i.value"
                        :type="type"
                        :value-format="valueFormat"
                        :format="valueFormat"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col  :span="2" v-show="formData.length > 1">
                <el-button type="danger" @click="delName(index)" class="delName" round icon="el-icon-minus"></el-button>
            </el-col>
        </el-row>
        <el-button @click="addName" v-show="formData && formData.length < maxLength" type="info" class="addName" round icon="el-icon-plus">{{addLabel}}</el-button>
    </div>
</template>
<script>


export default {
    name:'dynamic_form',
    props: {
        formData: {
            type: Array,
            default() {
                return []
            }
        },
        selectOptions:{
            type: Array,
            default() {
                return [] //[{name:'',value:''}]
            }
        },
        isSelectAdd:{ //是否有新增options   有新增功能的话需要手动在options[]后面加一个options
            type:Boolean,
            default:false
        },
        isSelectEdit:{ //是否可以编辑
            type:Boolean,
            default:false
        },
        type:{
            type:String,
            default:'select'
        },
        label:{
            type:String,
            default:''
        },
        multiple:{
            type:Boolean,
            default:false
        },
        filterable:{
            type:Boolean,
            default:false
        },
        maxLength:{
            type:Number,
            default:1000
        },
        addLabel:{
            type:String,
            default:'添加'
        },
        valueFormat:{
            type:String,
            default:'yyyyMMdd'
        }
    },
    data() {
        return {
 
        };
    },
    mounted() {
       // console.log(this.selectOptions)
    },
    methods:{
        delName(index){
            this.formData.splice(index,1)
        },
        addName(){
            this.formData.push({
                value:'',
            })
        },
        selectChange(item){
            this.$emit('selectChange',item)
        },
        edit(item){
            this.$emit('edit',item)
        }
    }
};
</script>
<style scoped lang='less'>
.dynamic_form{
    /deep/.el-row{
        .name,.name_{
            margin-bottom: 10px;
            label{
                width: 100px;
            }
            .el-select{
                width: 285px;
            }
            input{
                padding: 0 5px;
            }
        }
        .namePostfix{
            margin-bottom: 10px;
            label{
                width: 45px;
            }
            .el-select{
                width: 105px;
            }
            input{
                padding: 0 5px;
            }
        }
        .delName{
            display: none;
            padding: 2px 2px;
            margin-top: 8px;
            margin-left: 4px;
        }
        .name_{
            label{
                opacity: 0.5;
            }
        }
    }
    .el-row:hover{
        .delName{
            display: inline-block;
        }
    }
    .addName{
        margin-left: 100px;
        margin-bottom: 18px;
        padding: 4px 15px;
        width: 343px;
    }
}
</style>
