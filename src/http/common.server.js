import { Message,MessageBox,Loading } from 'element-ui'

import Fetch from './server/Fetch'

import { _fetch } from './server/Fetch'

import LoadScript from './server/loadScript'

import Layout from '../components/common/funComponents/layout.js'

import { Tools as ToolsConf, Textarea as TextareaConf } from '../components/common/funComponents/Layout.baseConfig'
export class CommonServer {
    ToolsConf = ToolsConf
    TextareaConf = TextareaConf
    
    constructor(context){
        this.context = context;
        this.Fetch = Fetch;
        this._fetch = _fetch
        this.loadScript = new LoadScript() 
        this.Message = Message;
    }


    //getTestData
    getTestData(publicName){
        if(!publicName){
            Message.info('请传入测试数据名称');
        };
        this.context.loading && this.context.loading.close();
        const data = require(`../../public/${publicName}.json`);
        return data;
    }


    //打开loading
    openLoading(querySelector,text = '拼命读取中') {
        this.context.loading = Loading.service({
            text,
            spinner: 'el-icon-loading',
            target: document.querySelector(querySelector)
        });
        return this.context.loading
    }

    //打开loading
    turnOnLoading(querySelector,text = '拼命读取中') {
        const target = Object.prototype.toString.call(querySelector) === '[object HTMLDivElement]' ? querySelector : document.querySelector(querySelector)
        //console.log('target',target)
        const loading = Loading.service({
            text,
            spinner: 'el-icon-loading',
            target
        });
        this.context.loading = this.context.loading ? [...this.context.loading,loading] : [loading]
        console.log('this.context.loading ',this.context.loading )
        return this.context.loading
    }

    //加载公共组件
    addComponent(addComponentName){
        if(!this.context.base){
            return
        }
        this.Layout = new Layout(this.context.base,this.context);
        this.Layout.addComponent(addComponentName);
    }

    _deepCopy(obj){
        return JSON.parse(JSON.stringify(obj))
    }
    
    getTableList(pageNum, pageSize, Data = []){//前端分页算法
        const total = Data.length
        if(!total){
            return []
        }
        if(total <= pageSize){
            return Data
        }
        const num = pageSize * (pageNum - 1);//计算当前页（不含）之前的所有数据总条数
        if (num < total) { //如果当前页之前所有数据总条数小于（不能等于）总的数据集长度，则说明当前页码没有超出最大页码
            const startIndex = num;//当前页第一条数据在总数据集中的索引
            const endIndex = num + pageSize - 1;//当前页最后一条数据索引
            return Data.filter((_, index) => index >= startIndex && index <= endIndex);//当前页数据条数小于每页最大条数时，也按最大条数范围筛取数据
        } else { //当前页码超出最大页码，则计算实际最后一页的page，自动返回最后一页数据
            const size = parseInt(total / pageSize); //取商
            const rest = total % pageSize; //取余数
            if (rest > 0) { //余数大于0，说明实际最后一页数据不足pageSize，应该取size+1为最后一条的页码
                    return Data.filter((_, index) => index >= (pageSize * size) && index <= total);
            } else if (rest === 0) { //余数等于0，最后一页数据条数正好是pageSize
                    return Data.filter((_, index) => index >= (pageSize * (size - 1)) && index <= total);
            } //注：余数不可能小于0
        }
    }

    //删除提示信息
    removeTips(name,cb){
        MessageBox.confirm(`是否删除${name}?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() =>{
            cb(true)
        }).catch(_=>{
            cb(false)
        })
    }
}    
