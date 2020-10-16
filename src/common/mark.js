
import vue from 'vue'

import EventDialog from '../components/common/FuncCompontents/event.dialog'
import PointDetail from '../components/common/layout/PointDetail';

export default class mark {
    constructor(base) {
        this.base = base;
        EventDialog.registerEventDialog(base);//重新注册一下
    }


    addMassMarks = (opt = {}) =>{//添加massMrark一般用于轨迹点
        const pngLength = 13;//目前服务上只有19个png
        let { 
            Data = [],//传入的数据
            isNeedFormat = false, //是否需要再次格式化 [{lnglat: [116.405285, 39.904989], name: i,id:1},{}, …],需要的话massMarkData必须存在path字段
            styleIndex = 0,//显示的图标样式
            url = 'fx', //f l c //图片样式地址
            imgSize = 12, //图片尺寸大小
            style, //用户自定义style数组 默认是轨迹fx数组
            clickPoint = {}//用户自定义clickpoint面板配置
        } = opt;
        const styleArr = [];//当需要展示多种点样式时，传入StyleObject的数组，此时需要为Data中每个元素指定style字段为该元素要显示的样式在StyleObject数组中的索引
        if(!style){
            for (let i = 0; i < 360; i++) {
                styleArr.push({
                    url: `${vue.prototype.$baseUrl}/styles/images/${url}${styleIndex % pngLength}.png`,
                    anchor: new BAse.Pixel(6, 6),
                    size: new BAse.Size(imgSize, imgSize),
                    rotation: i - 90
                });
            };
        }
        
        //console.log('styleArr',styleArr)
        const option = {
            opacity: 0.9,
            cursor: 'pointer',
            style: styleArr,
            zooms: [3, 20],
            alwaysRender:false,
            zIndex: 101
        };
        const clickPointOpt = {//自定义clickpoint面板配置
            show:false,
            currentClickPointMarkShow:false,//是否显示点击mark
            trueTitle:'',
            titleKey:'data.name',
            contentKey:'data.tooltip_content',
            style : {}
        }
        let options = Object.assign({},option,opt);
        if(isNeedFormat) Data = mark.createData(Data);
        ///console.log('22222data',Data)
        let massMarks = new BAse.MassMarks(Data , options);
        let clickPointOptions = Object.assign({},clickPointOpt,clickPoint);
        clickPointOptions.show && massMarks.on('click',(e) => {

            let title_key = 'e' , content_Key = 'e';
            clickPointOptions.titleKey.split('.').forEach(item => {
                title_key += `['${item}']`
            });
            clickPointOptions.contentKey.split('.').forEach(item => {
                content_Key += `['${item}']`
            });

            const title = clickPointOptions.trueTitle || eval(title_key);
            const content = Object.freeze(eval(content_Key));
            //console.log('title',title)
            EventDialog.shareInstance(this.base).massMarksVmClickPointSetData({title,content,style:clickPointOptions.style})

        });
        //massMarks.setBase(this.base);
        return massMarks;  
    }

} 
