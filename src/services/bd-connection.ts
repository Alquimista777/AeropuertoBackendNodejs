import {config} from '../config/global';
import {MongoClient, Db} from 'mongodb';

export class DBconnection{

     db:Db;   


    constructor (configDb:any, callback:()=>void=null){

        const connection=config.database.host
        +":"+config.database.port
        +":"+ config.database.database;

        MongoClient.connect(connection)
        .then(db=>{
            this.db=db;
            db.collection("aeropuerto")
            .createIndex({localization:"2dsphere"});

            if(callback) callback();
        })
        .catch(err=>console.log(err))
    }
}
export const Con = new DBconnection(config.database,()=>{});
