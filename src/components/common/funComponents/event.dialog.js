import Base from './Base'

import PointDetail from '../components/common/layout/PointDetail';
import simplePanel from '../components/common/layout/simplePanel'

export default class EventDialog extends Base{
    constructor(Base){
        super(Base)
        this.massMarksVm = null;
    }

    static shareInstance(Base) {
        if (!this.instance) {
            this.instance = new EventDialog(Base);
        }
        return this.instance;
    }

    static registerEventDialog(Base){
        this.instance = new EventDialog(Base);
        //this.instance = null;
    }

    renderMassMarksVm = (opt) => {
        const {
            title = 'Point Detail',
            content = {},
            style = {}
        } = opt;
        const el = this.Base.getContainer();
        const currentBase= this.Base;
        const massMarksVm = new Vue({
            data(){
                return {
                    simplePanelVisible : true,
                    title,
                    content
                }
            },
            watch:{
                simplePanelVisible:{
                    handler(val){
                       
                    }
                }
            },
            methods:{
                changeSimplePanelVisible(val){
                    this.simplePanelVisible = val
                }
            },
            render: function (h) {

                const scopedSlots = {
                    content: () => <PointDetail {...{ attrs: style }} pointData={this.content} ></PointDetail>,
                }
                return (
                    <simplePanel class="simplePanel_PointDetail" {...{ attrs: style }} mini={false} scopedSlots={scopedSlots} simplePanelVisible={this.simplePanelVisible} {...{on: {'update:simplePanelVisible': this.changeSimplePanelVisible}}}  title={this.title}>
                    </simplePanel>
                )
            }
        }).$mount();

        el.appendChild(massMarksVm.$el);  
        this.massMarksVm = massMarksVm;
        return massMarksVm;
    }

    massMarksVmClickPointSetData = (opt) => {
        const {
            title = 'Point Detail',
            content = {},
            style = {}
        } = opt;

        if(!this.massMarksVm){
            this.renderMassMarksVm(opt)
        }else{
            this.massMarksVm.title = title
            this.massMarksVm.content = content
            this.massMarksVm.simplePanelVisible = true
        }
    }

}
