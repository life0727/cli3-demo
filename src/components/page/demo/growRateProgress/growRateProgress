<template>
  <div class="growRateProgress">
        <div class="_container" v-for="(page,index) in pageData" :key="index" :id="'_container'+page.name">
            <condition :conditionData="page.condition" :name="page.name" @search="search" />
            <div class="charts">
                <el-row v-for="(charts,chartsIdx) in page.charts" :key="chartsIdx">
                    <el-col :span="chart.width * 2" v-for="(chart,chartIdx) in charts" :key="chartIdx">
                        <component 
                            :is="chart.component" 
                            :id="chart.name" 
                            :comData="chart.comData" 
                            :topUrl="chart.topUrl" 
                            :topContent="chart.topContent" 
                            :baseUrl="chart.baseUrl" 
                            :name="chart.name" 
                            :conditionData="chart.condition" />
                    </el-col>
                </el-row>
            </div>
            
        </div>
  </div>
</template>

<script>

import lineEchart from './line_echart/line_echart'
import numPicture from './num_picture/num_picture'
import condition from './condition/condition'
import barWaterfall from './bar_waterfall/bar_waterfall'
import dimTable from './dim_table/dim_table'
import analysisTable from './analysis_table/analysis_table'
import { GrowShowServer } from '../growShow.server'

  export default {
    name:'growRateProgress',
    props:{},
    data () {
      return {
          pageData:[],
          //condition:[],//筛选条件数组
          line_card_compons:[]
      };
    },
    computed: {},
    components: {
        lineEchart,
        numPicture,
        condition,
        barWaterfall,
        dimTable,
        analysisTable
    },
    watch: {},
    async mounted() {
        this.growShowServer = new GrowShowServer(this)
        //const data = this.growShowServer.getTestData('grow_show');
        const data = await this.getLayoutConfig();
       // console.log('data',data);
        this.pageData = this.formatPageData(data);
        
        this.$nextTick(async() => {
            //await this.produceChartsAsyncData('波动分析')
            await this.produceChartsAsyncData('指标归因')
            //console.log('this.pageDat1111111111111a',this.pageData);
        })
        
    },
    methods: {
        search(name){
            console.log('search==>一级',name)
            this.produceChartsAsyncData(name)
        },
        async getLayoutConfig(){
            const data = {
                appCode:'hotel',
                pageCode:'home'
            };
            const result = await this.growShowServer.getLayoutConfig(data);
            return result;
        },
        formatPageData(data){
            data.rows.forEach(item => {
                const lastConditionRow = item.condition[item.condition.length - 1];
                const lastConditionItem = lastConditionRow[lastConditionRow.length - 1];
                if(lastConditionItem.width === 12){
                    item.condition.push([{
                        type:'searchBtn',
                        name:'分 析',
                        width:2
                    }])
                }else{
                    lastConditionRow.push({
                        type:'searchBtn',
                        name:'分 析',
                        width:2
                    })
                }
                item.charts.forEach(i => {
                    if(Array.isArray(i)){
                        i.forEach(dim => {
                            this.produceChartsDataComponent(dim)
                        })
                    }else{
                        this.produceChartsDataComponent(i)
                    }
                })
            })
            return data.rows;
        },
        produceChartsDataComponent(dim){ //修饰charts里的组件
            if(dim.type === 'line'){
                dim.component = lineEchart
            }else if(dim.type === 'card'){
                dim.component = numPicture
            }else if(dim.type === 'bar-waterfall'){
                dim.component = barWaterfall
            }else if(dim.type === 'table'){
                dim.component = dimTable
            }else if(dim.type === 'analysistable'){
                dim.component = analysisTable
            }
        },
        async produceChartsAsyncData(name){ //修饰charts的异步数据
            //let charts = name ? this.pageData.find(item => item.name === name).charts : this.pageData.map(item => item.charts);
            //charts = charts.flat(4);
            console.log('this.pageData前',this.pageData);
            let pageData = name ? this.pageData.filter(item => item.name === name) : this.pageData;
            pageData.forEach(item => { //修饰url
                const search_url = this.growShowServer.creatSearchUrl(item.condition,item.name);
                item.search_url = search_url
            });
            if(name){
               await this.get_async_data_all(name,`#_container${name}`)
                
            }else{
                let asyncList = this.pageData.map(item => {
                    return this.get_async_data_all(item.name)
                })
                for await(let i of asyncList){}
                return null
            }
            console.log('this.pageData',this.pageData);
            //console.log('charts',charts)
            
        },
        get_async_data(name){
            const pageData = this.pageData.find(item => item.name === name);
            if(pageData.search_url === null){
                return
            }
            let dataList = pageData.charts;
            //console.log('dataList',dataList)
            //dataList = dataList.flat(3).slice(2,3);
            dataList = dataList.flat(3);
            console.log('dataList',dataList)
            //console.log('pageData',pageData)
            for(let item of dataList){
                if(this[item.name]){
                    continue;
                }
                const loading = this.$loading({
                    target: document.querySelector(`#${item.name}`),
                    text:'加载中。。。',
                    spinner: 'el-icon-loading'
                });
                this[item.name] = loading
                //debugger
                let url = `${item.data}${pageData.search_url}`;
                if(item.condition && item.condition.length){
                    item.baseUrl = url;
                    const child_url = this.growShowServer.creatSearchUrl(item.condition);
                    url = `${url}${child_url}`
                }
                this.$fetch({
                    url,
                    success: (res) => {
                        this[item.name] && this[item.name].close();
                        //this[item.name] && this[item.name].forEach(item => item.close())
                        this[item.name] = null;
                        if(item.type === 'line' && res.rows.length > 1){ //給折线图增加默认选中
                            res.rows[0].active = true;
                        }
                        if(item.type === 'bar-waterfall'){ //給瀑布图增加首行
                            res.rows.unshift({});
                        }
                        if(item.condition && item.condition.length){
                            this.$set(item,'baseUrl',item.baseUrl)
                        }
                        // if(item.topContent){
                        //     this.$set(item,'topContent',item.topContent)
                        // }
                        this.$set(item,'comData',res.rows)
                    }
                })
            };
        },
        get_async_data_all(name,querySelector){
            return new Promise((resolve_) => {
                const pageData = this.pageData.find(item => item.name === name);
                if(pageData.search_url === null){
                    return
                }
                let dataList = pageData.charts;
                dataList = dataList.flat(3);
                //dataList = dataList.flat(3).slice(3,4);
                this[querySelector] = this.$loading({
                    target: document.querySelector(querySelector),
                    text:'加载中。。。'
                });
                const asyncFuns = [];
                dataList.forEach(item =>{
                    let url = `${item.data}${pageData.search_url}`;
                    if(item.condition && item.condition.length){
                        item.baseUrl = url;
                        const child_url = this.growShowServer.creatSearchUrl(item.condition);
                        url = `${url}${child_url}`
                    }
                    const func = new Promise((resolve) => {
                        this.$fetch({
                            url,
                            success: (res) => {
                                resolve(res)
                            }
                        })
                    });
                    asyncFuns.push(func)
                });
                const PromAll = Promise.all(asyncFuns);
                PromAll.then(result =>{
                    this[querySelector] && this[querySelector].close();
                    dataList.forEach((i,index) => {
                        if(i.type === 'line' && result[index].rows.length > 1){ //給折线图增加默认选中
                            result[index].rows[0].active = true;
                        }
                        if(i.type === 'bar-waterfall'){ //給瀑布图增加首行
                            result[index].rows.unshift({});
                        }
                        if(i.condition && i.condition.length){
                            this.$set(i,'baseUrl',i.baseUrl)
                        }
                        if(i.type === 'table'){
                            // result[index].rows[0][2].dimValue = '未知'
                            // result[index].rows[0][3].dimValue = '未知'
                            // result[index].rows[0][4].dimValue = '未知'
                            // result[index].rows[0][5].dimValue = '未知'
                            // result[index].rows[1] = []
                            // result[index].rows[0] = []
                            // result[index].rows[1] = [...result[index].rows[1],...result[index].rows[1],...result[index].rows[1],...result[index].rows[1],...result[index].rows[1],...result[index].rows[1],...result[index].rows[1]];
                            // result[index].rows[0] = [...result[index].rows[0],...result[index].rows[0],...result[index].rows[0],...result[index].rows[0]];
                        }
                        // if(i.type === 'analysistable'){
                        //     result[index].rows = [...result[index].rows,...result[index].rows,...result[index].rows,...result[index].rows]
                        // }
                        this.$set(i,'comData',result[index].rows)
                    })
                    resolve_(dataList)
                }).catch(reason => {
                    console.log('reason',reason)
                })
            })
        }
    }
  }

</script>
<style lang='less' scoped>
.growRateProgress{
    ._container{
        padding: 5px 15px;
        
        .charts{
            margin-top: 15px;
            //border-bottom: 1px solid #ccc;
            border-radius: 12px;
            background-color: white;
            >.el-row{
                margin-bottom: 15px;
            }
            padding-bottom: 15px;
        }   
    }
}
</style>
