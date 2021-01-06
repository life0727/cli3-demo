import axios from 'axios';
import api from './api/index';
import { Message } from 'element-ui';
import { getCookie,getBaseUrl } from '../utils/util';
//import el from 'element-ui/src/locale/lang/el';
axios.defaults.transformResponse = [ //处理java lang类型
    function(data) {
        return jsonlint.parse(data)
    }
]

const baseUrl = getBaseUrl();
//console.log('baseUrl:',baseUrl);

const service = axios.create({
    baseURL: baseUrl,
    timeout: 1000 * 3600,               // 请求超时时间withCredentials:true   //加了这段就可以跨域了   6分钟为了reblance字段长度
    withCredentials: true
});
/*
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
*/

service.interceptors.request.use(
    config => {
        if(config.params && config.params.needEncodeURI){
            console.log('config',config);
            console.log('config',config.params);
            let url = config.url;
            url += '?'
            let keys = Object.keys(config.params)
            for (let key of keys) {
                //console.log(config.params[key])
                //url += `${key}=${encodeURIComponent(config.params[key])}&`
                url += encodeURIComponent(key) + '=' + encodeURIComponent(config.params[key]) + '&'
            }
            url = url.substring(0, url.length - 1)
            
            config.params = {}
            config.url = url;

            console.log('url',url)
        }
        getCookie('session') && (config.headers.cookie = getCookie('session'));
        
        
        return config;
    },
    error => {
        Message('加载超时');
        return Promise.reject(error);
    });

axios.interceptors.response.use(
    data => {
        return data;
    }, error => {
        Message('加载超时');
    }
);
let errorFun = (err) => {
    if (err.message.includes('timeout')) {
        Message('网络访问超时！');
    } else {
        Message(err.message || '请求异常');
    }
};
/**
 *
 * @param config = {
 *     url:'',
 *     methods:'',
 *     params:{},
 *     data:{},
 *     success: function(){},
 *     error:function(){}
 * }
 * notes: url 在 http/api/index.js
 */
export default function(config) {
    let configUrl = api[config.url];
    let options = {
        url: configUrl || config.url,
        method: config.method || 'get',
        params: config.params,
        data: config.data,
        context:config.context || this,
        headers:{
            'Content-Type':config.headers || 'application/x-www-form-urlencoded'
        },
        transformRequest:!config.transformRequest ? [function(data){return data}] : [function (data) {
            //console.log('transformRequest',data)
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            //console.log('ret',ret)
            return ret
           
      }]
    };
    service(options).then(response => {
        //console.log('response', response,options.context.loading)
        //options.context && options.context.loading && options.context.loading.close();
        if(options.context){
            if(Array.isArray(options.context.loading)){
                options.context.loading.length && options.context.loading.forEach(item => item.close());
                options.context.loading = [];
            }else{
                options.context.loading && options.context.loading.close();
            }
        }
        if(response.redirectUrl){
            response.redirectTarget && response.redirectTarget == 'blank' ? window.open(response.redirectUrl) : window.location.href = response.redirectUrl
        }else{
            if (response.data.ret == 'notLogin') { //未登录跳外链
                window.location.href = response.data.redirectUrl + window.location
            } else if (response.data.ret == 'notPermissions') { //没有权限跳外链
                window.location.href = response.data.redirectUrl
                //setTimeout(window.open(response.data.redirectUrl), 500);//防止被浏览器拦截
            } else if (response.status == 200 && (!response.data.ret || response.data.ret == 'success')) { /// || => tools/goodcase/meetpoint/list?
                config.success(response.data);   
            } else {
                const callBackText = response.statusText || response.data.ret;
                if (config.error) {
                    config.error(callBackText);
                } else {
                    Message(callBackText);
                }
            }
        }
        
    })
    // .catch(error => {
    //     options.context && options.context.loading && options.context.loading.close();
    //     // config.success(data);
    //     config.error ? config.error(error) : errorFun(error);
    // });
};

export const _fetch = function(config){
    let configUrl = api[config.url];
    let options = {
        url: configUrl || config.url,
        method: config.method || 'get',
        params: config.params,
        data: config.data,
        context:config.context || this,
        headers:{
            'Content-Type':config.headers || 'application/x-www-form-urlencoded'
        },
        transformRequest:!config.transformRequest ? [function(data){return data}] : [function (data) {
            //console.log('transformRequest',data)
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            //console.log('ret',ret)
            return ret
           
      }]
    };
    return new Promise((resolve) =>{
        service(options).then(response => {
            if(options.context){
                if(Array.isArray(options.context.loading)){
                    options.context.loading.length && options.context.loading.forEach(item => item.close());
                    options.context.loading = [];
                }else{
                    options.context.loading && options.context.loading.close();
                }
            };
            
            if(response.redirectUrl){
                response.redirectTarget && response.redirectTarget == 'blank' ? window.open(response.redirectUrl) : window.location.href = response.redirectUrl
            }else{
                if (response.data.ret == 'notLogin') { //未登录跳外链
                    window.location.href = response.data.redirectUrl + window.location
                } else if (response.data.ret == 'notPermissions') { //没有权限跳外链
                    window.location.href = response.data.redirectUrl
                } else if (response.status == 200 && (!response.data.ret || response.data.ret == 'success')) { /// || => tools/goodcase/meetpoint/list?
                    //config.success(response.data);   
                    resolve(response.data)
                } else {
                    const callBackText = response.statusText || response.data.msg || response.data.ret;
                    if (config.error) {
                        config.error(callBackText);
                    } else {
                        Message(callBackText);
                    }
                    //resolve(null)
                }
            }
        })
        .catch(error => {
            options.context && options.context.loading && options.context.loading.close();
            //config.error ? config.error(error) : errorFun(error);
            resolve(error)
        });
        
    })
}
