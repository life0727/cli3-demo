import { formateDate, paramsValidate} from './util'

export const mixins_searchTableData = {
    methods:{
        search(){
            this.data = [];
            if(!paramsValidate(this.toSearchMsg)) return; //参数验证
            this.loading = this.$loading({
                text: "拼命读取中",
                spinner: "el-icon-loading",
                target:document.querySelector(`.${this.$options.name}`)
            });
            const ds = {
                ...(this.toSearchMsg.dateData.isDateRange ?
                    {
                        'beginDs': formateDate(this.toSearchMsg.dateData.time[0]),
                        'endDs': formateDate(this.toSearchMsg.dateData.time[1])
                    } :
                    {
                        'beginDs': formateDate(this.toSearchMsg.dateData.time),
                        'endDs': formateDate(this.toSearchMsg.dateData.time)
                    }
                )
            };
            this.$fetch({
                method:'get',
                url:'getTableList',
                params:{
                    dataSetId: this.$route.meta.dataSetId,
                    queryColValue: this.toSearchMsg.inputKey[0].value,
                    ...ds
                },
                success:this.initTableData
            })
        },
        initTableData(data){
            if(!data.dataList.length) return;
            this.data = data.dataList;
            this.activeName = data.dataList[0].id;
        },
    }
}
