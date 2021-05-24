import { Message, Loading  } from 'element-ui';
import Fetch from '../http/Fetch';

export const changeIconFromRoutePath = function(route) {
    const path = route.path && route.path.slice(0, route.path.indexOf('_'));
    //console.log('path',path)
    switch (path) {
        case '/LINK':
            this.iconName = 'el-icon-lx-calendar';
            break;
        case '/Trajectory':
            this.iconName = 'el-icon-s-operation';
            break;
        case '/Event':
            this.iconName = 'el-icon-lx-cascades';
            break;
        case '/Path':
            this.iconName = 'el-icon-guide';
            break;
        case '/BadCase':
            this.iconName = 'el-icon-message';
            break;
        case '/Package':
            this.iconName = 'el-icon-search';
            break;
        case '/Dict':
            this.iconName = 'el-icon-s-tools';
            break;
        default:
            this.iconName = 'el-icon-lx-calendar';
    }
};


export function getAdCode(){ //请求adCode映射关系
    const res = {};
    return new Promise((resolve) => {
        const _adCode = localStorage.getItem('_adCode');
        if(_adCode != 'undefined' && _adCode != null && (+new Date() - (formatDateStr(JSON.parse(_adCode).ds).getTime())) <= 3600 * 1000 * 24 * 2 ){
            JSON.parse(_adCode).dataArray.forEach(item => {
                res[item[0]] = item[1]
            })
            resolve(res) 
        }else{
            Fetch({
                method: 'get',
                url: '',
                success:(data) => {
                    console.log('getAdCodeDAta',data);
                    localStorage.setItem('_adCode',JSON.stringify(data))
                    data.dataArray.forEach(item => {
                        res[item[0]] = item[1]
                    })
                    resolve(res)
                }
            })
        }
        
    })
    
}

export function removeRepeat2Arr(arr){
    var obj={};
    arr.forEach((item,i) =>{
        if(obj.hasOwnProperty(item)){
            arr.splice(i,1)
            i++;
        };
        obj[arr[i]]=i;
    })
    return arr;
}

export function getCookie(name) {
    var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}

export function getBaseUrl(){
    let hostname = location.hostname;
    let baseUrl = '';
    // 预发环境
    if (hostname == 'localhost' || hostname == '127.0.0.1'|| hostname == '30.28.50.176') {// || hostname == '30.28.50.211'   --host 0.0.0.0
        baseUrl = 'https://daily-dmagic.amap.test';
    } else {
        // origin: http://hostname:81
        baseUrl = location.origin.split(":").slice(0,2).join(':')
    }
    return baseUrl
}

/**
 * dateStr : yyyyMMdd or yyyMMddhhmmss
 * @param dateStr
 * @returns {Date}
 */
function formatDateStr(dateStr){
    if(dateStr == null ) return;
    var dateStrTmp = "";
    if(dateStr.length == 8){
       dateStrTmp += dateStr + "000000";
    }
  
    if(dateStrTmp.length == 14){
       var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
       return new Date(dateStrTmp.replace(pattern, '$1-$2-$3 $4:$5:$6'));
    }
 }

export function formateDate(date,fmt) {
    if(!date) return '-';
    
    if(!fmt){
        let res;
        if (Array.isArray(date)) {
            res = date.map(item => {
                let newDate = new Date(item);
                let month = (newDate.getMonth() + 1);
                let day = newDate.getDate();
                return newDate.getFullYear() + '' + (month <= 9 ? '0' + month : month) + (day <= 9 ? '0' + day : day);
            }).toString();
        } else {
            let newDate = new Date(date);
            let month = (newDate.getMonth() + 1);
            let day = newDate.getDate();
            res = newDate.getFullYear() + '-' + (month <= 9 ? '0' + month : month) + (day <= 9 ? '0' + day : day);
        }
        return res;
    }else{
        date = date.toString().length == 10 ? new Date(date * 1000) : new Date(date);
        if(/(y+)/.test(fmt)){
            fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length));
        }
        let o = {
        'M+':date.getMonth() + 1,
        'd+':date.getDate(),
        'h+':date.getHours(),
        'm+':date.getMinutes(),
        's+':date.getSeconds()
        };
    
        // 遍历这个对象
        for(let k in o){
        if(new RegExp(`(${k})`).test(fmt)){
 
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str:padLeftZero(str));
        }
        }
        return fmt;     
    }
    
    function padLeftZero(str) {
        return ('00'+str).substr(str.length);
    }   
    
}


