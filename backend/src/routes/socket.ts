import fastify, { FastifyInstance, RouteShorthandOptions, FastifyReply } from 'fastify';
import { request } from 'http';
import { RateLimiterMemory } from 'rate-limiter-flexible';
const SocketRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {
    //const userRepo = UserRepoImpl.of();
    //server.io.on("connection",)
    
    // server.get('/messages',(request,reply) =>{
    //     //fastify.on("connection",(socket,Socket) =>{});
        
    // })
    const rateLimiter = new RateLimiterMemory({points:5,duration:1});
    server.ready().then(()=>{
        server.io.on("connection",(socket)=>{
            //socket.emit("hello","world");
            //socket.join("room1");
            // socket.to("room1").emit('c1r',"Hi room1");
            // server.io.to("room1").emit("c1r","hoho");
            console.log("connect client");
            socket.on("c1r",(msg)=>{
                try{
                    rateLimiter.consume(socket.handshake.address);
                    console.log("SERVER MSG: ",msg);
                    socket.broadcast.emit("c2r",msg);
                }
                catch(e){
                    console.error(e);
                }
                
            })
            socket.on("disconnect",(r)=>{
                console.log("disconnect client");
            })
            socket.on("error",(err)=>{
                socket.disconnect();
                console.log("error disconnect client");
            })
        });
        
    });
    
    
    done();
}
export {SocketRouter};