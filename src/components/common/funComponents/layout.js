import Base from '../Base'
import Textarea from '../../components/common/tools/Textarea.vue'
import Tools from '../../components/common/tools/Tools.vue'


export default class Layout extends Base{
    loadComponents = {}; 
    options = {}; //公共配置
    methods = {};//公共方法


    constructor(base,context = {}){
        super(base)
        this.context = context;
    }

    addComponent(...componentName){
        //console.log('componentName',componentName.flat())
        componentName.flat().forEach(item => {
            switch(item){
                case 'Textarea':
                    this.loadComponents[item] = Textarea;
                    break;
                case 'Tools':
                    this.loadComponents[item] = Tools
                    break;
                default:
                    break;    
            }
        })
  
    }

    loadLayouting(){

        let { loadComponents, options, methods } = this

        this.LayoutVm = new Vue({
            //el: this.Container,  如果用el则会把el里面之前的元素清空掉
            data() {
              return {
                options,
              };
            },
            
            components:loadComponents,

            computed: {
            },
            
            watch:{
 
            },
            
            methods:{

            },

            render: function (h){ //不能用箭头函数
                //const _this = this.LayoutVm
                return (
                        <div class="Layout">
                            {
                                Object.keys(loadComponents).map(item => 
                                    this.options[item].isLoad ? <item {...{ attrs: this.options[item] }} {...{on: methods}} /> : ''
                                    //options[item].isLoad ? <item {...{ attrs: options[item] }} {...{on: {'showLinksAndPAth': context.showLinksAndPAth}}} /> : ''
                                )
                            }
                            
                        </div>
                )
            },
            // template: `<div>
            //             <p>{{
            //                 test
            //             }}</p>
            //             <Textarea v-if="isload" :textareaTransform="true" :base_="base_" ></Textarea>
            //         </div>`
        }).$mount() //$mount()手动编译成dom  然后挂载到哪里 直接传参也会导致以前参数（dom）里面的元素清空
        //console.log('this.LayoutVm',this.LayoutVm)
        this.context.$el.appendChild(this.LayoutVm.$el);  
    }
    
    delComponents(...name){
        name.flat().forEach(item => this.options[item] && (this.options[item].isLoad = false))
        //name.flat().forEach(item => this.LayoutVm.$options[item] && (this.LayoutVm.$options[item].$destroy()))
    }

    createComponents(...name){
        name.flat().forEach(item => this.options[item] && (this.options[item].isLoad = true))
    }

    set setDefaultOptions({ name, options } = option){
        this.options[name] = this.options[name] ? { ...this.options[name], ...options } : options
    }
    
    set setDefaultMethods(methodsOptions = []){
        methodsOptions.forEach(item => this.methods = {...this.methods,...item})
    }

    updateOptions(key,value){
        for(let item in this.loadComponents){
            if(this.loadComponents[item].props && this.loadComponents[item].props.hasOwnProperty(key)){
                this.LayoutVm.options[item][key] = value
            }
        }
    }
}
