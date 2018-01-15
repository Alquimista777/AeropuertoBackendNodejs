import{Con, DBconnection}from'./bd-connection';
import{ Collection, ObjectID}from'mongodb';
import{Aerolinea,Ticket} from'./common/aerolinea';

        class AerolineaServices{

        private get db():Collection<Aerolinea>{
            return this.con.db.collection("aerolineas")
        }
        constructor(private con:DBconnection){}

        insert(aero:Aerolinea){
            return this.db.insertOne(aero);
        }
        insertWithticket(aero:Aerolinea,numberticket:number){
            let ticket:Ticket[]=[];
            for(let i=0;i<numberticket;i++){
                ticket.push({numero:i+1,disponible:true});
            }
            aero.ticket=ticket;
            return this.db.insertOne(aero);

        }

        update(id:string, aero:Aerolinea){
            return this.db.updateOne({_id:new ObjectID(id)},
                {$set:aero});
        }
        delete(id:string){
            return this.db.deleteOne({_id:new ObjectID(id)})
        }
        all(skip:number=0,limit:number=0){
            return this.db.find()
            .limit(limit)
            .skip(skip)
            .toArray();
        }
        allbyLocation(lon:number,lat:number,km:number=1){
            return this.db.find({
                localization:{
                    $geoWithin:{
                        $centerSpere:[[lon,lat], km/5433.1]
                    }
                }
            })
            .toArray();
        }

        tickesByAerolinea(id:string){
            return this.db.findOne({_id:new ObjectID(id)})
            .then(aero=>{
                return Promise.resolve(aero.ticket);
            });
        }

        tickesByAvailable(id:string){
            return this.db.aggregate([
                {$match:{_id:new ObjectID(id)}},
                {$project:{ticket:1}},
                {$unwind:"$ticket"},
                {$match:{"ticket.disponible":true}},
                {$group:{_id:"$_id",ticket:{$push:"$ticket"}}}
            ])
            .toArray()
            .then(aero=>{
                return Promise.resolve(aero[0].ticket)
            });
        }

        ticketUpdate(id:string,ticket:number,available:string){
            return this.db.updateOne({
                _id:new ObjectID(id),
            "ticket.numero":ticket},
        {
            $set:{
                "ticket.$.disponible":available
            }
        });
        }

 }
 export const aerolineaServices=new AerolineaServices(Con);