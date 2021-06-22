import TextareaComp from '../tools/Textarea.vue'
import ToolsComp from '../tools/Tools.vue'

export const Tools = {
    name:'Tools',
    options:{
        ...formatProps(ToolsComp.props),
        isLoad:true,
        toolsOptions:[{//传给Tools配置
            'icon':'',
            'label':'1选',
            'name':'getTrackPoints',
            'tooltip':'1选'
        },{
            'icon':'',
            'label':'距1',
            'name':'getDistance',
            'tooltip':'2'
        },{
            'icon':'',
            'label':'2',
            'name':'getPositionInfo',
            'tooltip':'3'
        },{
            'icon':'',
            'label':'4',
            'name':'switchstyle',
            'options':['normal','whitesmoke','fresh'],
            'tooltip':'45'
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