export function paramsValidate(params) { //searchTable的参数验证
    let res = false;
    res = Object.keys(params).every(item => {
        if (Array.isArray(params[item])) {
            return params[item].every(item => {
                if (!item.value) {
                    Message.error(`${item.name}不能为空`);
                    return false;
                } else {
                    return true;
                }
            });
        } else if (params.dateData) {
            return !params.dateData.time ? (Message.error('请选择正确的时间格式') && false) : true;
        } else {
            return true;
        }
    });

    return res;
}

export function altToHtml(data){ //将字符实体转成< > & 
    data = "" + data;
    return data.replace(/&nbsp;|&#160;/g, " ").replace(/&lt;|&#60;/g, "<").replace(/&gt;|&#62;/g, ">").replace(/&amp;|&#38;/g, "&").replace(/&quot;|&#34;/g, '"').replace(/&apos;|&#39;/g, "'");
}

export function isJsonString(str) {
    try {
        if (typeof JSON.parse(str) == 'object') {
            return true;
        }
    } catch (e) {
    }
    return false;
}


export function json2treeTable(DATA,getSubval){//json数据通过某个key对应形成ele-table的树形数据
    if(!DATA || !DATA.length) return [];
    let data = JSON.parse(JSON.stringify(DATA));
    if(data.length < 2){
        return data
    };
    let result = [];
    let index = 0;
    let childrenArr = [];
    result[0] = data[0]
    for(let i = 0;i < data.length - 1;i++){
        //const curVal = eval("data[i]." + key)
        const curVal = getSubval(data[i])
        //const nextVal = eval("data[i + 1]." + key)
        const nextVal = getSubval(data[i + 1])
        if(nextVal === curVal){
            childrenArr.push(data[i + 1]);
            result[index].children = childrenArr;
        }else{
            index++;
            result[index] = data[i + 1];
            childrenArr = [];
        }
    }
    return result
}

export function thousandsFormat(num){ //数字千分位
    if(!num) return num
    const res = num.toString().replace(/\d+/, function(n){ // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
           return $1+",";
         });
   })
   return res;
}

export function formatjson4quot(jsonStr){ //json得引号变成了&quot 格式化
    if(!jsonStr) return '';
    jsonStr = jsonStr.replace(new RegExp('&quot;',"gm"),'"')
    try {
        let res = eval('('+jsonStr+')');
        return res
    } catch (e) {
        return  jsonStr
    }
}

export function getFps(status,callBcak){
    let fpsList = [];
    var lastTime = performance.now();
    var frame = 0;
    var lastFameTime = performance.now();
    //var requestAnimationFrameID;
    var loop = function(time) {
        if(status == 'end'){
            fpsList = [];
            window.requestAnimationFrameID && window.cancelAnimationFrame(requestAnimationFrameID)
            return
        };
        var now =  performance.now();
        var fs = (now - lastFameTime);
        lastFameTime = now;
        var fps = Math.round(1000/fs);
        frame++;
        if (now > 1000 + lastTime) {
            var fps = Math.round( ( frame * 1000 ) / ( now - lastTime ) );
            fpsList.push(fps);
            if(fpsList.length > 1000){
                fpsList = [fpsList[fpsList.length - 2],fpsList[fpsList.length - 1]];
            }
            callBcak(isBlocking(fpsList))
            frame = 0;    
            lastTime = now;    
        };           
        window.requestAnimationFrameID = window.requestAnimationFrame(loop);   
    };
    loop();
    function isBlocking(fpsList, below = 35, last = 2) {
        var count = 0
        for(var i = 0; i < fpsList.length; i++) {
            if (fpsList[i] && fpsList[i] < below) {
                count++;
            } else {
                count = 0
            }
            if (count >= last) {
                return true
            }
        }
        return false
    }
}
// try {


//     let map = new AMap.Map('TrackSplit', {
//         resizeEnable: true, //是否监控地图容器尺寸变化,
//         center: [121.571944, 29.863627]
//     });
//     mapController.map = map;
// } catch (err) {
//     console.error(err);
// }
