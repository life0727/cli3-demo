import { Message,MessageBox,Loading } from 'element-ui'

import Fetch from './server/Fetch'

import { _fetch } from './server/Fetch'

import LoadScript from './server/LoadScript'

import Layout from '../components/common/funComponents/Layout'

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
    
    getTableList(total,pageNum, pageSize, Data = []){//前端分页算法
        if(!total || !Data || !Data.length){
            return []
        }
        return Data.slice((pageNum - 1) * pageSize,pageNum * pageSize > total ? total : pageNum * pageSize)
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
