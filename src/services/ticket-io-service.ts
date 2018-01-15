import * as socketIO from 'socket.io';
import { Server } from 'http';


export class TicketService {
    
        ticket: SocketIO.Namespace;
    
        init(server: Server) {
            let io = socketIO(server);
    
            this.ticket = io.of("socket/ticket");
            this.ticket.on("connection", (socket) => {
                socket.on("subscribe", (id) => {
                    socket.join(id);
                });
                socket.on("unsubscribe", (id) => {
                    socket.leave(id);
                });
            });
        }
    
        changeAvailable(id: string, ticket: number,
            available: boolean) {
    
            this.ticket.to(id)
                .emit("available",
                { ticket: ticket, disponible: available });
        }
    
    }
    
    export const ticketIO = new TicketService();