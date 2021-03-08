import { CommonServer } from '../../../http/common.server'

export class TableServer extends CommonServer{
  async updateIdMeta(data){
        return await this._fetch({
            method: 'POST',
            url: 'updateIdMeta',
            data,
            context:this.context,
            transformRequest:true,
        })
    }
  
  async addPermission(params){
        return await this._fetch({
            method: 'POST',
            url: 'addPermission',
            params,
            context:this.context,
        })
    }  
}
