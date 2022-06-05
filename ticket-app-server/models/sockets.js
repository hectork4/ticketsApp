const TicketList = require("./ticket-list");

class Sockets {

    constructor( io ) {
        this.io = io;
        this.ticketList = new TicketList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            console.log("conectado")
            socket.on('solicitar-ticket', (data, callback) => {
                const newTicket = this.ticketList.crearTicket();
                console.log( "nuevo ticket", newTicket );
                callback( newTicket)
                //this.io.emit('updates-tickets', true );
                this.ticketList.pending.length > 0 && this.io.emit('enable-ticket', true)
            });
            
            socket.on('next-ticket-toWork', (user, callback) => {
                const userTicket = this.ticketList.asignTicket(user.username, user.desktop);

                callback(userTicket)

                this.io.emit('asigned-ticket', this.ticketList.last13)

                this.ticketList.pending.length === 0 && this.io.emit('enable-ticket', false)
            })
        
        });
    }


}


module.exports = Sockets;