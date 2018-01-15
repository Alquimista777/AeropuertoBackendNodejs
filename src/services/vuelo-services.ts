import {Con, DBconnection} from'./bd-connection';
import{Collection,ObjectID} from 'mongodb';
import {Vuelo}from'./common/vuelo';

export class VueloService{

    get db():Collection<Vuelo>{
        return this.con.db.collection("vuelos");
    }

    constructor(private con:DBconnection){}
    insert(vuelo:Vuelo){
        return this.db.insertOne(vuelo);
    }

    update(id:string,vuelo:Vuelo){
        return this.db.updateOne({_id: new ObjectID(id)},
        {$set:vuelo});
    }

    delete(id:string){
        return this.db.deleteOne({_id: new ObjectID});
    }

    allByVuelo(id:string)
    {
        return this.db.find({"vuelo._id":id})
        .toArray();
    }
    
}
export const vueloService = new VueloService(Con);