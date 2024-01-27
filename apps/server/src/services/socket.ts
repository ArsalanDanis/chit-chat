import { Server, Socket } from "socket.io";
import Redis from 'ioredis';


const pub = new Redis({
    host:'redis-a4c1df0-arsalan-09bd.a.aivencloud.com',
    port:24916,
    username: 'default',
    password: 'AVNS_ShbA2rEnKTzoUFmldHV'

});

const sub = new Redis({
    host:'redis-a4c1df0-arsalan-09bd.a.aivencloud.com',
    port:24916,
    username: 'default',
    password : 'AVNS_ShbA2rEnKTzoUFmldHV'

});

class SocketService {
    private _io: Server;
    constructor() {
        console.log("Init socket Server services..")
        this._io = new Server({
            cors:{
                allowedHeaders : ['*'],
                origin:'*',
            }
        });
        sub.subscribe('MESSAGES');
         
    }
    public  initListeners (){
        const io = this.io;
        console.log('init socket Listerners')
        io.on("connect",(socket)=>{
            console.log(`new socket connected`, socket.id);
            socket.on('event: message', async({message}:{message: string})=>{
                console.log("New message recived",message);
                //publish message to redis
                await pub.publish("MESSAGES",JSON.stringify({message}))

            });
        });
        sub.on('message',(channel,message)=>{
            if(channel ==='MESSAGES'){
                console.log("New message from redis!!",message)
                io.emit("message",message);
            }
        })
    }

    get io(){
        return this._io;
    }

}

export default SocketService;
