<template>
    <div class="simplePanel" @mousedown="mousedown" @mouseup="sizeChange" ref="simplePanel" v-show="simplePanelVisible" :style="{width,top,left}" v-drag v-Resizable>
        <p class="el-dialog__header" >
            {{title}}
            <span class="el-icon-minus" v-show="mini && !isMini" @click="_ => isMini = true"></span>
            <span class="el-icon-plus" v-show="mini && isMini" @click="_ => isMini = false"></span>
            <span class="el-icon-close" @click="() => this.$emit('update:simplePanelVisible',false)"></span>
        </p>
        <div class="simplePanel-content" ref="content"  :style="{display:isMini ? 'none' : 'block',maxHeight:height}">
            <slot name="content"></slot>
        </div>
        <div class="simplePanel-footer" v-if="$slots.footer" :style="{display:isMini ? 'none' : 'block'}">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>

let pre_panelHeight = '';//上一次的面板高度
let maxZindex = null;//页面最大层级 不能放在data上！ 有好几个面板时能公用一个maxZindex！
export default {
    name: 'simplePanel',
    props: {
        simplePanelVisible:{
            type:Boolean,
            default:false
        },
        title:{
            type:String,
            default:'Point Detail'
        },
        width:{
            type:String,
            default:'450px'
        },
        top:{
            type:String,
            default:'20px'
        },
        left:{
            type:String,
            default:'20px'
        },
        height:{ //内容高度 不放在父级上1.滚动条太难看2.header会滚动消失
            type:String,
            default:'500px'
        }
        // mini:{
        //     type:Boolean,
        //     default:false
        // }
    },
    data(){
        return{
            isMini:false, //是否h是最小状态
            mini:false, //是否展示最小按钮
        }
    },
    mounted(){
        //console.log('this.$refs.simplePanel.style.height',this.$refs.simplePanel)
        //上一次的面板高度
        pre_panelHeight = this.$refs.simplePanel && JSON.parse(JSON.stringify(this.$refs.simplePanel.style.height));
        //是否支持mini
        const mini = this.$attrs.hasOwnProperty('mini');
        if(mini){
            this.mini = true;
            if(this.$attrs.mini){
                this.isMini = true
            }else{
                this.isMini = false
            }
        }
        //取最大zindex 当前点击层级最高
        // this.$nextTick( _ => {
        //     let arr = [...document.all].map(e => +window.getComputedStyle(e).zIndex || 0);
        //     _maxZindex = Math.max(...arr);
        // })
    },
    watch:{
        isMini:{
            handler(val){
                if(val){
                    //.bottom = '10px'
                    //this.$refs.content.style.height = '0px'
                    //this.$refs.simplePanel.style.top = 'calc(100vh - 130px)'
                    this.$refs.simplePanel.style.top = this.$attrs.mini_top ? this.$attrs.mini_top : 'calc(100vh - 130px)'
                    this.$refs.simplePanel.style.bottom = 'auto'
                    this.$refs.simplePanel.style.height = 'auto'
                    
                }else{
                    this.$refs.simplePanel.style.top = '10px'
                    this.$refs.simplePanel.style.bottom = 'auto'
                }
            }
        },
        simplePanelVisible:{ //弹出时默认做高层
            handler(val){
                if(val){
                    this.$refs.simplePanel.style.zIndex = this.getMaxZindex();
                }
            }
        }
    },
    methods: {
        sizeChange(){ //监听鼠标抬起事件 计算content高度自适应 之前设置最大高度会导致父级高度变大后不会自适应
       // return;
            const now_panelHeight = JSON.parse(JSON.stringify(this.$refs.simplePanel.style.height));
            if(now_panelHeight !== pre_panelHeight){
                this.$refs.content.style.maxHeight = this.$slots.footer ? (parseInt(now_panelHeight) - 50 - 40) + 'px' : (parseInt(now_panelHeight) - 50) + 'px';
                pre_panelHeight = now_panelHeight;
                this.$emit('heightChange',now_panelHeight)
            }
        },
        mousedown(){
            this.$refs.simplePanel.style.zIndex = this.getMaxZindex();
            //console.log('arr',this.$refs.simplePanel.style.zIndex)
        },
        getMaxZindex(){ //取最大zindex 当前点击层级最高 尽量不要超过2千; 因为tootip是独立的且z-index=2000 容易被覆盖
            if(maxZindex === null){
                let arr = [...document.all].map(e => +window.getComputedStyle(e).zIndex || 0);
                const _maxZindex = Math.max(...arr);
                maxZindex = _maxZindex > 999 ? 999 : _maxZindex;
            }
            maxZindex++
            return maxZindex;
        }
    }
};

</script>

<style scoped lang="less">
.simplePanel {
    position: absolute;
    box-shadow: 0 -3px 3px rgba(0,0,0,0.1), 2px 3px 11px rgba(0,0,0,0.3);
    background-color: white;
    font-size: 14px;
    z-index: 999;
    padding: 5px 10px;
    border-radius: 10px;
    color: #72767b;
    overflow:hidden;
    .el-dialog__header{
        color:#000;
        padding: 5px 0px;
        font-weight: 600;
        margin-bottom: 5px;
        border-bottom: 1px solid #ccc;
        .el-icon-close{
            cursor: pointer;
            position: absolute;
            right: 15px;
            font-size: 18px;
        }
        .el-icon-close:hover{
            color:lightcoral
        }
        .el-icon-minus{
            cursor: pointer;
            position: absolute;
            right: 40px;
            font-size: 18px;
        }
        .el-icon-minus:hover{
            color:green
        }
        .el-icon-plus{
            cursor: pointer;
            position: absolute;
            right: 40px;
            font-size: 18px;
        }
        .el-icon-plus:hover{
            color:@themeColor
        }
    }
    .simplePanel-content{
        min-height: 150px;
        overflow-y: auto;
    }
    .simplePanel-footer{
        width: 100%;
        border-top: 1px solid #ccc;
        padding-top: 8px;
        margin-top: 5px;
        height: 40px;
        button{
            float: right;
            margin-right: 10px;
            padding: 7px 12px;
        }
    }
}
</style>
