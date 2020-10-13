import TextareaComp from '../../components/common/tools/Textarea.vue'
import ToolsComp from '../../components/common/tools/Tools.vue'

export const Tools = {
    name:'Tools',
    options:{
        ...formatProps(ToolsComp.props),
        isLoad:true,
        toolsOptions:[{//传给Tools配置
            'icon':'',
            'label':'选',
            'name':'getTrackPoints',
            'tooltip':'框选轨迹点'
        },{
            'icon':'',
            'label':'距',
            'name':'getDistance',
            'tooltip':'测距'
        },{
            'icon':'',
            'label':'位',
            'name':'getPositionInfo',
            'tooltip':'位置信息'
        },{
            'icon':'',
            'label':'肤',
            'name':'switchstyle',
            'options':['normal','whitesmoke','fresh'],
            'tooltip':'切换主题'
        }]
        
    }
}

export const Textarea = {
    name:'Textarea',
    options:{
        ...formatProps(TextareaComp.props),
        isLoad:true,
    }
}



function formatProps(comProps){
    const res = {};
    for(let i in comProps){
        if(comProps[i].type.name === 'Array'){
            res[i] = []  //会格式化
        }else if(comProps[i].type.name === 'Object'){
            res[i] = {} //会格式化
        }else{
            res[i] = comProps[i].default
        }
    }
    return res
}
