import { CommonServer } from '../../../http/common.server'
class LayoutCommon extends CommonServer{

    

    findParentsById(json,child,key){
        var parentIds = [],
            index = 0,
        hasParentId = function loop(json, index){
            return json.some((item)=>{
                if(item[key] === child[key]){
                    parentIds = parentIds.slice(0, index)
                    return true
                }else if(Array.isArray(item.children)){
                    parentIds[index] = item
                    return loop(item.children, index+1)
                }else{
                    return false
                }
            })
        }(json, index)
        return hasParentId ? parentIds : []
    }

    getSysName(){
        const routePath = this.context.$route.path;
        const poiArringReg = /^\/subHome\/Arriving\//; // /subHome/Arriving/test/aaa
        let res = [
            {
                name:'台',
                path:'/LINK_TrafficVolume'
            }
        ];
        switch ( routePath) {

            case '/platform/createPage':
                res = [
                    {
                        name:'awdadwa面',
                        path:'/platform/createPage'
                    },
                    {
                        name:'Test',
                        path:'/platform/tttt',
                        children:[{
                            name:'test_',
                            path:'/platform/tttt111',
                        }]
                    },
                ]
                this.sysTitle = 'wda';
                break;    
            case (routePath.match(poiArringReg)) && (routePath.match(poiArringReg)).input:
                res = [
                    {
                        name:routePath.slice(routePath.lastIndexOf('/') + 1,routePath.length),
                        path:routePath
                    }
                ]
                break;     
            default:
                break;
        }
        return res;
    }
}

export default LayoutCommon
