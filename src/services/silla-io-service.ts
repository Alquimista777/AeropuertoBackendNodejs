import* as socketIO from 'socket.io';
import {Server} from 'http';

export class SillaIoService{
    sillas:SocketIO.Namespace;

    init(server:Server){
        let io= socketIO(server);
        this.sillas=io.of("socket/sillas");
        this.sillas.on("connection",(socket)=>{
            socket.on("subscribe",(id)=>{
                socket.join(id);
            });
            socket.on("unsubcribe",(id=>{
                socket.leave(id);
            }));
        });
    }

    changeAvalilable(id:string, silla:number,available:boolean){
        this.sillas.to(id)
        .emit("available",{silla:silla, disponible:available});
    }
}
export const sillaIO= new SillaIoService();