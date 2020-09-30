import { Message,MessageBox,Loading } from 'element-ui'

import Fetch from './server/Fetch'
import { mapInit } from '../AMap/AMap'
import { _fetch } from './server/Fetch'

import MapLayout from '../AMap/map_layout/map_layout'

import { mapTools as mapToolsConf, mapTextarea as mapTextareaConf } from '../AMap/map_layout/layout.baseConfig'
export class CommonServer {
    mapToolsConf = mapToolsConf
    mapTextareaConf = mapTextareaConf

    constructor(context){
        this.context = context;
        this.Fetch = Fetch;
        this._fetch = _fetch
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

    //加载公共组件
    addMapComponent(addComponentName){
        if(!this.context.map){
            return
        }
        this.mapLayout = new MapLayout(this.context.map,this.context);
        this.mapLayout.addComponent(addComponentName);
    }

    _deepCopy(obj){
        return JSON.parse(JSON.stringify(obj))
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
