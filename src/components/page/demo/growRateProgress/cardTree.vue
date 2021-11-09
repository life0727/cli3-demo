<template>
  <div class="cardTree">
    <div v-if="cardData._children && cardData._children.length > 0" class="row" >
        <div class="box_container" v-for="(_card,_index) in cardData._children" :key="_index" > 
            <div class="box-card is-always-shadow">
                <div slot="header" class="clearfix">
                    <span class="symbol" v-if="cardData.rule[_index] === 'L'" style="top:-20px">
                        <img src="../../../../../../assets/img/icon/arrow.png" class="arrow">
                    </span>
                    <span class="symbol" v-else>{{cardData.rule[_index]}}</span>
                    <span>{{_card.name}}</span>
                    <span class="hasChildren" @click.stop="cardClick(_card,cardData)" v-if="_card._children && _card._children.length">
                        <img src="../../../../../../assets/img/icon/right_arrow.png" class="arrow">
                    </span>
                </div>
                <div class="content">
                    <p class="content_row">
                        <span class="title">本期值：</span>
                        <span class="value">{{format_number(_card.value)}}</span>
                    </p>
                    <p class="content_row">
                        <span class="title">基期值：</span>
                        <span class="value">{{format_number(_card.baseValue)}}</span>
                    </p>
                    <p class="content_row">
                        <span class="title">波动绝对值：</span>
                        <span class="value">{{thousandsFormat((_card.value - _card.baseValue).toFixed(2))}}</span>
                    </p>
                    <p class="content_row">
                        <span class="title">波动幅度：</span>
                        <span class="value">{{thousandsFormat(_card.changeValue)}}</span>
                    </p>
                    <p class="content_row">
                        <span class="title">大盘贡献率：</span>
                        <span class="value">{{thousandsFormat(_card.kpicontributionRate)}}</span>
                    </p>
                    <div v-if="_card._children && _card._children.length > 0" v-show="_card.isShow" @click.stop="treeClick(_card)" class="nextTree" :style="{width:((_card._children.length * 200) + ((_card._children.length) * 100)) + 'px'}">
                        <cardTree :cardData="_card" />
                    </div> 
                </div>
                
            </div>
        </div>
    </div>
    
    

    
  </div>
</template>

<script>
import { thousandsFormat,getMaxFloor,format_number } from '../../../../../../utils/util' 
import { mapState , mapGetters , mapMutations } from 'vuex'
  export default {
    name:'cardTree',
    props:{
        cardData:{
            type:Object,
            default(){
                return {
                    _children:[],
                }
            }
        }
    },
    data () {
      return {
          thousandsFormat,
          format_number
      };
    },
    computed: {
        
    },
    components: {},
    watch: {},
    mounted() {
        //console.log('cardData',this.cardData)
    },
    methods: {
        ...mapMutations(['saveCardTreeHeightZindx']),
        cardClick(card,cardData){
            //console.log('card',card)
            //console.log('cardData',cardData)
            if(!card._children || card._children.length === 0){ 
                return
            }
            if(!card.isShow){ //关 到 开
                // console.log('card',card)
                // console.log('cardData',cardData)
                //return
                card.isShow = !card.isShow;
                cardData._children.forEach(item => {  //其余同级的展开的也全部关闭 只让他自己开
                    if(item.code !== card.code){
                        this.deepChangeIsShow(item,false)
                    }
                })
                //动态高度
                let z_index = 2; //最小是2
                z_index = card.z_index + 1;
                //const z_index = getMaxFloor(this.getShowTrueCardData(this.cardData),'_children')
                this.saveCardTreeHeightZindx(z_index)
                
            }else{ //开 到 关
                //card.isShow = !card.isShow
                this.deepChangeIsShow(card,false) //所有子级全部关闭
                //动态高度
                let z_index = 1; //最小是1
                //z_index = cardData._children[0].z_index; 
                z_index = card.z_index; 
                //const z_index = getMaxFloor(this.getShowTrueCardData(this.cardData),'_children')
                this.saveCardTreeHeightZindx(z_index)
            }

            
        },
        deepChangeIsShow(target,value){
            if(target._children && target._children.length){
                target.isShow = value;
                target._children.forEach(item => {
                    this.deepChangeIsShow(item,value)
                });
                
            }

        },
        getShowTrueCardData(data = this.cardData){
            const cardData = JSON.parse(JSON.stringify(data));
            if(cardData._children){
                cardData._children = cardData._children.filter(item => item.isShow === true)
                this.getShowTrueCardData(cardData._children)
            }
            // cardData._children.forEach(item => {
            //     item.filter(item.isShow)
            //     this.getShowTrueCardData(this.cardData)
            // })
            console.log('getShowTrueCardData',cardData)
            return cardData
        },
         treeClick(card){ //阻止点击下面的行 冒泡到上面cardClick
            return
            console.log('treeClick',card)
        },
    }
  }

</script>
<style lang='less' scoped>
.cardTree{
    position: relative;
    .row{
        //display: inline-block;
        //width: 500px;
        //position:relative;
        display: flex;
        .box_container{
            //border: 1px solid red;
            display: inline-block;
            // position: absolute;
            width: 200px;
            height: 200px;
            margin-left: 100px;
            box-shadow: 0 2px 12px 0 #666;
            .box-card {
                //display: inline-block;
                position: absolute;
                width: 200px;
                height: 200px;
                
                .clearfix{
                    overflow: hidden;
                    word-break: keep-all;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    height: 32px;
                    text-align: center;
                    color: white;
                    background: #999;
                    line-height: 32px;
                    font-size: 14px;
                    .arrow{
                        width: 32px;
                        height: 45px;
                    }
                    .symbol{
                        position: absolute;
                        left: -52px;
                        top: 90px;
                        font-size: 25px;
                        color: #666;
                    }
                    .hasChildren{
                        position: absolute;
                        right: 4px;
                        top: 3px;
                        cursor: pointer;
                        img{
                            width: 26px;
                            height: 25px;
                        }
                    }
                }
                .content{
                    overflow-y:initial;
                    height:168px;
                    background: lightskyblue;
                    .content_row{
                        color: #333;
                        font-size: 14px;
                        padding-top: 10px;
                        .title{
                            display: inline-block;
                            width: 92px;
                            margin-left:10px;
                        }
                        .value{
                            display: inline-block;
                            width: 95px;
                            //overflow: hidden;
                            // word-break: keep-all;
                            // white-space: nowrap;
                            // text-overflow: ellipsis;
                        }
                    }
                }
            }
        }
         
    }
    .nextTree{
        position: absolute;
        top: 250px;
    }
}
</style>
