const express       = require('express');
const socketio      = require("socket.io");
const http          = require('http');
const path          = require('path');
const Sockets       = require('./sockets');
const cors          = require('cors')

class Server {

    constructor() {
        this.app = express();
        
        this.port = process.env.PORT;

        //Http server
        this.server = http.createServer(this.app);

        //socket configurations
        this.io = socketio(this.server, {
            cors: {
              origin: "*",
              methods: ["GET", "POST"]
            }
          });

        // initialize socket
        this.socket = new Sockets( this.io );
    }

    middlewares() {
        this.app.use( express.static( path.resolve( __dirname, '../public')));

        this.app.use( cors() )

        //Rest service to get the last tickets
        this.app.get('/last', (rec, res) => {
            res.json({
                ok:true,
                last: this.socket.ticketList.last13
            })
        })
    }

    /*socketConfigs() {
        new Sockets( this.io );
    }*/

    execute() {

        //initialize middleware
        this.middlewares();

        //this.socketConfigs();

        //inicialize server
        this.server.listen(this.port, () => {
            console.log(`listening on *:${this.port}`);
        });

    }
 
}

module.exports = Server